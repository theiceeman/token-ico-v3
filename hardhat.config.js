require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
require("./tasks/PrintAccounts");
const dotenv = require("dotenv");
dotenv.config();



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    /* rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
      accounts: [privateKey1, privateKey2, ...]
    } */
    polygon_mumbai: {
      url: process.env.REACT_APP_POLYGON_MUMBAI_TEST_NODE_URL,
      accounts: [process.env.REACT_APP_DEV_ACCT_PRV_KEY],
    },
    /* bsc_testnet: {
      url: process.env.REACT_APP_TEST_NODE_URL,
      accounts: [process.env.REACT_APP_DEV_ACCT_PRV_KEY],
    },
    bsc_mainnet: {
      url: process.env.REACT_APP_BSC_MAIN_NODE_URL,
      accounts: [process.env.REACT_APP_LIVE_ACCT_PRV_KEY],
    }, */
    localhost: {
      url: `http://localhost:8545`,
      accounts: [`${process.env.REACT_APP_LOCAL_PRV_KEY}`],
      timeout: 150000,
      chainId: 31337,
      // gasPrice: parseInt(utils.parseUnits("132", "gwei")),
    },
  },
  etherscan: {
    apiKey: process.env.REACT_APP_BSCSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.7.0",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./src/abi/cache",
    artifacts: "./src/abi/artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
