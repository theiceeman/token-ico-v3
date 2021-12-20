import { BigNumber } from "ethers";
import { Request } from "../../../lib/api/http";
import { Auth } from "../../../lib/ethers/Auth";
import { crowdsale } from "../../../lib/ethers/contracts/crowdsale_methods";
import { timelock } from "../../../lib/ethers/contracts/timelock_methods";
import {
  SimpleToastError,
  SimpleToastSuccess,
} from "../../../lib/validation/handlers/error-handlers";
import { UserAuthConstants } from "../_constants/user-auth-constants";

const {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
} = UserAuthConstants;

const authHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

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
    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: checkUserAccConnection,
    });
  } catch (error) {
    dispatch({
      type: USER_AUTH_FAILURE,
      payload: error,
    });
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
        headers: authHeaders,
      },
      payload: data,
    };
    let result = await Request.post(`signup`, request);
    console.log(result.data);
    if (result.data.error) throw result.data.message;

    SimpleToastSuccess(result.data.message);
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  } catch (error) {
    console.log(error);
    SimpleToastError(error);
  }
};

export const validateReferrer = async (referrer) => {
  try {
    let result = await timelock.UserTokenVault(referrer, 0);
    if (result.error) {
      throw result.message;
    }
    return { error: false, message: result.message.beneficiary.toString() };
  } catch (error) {
    // console.log({ error });
    return { error: true, message: error };
  }
};

export const fetchUserData = (user_address) => async (dispatch) => {
  console.log("fetch user data...");
  dispatch({ type: FETCH_USER_DATA_REQUEST });
  let User = {};
  try {
    let no_of_vaults = await timelock.totalUserVaults(user_address);
    if (no_of_vaults.error) throw no_of_vaults.message;
    no_of_vaults = no_of_vaults.message.toString();

    let no_of_referrals = await crowdsale.TotalReferralsForUser(user_address);
    if (no_of_referrals.error) throw no_of_referrals.message;
    no_of_referrals = no_of_referrals.message;

    let total_purchased = await userTotalPurchaseBalance(
      user_address,
      no_of_vaults
    );
    User.purchase_balance = total_purchased;

    let total_bonus = await userTotalBonusBalance(user_address, no_of_vaults);
    User.bonus_balance = total_bonus;

    let user_vaults = await fetchAllUserVaults(user_address, no_of_vaults);
    User.vaults = user_vaults;

    let user_referrals = await fetchAllUserReferrals(
      user_address,
      no_of_referrals
    );
    User.referrals = user_referrals;

    let airdrop_status = await crowdsale.whiteListedAddressForAirdrop(
      user_address);
    User.airdrop_is_claimed = airdrop_status.message;

    console.log(User);
    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: User,
    });
  } catch (error) {
    // console.log({ error });
    dispatch({
      type: FETCH_USER_DATA_FAILURE,
      payload: { error: true, message: error },
    });
  }
};

export const fetchAllUserVaults = async (user_address, no_of_vaults) => {
  let user_vaults = [];
  for (let i = 0; i < no_of_vaults; i++) {
    let user_vault = await timelock.UserTokenVault(user_address, i);

    user_vaults.push(user_vault.message);
  }
  return user_vaults;
};
export const fetchAllUserReferrals = async (user_address, no_of_referrals) => {
  let user_vaults = [];
  for (let i = 0; i < no_of_referrals; i++) {
    let user_vault = await crowdsale.UserReferrals(user_address, i);
    user_vaults.push(user_vault.message);
  }
  return user_vaults;
};

export const userTotalPurchaseBalance = async (user_address, no_of_vaults) => {
  let user_purchase_vaults = [];
  for (let i = 0; i < no_of_vaults; i++) {
    let user_vault = await timelock.UserTokenVault(user_address, i);
    if (user_vault.message["category"] == "purchase") {
      user_purchase_vaults.push(user_vault.message);
    }
  }
  let totalPurchaseBalance = 0;
  user_purchase_vaults.forEach((e) => {
    totalPurchaseBalance += Number(e.amount_locked);
  });
  return totalPurchaseBalance;
};

export const userTotalBonusBalance = async (user_address, no_of_vaults) => {
  let user_bonus_vaults = [];
  for (let i = 0; i < no_of_vaults; i++) {
    let user_vault = await timelock.UserTokenVault(user_address, i);
    if (user_vault.message["category"] == "bonus") {
      user_bonus_vaults.push(user_vault.message);
    }
  }
  let totalPurchaseBalance = 0;
  user_bonus_vaults.forEach((e) => {
    totalPurchaseBalance += Number(e.amount_locked);
  });
  return totalPurchaseBalance;
};
