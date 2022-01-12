import { TokenConstants } from "../_constants/token-constants";
import { token } from "../../../lib/ethers/contracts/token_methods";
import { Request } from "../../api/http.js";
import { Auth } from "../../../lib/ethers/Auth.js";
/*
 https://polygon-mumbai.g.alchemy.com/v2/oe21CCNseQJ_m_HTQ0Y09671I-CGvbxt
 
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenMetadata",
    "params":["0x1985365e9f78359a9B6AD760e32412f4a445E862"],
    "id":1
}
 */

const {
  FETCH_TOKEN_DETAILS_REQUEST,
  FETCH_TOKEN_DETAILS_SUCCESS,
  FETCH_TOKEN_DETAILS_FAILURE,
} = TokenConstants;

export const _fetchTokenDetails = () => async (dispatch) => {
  console.log("fetching token details...");

  dispatch({ type: FETCH_TOKEN_DETAILS_REQUEST });

  let isWeb3Enabled = await Auth.loadEthereumProvider();
  let isWalletConnected = await Auth.checkIfWalletIsConnected();

  if (isWeb3Enabled?.error || isWalletConnected?.error) {
    let data = await fetchTokenDetailsFromApi();
    dispatch({
      type: FETCH_TOKEN_DETAILS_SUCCESS,
      payload: data,
    });
    return;
  }

  try {
    let name = await token.name();
    if (name.error) {
      throw name.error;
    }
    let totalSupply = await token.totalSupply();
    if (totalSupply.error) {
      throw totalSupply.error;
    }
    let symbol = await token.symbol();
    if (symbol.error) {
      throw symbol.error;
    }
    let decimals = await token.decimals();
    if (decimals.error) {
      throw decimals.error;
    }
    let data = {
      name: name.message,
      totalSupply: totalSupply.message,
      symbol: symbol.message,
      decimals: decimals.message,
    };
    dispatch({
      type: FETCH_TOKEN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOKEN_DETAILS_FAILURE,
      payload: error,
    });
    console.log({ error });
  }
};

export const fetchTokenDetailsFromApi = async () => {
  let data = {
    jsonrpc: "2.0",
    method: "alchemy_getTokenMetadata",
    params: [process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS],
    id: 1,
  };
  let result = await Request.post(
    "https://polygon-mumbai.g.alchemy.com/v2/oe21CCNseQJ_m_HTQ0Y09671I-CGvbxt",
    data
  );
  if (result.status == 200) {
    let details = result.data.result;
    details.totalSupply = 1000000;
    return details;
  }
};
