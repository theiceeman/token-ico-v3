import { Request } from "../../../lib/api/http";
import { Auth } from "../../../lib/ethers/Auth";
import { UserAuthConstants } from "../_constants/user-auth-constants";

const {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE
} = UserAuthConstants;


const authHeaders = {
  'Accept' : 'application/json',
  'Content-Type' : 'application/json',
}

export const authenticateUser = () => async (dispatch) => {
  console.log("verifying user client configs...");
  dispatch({ type: USER_AUTH_REQUEST });

  try {
    let isWeb3Enabled = await Auth.isWeb3EnabledBrowser();
    if (isWeb3Enabled.error) {
      throw isWeb3Enabled;
    }
    let checkUserAccConnection = await Auth.checkIfWalletIsConnected();
    if (checkUserAccConnection.error) {
      throw checkUserAccConnection;
    }
    let networkConnectedTo = await Auth.confirmUserNetwork();
    if (networkConnectedTo.error) {
      throw networkConnectedTo;
    }
    console.log(checkUserAccConnection);
    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: checkUserAccConnection,
    });
  } catch (error) {
    dispatch({
      type: USER_AUTH_FAILURE,
      payload: error,
    });
    // console.log({ error });
  }
};

export const connectToUserWallet = () => async (dispatch) => {
  console.log("connecting to user wallet...");
  dispatch({ type: USER_AUTH_REQUEST });

  try {
    let isWalletConnected = await Auth.connectUserWallet();
    if (isWalletConnected.error) {
      throw isWalletConnected;
    }
    console.log(isWalletConnected);
    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: isWalletConnected,
    });
  } catch (error) {
    dispatch({
      type: USER_AUTH_FAILURE,
      payload: error,
    });
    // console.log({ error });
  }
};

export const signUp = async (data) => {
  try {
    const request = {
        config: {
            headers : authHeaders
        },
        payload: data
    }
    let result = await Request.post(`signup`, request)
    console.log(result.data)
    return result.data
  } catch (error) {
    console.log({error}) 
  }
}