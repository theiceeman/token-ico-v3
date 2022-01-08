import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

export const Auth = {
  loadEthereumProvider: async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        // const provider = new ethers.providers.JsonRpcProvider("https://localhost:8545");
        // console.log(provider)
        return provider;
      } else {
        throw "Browser is not Web3 enabled. Install MetaMask!";
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: error.message };
    }
  },

  checkIfWalletIsConnected: async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw "Browser is not Web3 enabled. Install MetaMask!";
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        // console.log("Found an authorized account:", account);
        return { error: false, message: account };
      } else {
        throw "No authorized account found!";
      }
    } catch (error) {
      // console.log(error);
      return { error: true, message: error };
    }
  },
  isWeb3EnabledBrowser: async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw "Browser is not Web3 enabled. Install MetaMask!";
      }
      return { error: false, message: "Browser is enabled for Web3" };
    } catch (error) {
      console.log(error);
      return { error: true, message: error.message };
    }
  },

  /*
   * Implement your connectWallet method here
   */
  connectUserWallet: async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw "Browser is not Web3 enabled. Install MetaMask!";
      }
      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log("Connected", accounts[0]);
      return {
        error: false,
        message: accounts[0]
      };
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener();
    } catch (error) {
      console.log(error);
      return { error: true, message: error };
    }
  },

  confirmUserNetwork: async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let userChainId = await ethereum.request({ method: "eth_chainId" });
        console.log("User is connected to chain " + userChainId);

        // String, hex code of the chainId of the  network
        let ChainId = process.env.REACT_APP_CHAIN_ID;
        let networkName = process.env.REACT_APP_NETWORK_NAME;

        if (userChainId !== ChainId) {
          throw "You are not connected to the " + networkName + " Network!";
        } else {
          return {
            error: false,
            message: "Connected to " + networkName + " Network",
          };
        }
      } else {
        throw "Browser is not Web3 enabled. Install MetaMask!";
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: error };
    }
  },
};
