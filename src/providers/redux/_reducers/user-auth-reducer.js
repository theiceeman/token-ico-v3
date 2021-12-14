import { UserAuthConstants } from "../_constants/user-auth-constants";

const {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  // USER_WALLET_CONN_REQUEST,
  // USER_WALLET_CONN_SUCCESS,
  // USER_WALLET_CONN_FAILURE,
} = UserAuthConstants;

export function UserAuthReducer(state = {}, action) {
  switch (action.type) {
    case USER_AUTH_REQUEST:
      return { ...state, loading: true };
    case USER_AUTH_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case USER_AUTH_FAILURE:
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
}

// export function connectToUserWalletReducer(state = {}, action) {
//   switch (action.type) {
//     case USER_WALLET_CONN_REQUEST:
//       return { ...state, loading: true };
//     case USER_WALLET_CONN_SUCCESS:
//       return { ...state, data: action.payload, loading: false };
//     case USER_WALLET_CONN_FAILURE:
//       return { ...state, data: action.payload, loading: false };
//     default:
//       return state;
//   }
// }
