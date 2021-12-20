import { crowdsale } from "../../../lib/ethers/contracts/crowdsale_methods";
import { timelock } from "../../../lib/ethers/contracts/timelock_methods";
import { TimelockConstants } from "../_constants/timelock-constants";
const {
  CLAIM_LOCKED_TOKEN_REQUEST,
  CLAIM_LOCKED_TOKEN_SUCCESS,
  CLAIM_LOCKED_TOKEN_FAILURE,
} = TimelockConstants;

export const TotalUserTokensLocked = async (user_address) => {
  try {
    let result = await timelock.TotalUserTokensLocked(user_address);
    console.log(result);
    if (result.error) {
      throw result.message;
    }
    return { error: false, message: result.message };
  } catch (error) {
    console.log({ error });
    return { error: true, message: error };
  }
};

export const claimLockedToken = (vault_id) => async (dispatch) => {
  console.log("claiming locked token...");
  dispatch({ type: CLAIM_LOCKED_TOKEN_REQUEST });

  let result = await timelock.claim(vault_id);
  if (result.error === true) {
    return dispatch({
      type: CLAIM_LOCKED_TOKEN_SUCCESS,
      payload: result,
    });
  } else if (result.error === false) {
    return dispatch({
      type: CLAIM_LOCKED_TOKEN_FAILURE,
      payload: result,
    });
  }
};
