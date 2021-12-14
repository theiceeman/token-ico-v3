import {
  MapFormErrorsInArr,
  ToastFormErrors,
} from "../../lib/validation/handlers/error-handlers";
import { loadWeb3, loadAccounts, loadNetwork } from "../../lib/web3/load-web3";

export const UserService = {
  loadUserAccount: async () => {
    const WEB3 = await loadWeb3();
    let network = await loadNetwork(WEB3);
    if (network !== "private") {
      let error = { error:true, message: "You are connected to the wrong network" };
      ToastFormErrors(MapFormErrorsInArr(error));
    }
    let user = await loadAccounts(WEB3);
    return user;
  },
};
