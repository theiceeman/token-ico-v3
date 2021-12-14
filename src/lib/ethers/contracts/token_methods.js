import LinkToken from "../../../abi/artifacts/contracts/LinkToken.sol/LinkToken.json";
import { ethers } from "ethers";
import { Auth } from "../Auth";
import {
  convertWithDecimal,
  formatNumber,
} from "../../general/helper-functions";
import dotenv from "dotenv";
dotenv.config();

export const token = {
  name: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
          LinkToken.abi,
          provider
        );
        let result = await contractInstance.name();
        return { error: false, message: result };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
  totalSupply: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
          LinkToken.abi,
          provider
        );
        let result = await contractInstance.totalSupply();
        let decimal = await token.decimals();

        return {
          error: false,
          message: formatNumber(
            convertWithDecimal(result.toString(), decimal.message)
          ),
        };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
  symbol: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
          LinkToken.abi,
          provider
        );
        let result = await contractInstance.symbol();
        // console.log(result);
        return { error: false, message: result };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
  decimals: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (provider) {
        const contractInstance = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
          LinkToken.abi,
          provider
        );
        let result = await contractInstance.decimals();
        // console.log(result.toString());
        return { error: false, message: result.toString() };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
};
