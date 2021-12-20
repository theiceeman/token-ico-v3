import { TimelockConstants } from "../_constants/timelock-constants";   

const {
    CLAIM_LOCKED_TOKEN_REQUEST,
    CLAIM_LOCKED_TOKEN_SUCCESS,
    CLAIM_LOCKED_TOKEN_FAILURE,
  } = TimelockConstants;

  
export function claimLockedTokenReducer(state = {}, action) {
    switch (action.type) {
      case CLAIM_LOCKED_TOKEN_REQUEST:
        return { ...state, loading: true };
      case CLAIM_LOCKED_TOKEN_SUCCESS:
        return { ...state, data: action.payload, loading: false };
      case CLAIM_LOCKED_TOKEN_FAILURE:
        return { ...state, data: action.payload, loading: false };
      default:
        return state;
    }
  }