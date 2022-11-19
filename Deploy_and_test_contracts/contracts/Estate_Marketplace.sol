// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract Estate_MarketPlace is Initializable{

    address public EstateT_contract_address;
    address owner;
    
    function initialize(address EstateT_contract_address_) public initializer
    {
        owner = msg.sender; //The owner can withdraw all the money from commission
        EstateT_contract_address = EstateT_contract_address_;
    } 

}