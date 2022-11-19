/*
TODO before running the script:
- Install Visual studio Node.js development tool (https://visualstudio.microsoft.com/downloads/)
- Install the LTS version from the Node.js website (https://nodejs.org/en/download/)
- npm install --save-dev hardhat
- npm install --save-dev @openzeppelin/hardhat-upgrades
- npm install --save-dev @nomiclabs/hardhat-ethers
- npm install --save-dev @nomiclabs/hardhat-etherscan


move the 3 contracts into ./contracts
use the hardhat.config.js from this repository
Deploy with
- npx hardhat compile
- npx hardhat run deploy_contracts.js --network near
*/


async function main () {


    const owner_ = "0xC117E7247be4830D169da13427311F59BD25d669"; //Aurelien's address
    const use_whitelist = false; //change to false if you dont want whitelist
    const testnet = false; //change to false if deploying on mainet
    var trusted_forwarder; //https://docs.biconomy.io/misc/contract-addresses#eip-2771-contracts-trusted-forwarder
    var USDC_contract_address;
    if (testnet == true) 
    {
      USDC_contract_address = '0x6544F9dEe64b77cD6cD33eb08Ec17948457c5FeD'; // USDC address on Polygon Testnet (Mumbai) [Contract created by me]
      trusted_forwarder_address = '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b'; //Forwarder contract on Polygon Testnet (Mumbai)
    }
    else
    {
      USDC_contract_address = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; //USDC address on Polygon
      trusted_forwarder_address = '0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8'; //Forwarder contract on Polygon
    }


    // Deploy contracts
    const HouseT_ = await ethers.getContractFactory('BH_HouseT');
    const FungibleHouse_ = await ethers.getContractFactory('BH_FungibleBlockhouse');
    const BHMarketplace_ = await ethers.getContractFactory('BH_MarketPlace');

    console.log('Deploying HouseT...');
    const HouseT = await upgrades.deployProxy(HouseT_, [owner_, USDC_contract_address, trusted_forwarder_address, use_whitelist], {initializer: 'initialize'});
    await HouseT.deployed();
    const HouseT_address = HouseT.address;
    console.log("HouseT proxy deployed to:", HouseT.address);
    sleep(3000);

    console.log('Deploying FungibleHouse...');
    const FungibleHouse = await upgrades.deployProxy(FungibleHouse_, [HouseT_address, owner_, USDC_contract_address, trusted_forwarder_address], {initializer: 'initialize'});
    await FungibleHouse.deployed();
    const FungibleHouse_address = FungibleHouse.address;
    console.log('FungibleHouse proxy deployed to:', FungibleHouse.address);
    sleep(3000);

    console.log('Deploying BHMarketplace...');
    const BHMarketplace = await upgrades.deployProxy(BHMarketplace_, [HouseT_address, FungibleHouse_address, owner_, USDC_contract_address, trusted_forwarder_address], {initializer: 'initialize'});
    await BHMarketplace.deployed();
    const BHMarketplace_address = BHMarketplace.address;
    console.log('BHMarketplace proxy deployed to:', BHMarketplace.address);
    sleep(3000);

    //Initialize HouseT with the correct addresses
    await HouseT.update_addresses(BHMarketplace_address, FungibleHouse_address);
    console.log('HouseT initialized');

    //Initialize FungibleHouse with the correct addresses
    await FungibleHouse.update_addresses(BHMarketplace_address);
    console.log('FungibleHouse initialized');
  


    //save latest address in file
    content = HouseT_address + '\n' + BHMarketplace_address + '\n' + FungibleHouse_address;
    fs = require('fs');
    fs.writeFile('latest_deployed_addresses.txt', content, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });

    await sleep(1000); //ms

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });