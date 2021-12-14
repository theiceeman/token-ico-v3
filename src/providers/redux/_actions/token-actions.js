import { TokenConstants } from "../_constants/token-constants";
import { token } from "../../../lib/ethers/contracts/token_methods";

const {
  FETCH_TOKEN_DETAILS_REQUEST,
  FETCH_TOKEN_DETAILS_SUCCESS,
  FETCH_TOKEN_DETAILS_FAILURE,
} = TokenConstants;

export const _fetchTokenDetails = () => async (dispatch) => {
  console.log("fetching token details...");

  dispatch({ type: FETCH_TOKEN_DETAILS_REQUEST });

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
      totalSupply:  totalSupply.message ,
      symbol: symbol.message,
      decimals: decimals.message,
    };
    dispatch({
      type: FETCH_TOKEN_DETAILS_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: FETCH_TOKEN_DETAILS_FAILURE,
      payload: error,
    });
    // SimpleToastError(_name.message);
    console.log({ error });
  }
};
