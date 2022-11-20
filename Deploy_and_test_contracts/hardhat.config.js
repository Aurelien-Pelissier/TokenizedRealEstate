/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();  //usefull to store private key in environment variables
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-contract-sizer');

//CHECK https://dashboard.alchemy.com/
const ALCHEMY_MUMBAI_API_KEY = "snN9TOc_OMJ3VNhnmQp7cR2KCmCWg7Tl";
const ALCHEMY_POLYGON_API_KEY = "a2HjvQ8ITUhBlCCi47lCWZnocona98Sy";

//CHECK https://app.infura.io/dashboard/
const INFURA_API_KEY = "884315cf58f7470cb8520842af8b2232";

const PRIVATE_KEY_DEV = process.env.ETH_PRIVATE_KEY_DEV;

module.exports = {

  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,  //Trying to optimize the bytecode as if a function is called N times
      },
    },
  },

  
  networks: {

    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      gasPrice: 35000000000
    },

    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_POLYGON_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      gasPrice: 35000000000, // default is 'auto' which breaks chains without the london hardfork
      //blockGasLimit: 100000000429720, // whatever you want here
    },

    polygon_infura: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      gasPrice: 35000000000, // default is 'auto' which breaks chains without the london hardfork
      //blockGasLimit: 100000000429720, // whatever you want here
    },


    mumbai_infura: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      gasPrice: 35000000000, // default is 'auto' which breaks chains without the london hardfork
      //blockGasLimit: 100000000429720, // whatever you want here
    },
	
    near: {
      url: `https://aurora-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      gasPrice: 35000000000
    },

    aurora: {
      url: `https://aurora-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      gasPrice: 35000000000
    },

    testnet_aurora: {
      url: 'https://testnet.aurora.dev',
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      chainId: 1313161555,
       gasPrice: 120 * 1000000000
    },

    local_aurora: {
      url: 'http://localhost:8545',
      accounts: [`0x${PRIVATE_KEY_DEV}`],
      chainId: 1313161555,
      gasPrice: 120 * 1000000000
    },

  },
  


  contractSizer: {
    alphaSort: false,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [],
  }

};


