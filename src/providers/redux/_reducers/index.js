// REDUCERS
import { combineReducers } from "redux";
import { buyTokensFromCrowdsaleReducer,  FetchCrowdsaleDetailsReducer } from "./crowdsale-details-reducer";
import { FetchTokenDetailsReducer } from "./token-details-reducer";
import {  UserAuthReducer,FetchUserDataReducer } from "./user-auth-reducer";

export default combineReducers({
  FetchTokenDetails: FetchTokenDetailsReducer,
  FetchCrowdsaleDetails: FetchCrowdsaleDetailsReducer,
  UserAuth: UserAuthReducer,
  buyTokensFromCrowdsale: buyTokensFromCrowdsaleReducer,
  FetchUserData:FetchUserDataReducer,
  // connectToUserWallet:connectToUserWalletReducer,
});
