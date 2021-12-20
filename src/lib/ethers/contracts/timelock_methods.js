import dotenv from "dotenv";
import Timelock from "../../../abi/artifacts/contracts/TokenTimeLock.sol/TokenTimeLock.json";
import { ethers } from "ethers";
import { Auth } from "../Auth";
dotenv.config();

export const timelock = {
  releaseTime: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (!provider) {
        throw "Ethereum object doesn't exist!";
      }
      const contractInstance = new ethers.Contract(
        process.env.REACT_APP_TIMELOCK_CONTRACT_ADDRESS,
        Timelock.abi,
        provider
      );
      let result = await contractInstance.releaseTime();

      return {
        error: false,
        message: result.toString(),
      };
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
  totalTokensLocked: async () => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (!provider) {
        throw "Ethereum object doesn't exist!";
      }
      const contractInstance = new ethers.Contract(
        process.env.REACT_APP_TIMELOCK_CONTRACT_ADDRESS,
        Timelock.abi,
        provider
      );
      let result = await contractInstance.totalTokensLocked();

      return {
        error: false,
        message: result.toString(),
      };
    } catch (error) {
      console.log(error);
      return { error: true, message: err.message };
    }
  },
  TotalUserTokensLocked: async (user_address) => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (!provider) {
        throw "Ethereum object doesn't exist!";
      }
      const contractInstance = new ethers.Contract(
        process.env.REACT_APP_TIMELOCK_CONTRACT_ADDRESS,
        Timelock.abi,
        provider
      );
      let result = await contractInstance.TotalUserTokensLocked(user_address);
      console.log(result);

      return {
        error: false,
        message: result.toString(),
      };
    } catch (error) {
      // console.log(error);
      return { error: true, message: error.message };
    }
  },
  UserTokenVault: async (user_address, vault_id) => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (!provider) {
        throw "Ethereum object doesn't exist!";
      }
      const contractInstance = new ethers.Contract(
        process.env.REACT_APP_TIMELOCK_CONTRACT_ADDRESS,
        Timelock.abi,
        provider
      );
      let result = await contractInstance.UserTokenVault(
        user_address,
        vault_id
      );
      // console.log(result);
      return {
        error: false,
        message: result,
      };
    } catch (error) {
      // console.log(error);
      return { error: true, message: error.message };
    }
  },
  totalUserVaults: async (user_address) => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (!provider) {
        throw "Ethereum object doesn't exist!";
      }
      const contractInstance = new ethers.Contract(
        process.env.REACT_APP_TIMELOCK_CONTRACT_ADDRESS,
        Timelock.abi,
        provider
      );
      let result = await contractInstance.totalUserVaults(user_address);

      return {
        error: false,
        message: result.toString(),
      };
    } catch (error) {
      console.log(error);
      return { error: true, message: error.message };
    }
  },
  claim: async (vault_id) => {
    try {
      const provider = await Auth.loadEthereumProvider();
      if (!provider) {
        throw "Ethereum object doesn't exist!";
      }
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        process.env.REACT_APP_TIMELOCK_CONTRACT_ADDRESS,
        Timelock.abi,
        signer
      );
      let result = await contractInstance.claim(vault_id);

      return {
        error: false,
        message: "Token claimed successfully",
      };
    } catch (error) {
      console.log(error);
      return { error: true, message: error.message };
    }
  },
};
