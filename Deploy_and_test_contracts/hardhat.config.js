/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();  //usefull to store private key in environment variables
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-contract-sizer');

//CHECK https://dashboard.alchemy.com/
const ALCHEMY_MUMBAI_API_KEY = "snN9TOc_OMJ3VNhnmQp7cR2KCmCWg7Tl";
const ALCHEMY_POLYGON_API_KEY = "a2HjvQ8ITUhBlCCi47lCWZnocona98Sy";
const PUBLIC_KEY_DEV = "0x006af42a8167464960f05782E16455E8Aa3F0966";
//const PRIVATE_KEY_DEV = "b5.."; //only used for developpement purpose on live testnet
//const PRIVATE_KEY_DEV = "e07..";

const PRIVATE_KEY_DEV = process.env.ETH_PRIVATE_KEY_DEV;
const PUBLIC_KEY_P2P = process.env.ETH_PUBLIC_KEY;
const PRIVATE_KEY_P2P = process.env.ETH_PRIVATE_KEY;

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

    mumbai_P2P: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_P2P}`],
      gasPrice: 35000000000
    },
    polygon_P2P: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_POLYGON_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY_P2P}`],
      gasPrice:   1000000000000,
      maxFeePerGas: 100000000000,
      maxPriorityFeePerGas: 50000000000,
      //gasPrice: 350000000000, // default is 'auto' which breaks chains without the london hardfork
      //blockGasLimit: 100000000429720, // whatever you want here
    }
  },

  contractSizer: {
    alphaSort: false,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [],
  }

};


