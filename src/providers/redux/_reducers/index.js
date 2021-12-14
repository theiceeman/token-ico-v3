// REDUCERS
import { combineReducers } from "redux";
import { buyTokensFromCrowdsaleReducer,  FetchCrowdsaleDetailsReducer } from "./crowdsale-details-reducer";
import { FetchTokenDetailsReducer } from "./token-details-reducer";
import {  UserAuthReducer } from "./user-auth-reducer";

export default combineReducers({
  FetchTokenDetails: FetchTokenDetailsReducer,
  FetchCrowdsaleDetails: FetchCrowdsaleDetailsReducer,
  UserAuth: UserAuthReducer,
  buyTokensFromCrowdsale: buyTokensFromCrowdsaleReducer,
  // connectToUserWallet:connectToUserWalletReducer,
});
