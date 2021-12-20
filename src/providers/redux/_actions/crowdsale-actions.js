import { CrowdsaleConstants } from "../_constants/crowdsale-constants";
import { crowdsale } from "../../../lib/ethers/contracts/crowdsale_methods";

const {
  FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS_FAILURE,
  BUY_TOKENS_REQUEST,
  BUY_TOKENS_SUCCESS,
  BUY_TOKENS_FAILURE,
} = CrowdsaleConstants;

export const fetchCrowdsaleDetails = () => async (dispatch) => {
  console.log("fetching crowdsale details...");
  dispatch({ type: FETCH_DETAILS_REQUEST });

  try {
    let tokenPrice = await crowdsale.tokenPrice();
    if (tokenPrice.error) {
      throw tokenPrice.error;
    }
    let data = {
      tokenPrice: tokenPrice.message,
    };
    dispatch({
      type: FETCH_DETAILS_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: FETCH_DETAILS_FAILURE,
      payload: error,
    });
    // SimpleToastError(_name.message);
    console.log({ error });
  }
};

export const buyTokens = (numberOfTokens, referrer) => async (dispatch) => {
  console.log("buying tokens from crowdsale...");
  dispatch({ type: BUY_TOKENS_REQUEST });

  console.log({numberOfTokens, referrer});

  let res = await crowdsale.buyTokens(numberOfTokens, referrer);
  if (res.error === true) {
    return dispatch({
      type: BUY_TOKENS_FAILURE,
      payload: res,
    });
  } else if (res.error === false) {
    return dispatch({
      type: BUY_TOKENS_SUCCESS,
      payload: res,
    });
  }
};
