import Crowdsale from "../../../abi/artifacts/contracts/LinkTokenCrowdsale.sol/LinkTokenCrowdsale.json";
import { ethers } from "ethers";
import { Auth } from "../Auth";
import { token } from "./token_methods";
import {
  convertWithDecimal,
  formatNumber,
} from "../../general/helper-functions";
import dotenv from 'dotenv';
dotenv.config();

export const crowdsale = {
  tokenPrice: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_CROWDSALE_CONTRACT_ADDRESS,
          Crowdsale.abi,
          provider
        );
        let result = await contractInstance.tokenPrice();

        return {
          error: false,
          message: result.toString(),
        };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
  tokensSold: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_CROWDSALE_CONTRACT_ADDRESS,
          Crowdsale.abi,
          provider
        );
        let result = await contractInstance.tokensSold();

        return {
          error: false,
          message: result.toString(),
        };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
  buyTokens: async (numberOfTokens, referrer) => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_CROWDSALE_CONTRACT_ADDRESS,
          Crowdsale.abi,
          signer
        );
        let decimal = await token.decimals();
        let name = await token.name();
        let tokenPrice = await crowdsale.tokenPrice();
        let result = await contractInstance.buyTokens(numberOfTokens, referrer,{
          value: (numberOfTokens * tokenPrice.message).toString(),
        });

        return {
          error: false,
          message:
            numberOfTokens + " " + name.message + " Purchased Successfully",
        };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: error.message };
    }
  },
  UserReferrals: async (user_address, id) => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_CROWDSALE_CONTRACT_ADDRESS,
          Crowdsale.abi,
          provider
        );
        let result = await contractInstance.UserReferrals(user_address, id);

        return {
          error: false,
          message: result.toString(),
        };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      return { error: true, message: error.message };
    }
  },
  TotalReferralsForUser: async (user_address) => {
    // console.log('result');return;
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_CROWDSALE_CONTRACT_ADDRESS,
          Crowdsale.abi,
          provider
        );
        let result = await contractInstance.TotalReferralsForUser(user_address);
        // console.log(result);

        return {
          error: false,
          message: result.toString(),
        };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      // console.log(error);
      return { error: true, message: error.message };
    }
  },
};
