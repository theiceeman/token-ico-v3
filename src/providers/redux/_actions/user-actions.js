import { Auth } from "../../../lib/ethers/Auth";
import { UserAuthConstants } from "../_constants/user-auth-constants";

const {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  // USER_WALLET_CONN_REQUEST,
  // USER_WALLET_CONN_SUCCESS,
  // USER_WALLET_CONN_FAILURE,
} = UserAuthConstants;

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
