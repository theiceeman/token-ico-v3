import { CrowdsaleConstants } from "../_constants/crowdsale-constants";

const { FETCH_DETAILS_REQUEST, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAILURE,
        BUY_TOKENS_REQUEST, BUY_TOKENS_SUCCESS, BUY_TOKENS_FAILURE
} =
CrowdsaleConstants;


  
export function FetchCrowdsaleDetailsReducer(state={}, action) {
    switch (action.type) {
        case FETCH_DETAILS_REQUEST:
            return {...state, loading: true}
        case FETCH_DETAILS_SUCCESS:
            return {...state, data: action.payload, loading: false}
        case FETCH_DETAILS_FAILURE:
            return {...state, data: action.payload, loading: false}
        default:
            return state;
    }
}
export function buyTokensFromCrowdsaleReducer(state={}, action) {
    switch (action.type) {
        case BUY_TOKENS_REQUEST:
            return {...state, loading: true}
        case BUY_TOKENS_SUCCESS:
            return {...state, data: action.payload, loading: false}
        case BUY_TOKENS_FAILURE:
            return {...state, data: action.payload, loading: false}
        default:
            return state;
    }
}