import {
  SimpleToastError,
  SimpleToastSuccess,
} from "../../lib/validation/handlers/error-handlers";
import {
  rate,
  wallet,
  buyTokens,
} from "../../lib/web3/contracts/crowdsale_methods";
import { loadAccounts, loadWeb3 } from "../../lib/web3/load-web3";

export const CrowdsaleService = {
  fetch_details: async () => {
    const WEB3 = await loadWeb3();
    let _rate = await rate(WEB3);
    let _wallet = await wallet(WEB3);

    let contract_details = {
      _rate,
      _wallet,
    };
    return contract_details;
  },
  buyTokens: async (amt) => {
    const WEB3 = await loadWeb3();
    const user = await loadAccounts();
    let purchase = await buyTokens(WEB3, amt, user);
    if (purchase.error === true) {
      SimpleToastError(purchase.message);
    } else {
      SimpleToastSuccess(purchase.message);
    }
    return purchase;
  },
};
