import { UserAuthConstants } from "../_constants/user-auth-constants";

const {
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
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

export function FetchUserDataReducer(state = {}, action){
  switch (action.type) {
    case FETCH_USER_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FETCH_USER_DATA_FAILURE:
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
}