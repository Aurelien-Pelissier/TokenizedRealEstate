// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract EstateT is ERC721, AccessControlUpgradeable, ERC721Upgradeable, ERC721URIStorageUpgradeable, ERC721EnumerableUpgradeable{

    address owner;
    mapping (uint256 => uint256[]) public Estate_map;
    mapping (uint256 => string) public Estate_name;

    function initialize() public initializer
    {
        __ERC721_init("EstateToken", "EstateT");
        owner = msg.sender; //The owner can withdraw all the money from commission
    } 

    function mint_SolarT(address _to, string memory _tokenURI) public onlyP2P
    //URI  is a json string that contains the relevant infos
    {
        uint256 newTokenID = _tokenIds.current();
        _mint(_to,newTokenID);
        _setTokenURI(newTokenID, _tokenURI);
        Last_update_SolarT[newTokenID] = block.timestamp;
        _tokenIds.increment();

    }

}