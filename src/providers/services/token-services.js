// import { token_contract } from "../../lib/provider/contracts/load_contracts";
import {
  symbol,
  totalSupply,
  name,
  decimals,
  contract_address,
} from "../../lib/ethers/contracts/token_methods";
import { loadEthereumProvider } from "../../lib/ethers/Auth";

export const TokenService = {
  fetch_details: async () => {
    const provider = await loadEthereumProvider();
    let _name = await name(provider);
    let _totalSupply = await totalSupply(provider);
    let _symbol = await symbol(provider);
    let _decimals = await decimals(provider);
    // let _contract_address = await contract_address(provider);

    let contract_details = {
      _name,
      _totalSupply,
      _symbol,
      _decimals,
      // _contract_address,
    };
    return contract_details;
  },
};
