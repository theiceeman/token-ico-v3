require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
require("./tasks/PrintAccounts");
const {
  BSC_TEST_NODE_URL,
  DEV_ACCT_PRV_KEY,
  BSC_MAIN_NODE_URL,
  LIVE_ACCT_PRV_KEY,
  BSCSCAN_API_KEY,
  LOCAL_PRV_KEY,
} = require("./secrets.json");



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
    bsc_testnet: {
      url: BSC_TEST_NODE_URL,
      accounts: [DEV_ACCT_PRV_KEY],
    },
    bsc_mainnet: {
      url: BSC_MAIN_NODE_URL,
      accounts: [LIVE_ACCT_PRV_KEY],
    },
    localhost: {
      url: `http://localhost:8545`,
      accounts: [`${LOCAL_PRV_KEY}`],
      timeout: 150000,
      chainId: 31337,
      // gasPrice: parseInt(utils.parseUnits("132", "gwei")),
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: BSCSCAN_API_KEY,
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
