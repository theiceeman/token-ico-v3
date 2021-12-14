import { TokenConstants } from "../_constants/token-constants";

const { FETCH_TOKEN_DETAILS_REQUEST, FETCH_TOKEN_DETAILS_SUCCESS, FETCH_TOKEN_DETAILS_FAILURE } =
  TokenConstants;


  
export function FetchTokenDetailsReducer(state={}, action) {
    switch (action.type) {
        case FETCH_TOKEN_DETAILS_REQUEST:
            return {...state, loading: true}
        case FETCH_TOKEN_DETAILS_SUCCESS:
            return {...state, data: action.payload, loading: false}
        case FETCH_TOKEN_DETAILS_FAILURE:
            return {...state, data: action.payload, loading: false}
        default:
            return state;
    }
}