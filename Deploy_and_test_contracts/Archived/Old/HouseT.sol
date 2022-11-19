// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract HouseT is ERC721, AccessControlUpgradeable, ERC721Upgradeable, ERC721URIStorageUpgradeable, ERC721EnumerableUpgradeable{

    address owner;
    address Aurelien_address;
    address Jonathan_address;

    mapping (uint256 => uint256[]) public House_map;
    mapping (uint256 => string) public House_name;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    modifier onlyAdmin {
        require(hasRole(ADMIN_ROLE, _msgSender()), "Only Admin-P2P");
        _;
    }

    function initialize() public initializer
    {
        __ERC721_init("HouseToken", "HouseT");
        owner = msg.sender; //The owner can withdraw all the money from commission
        Aurelien_address = 0xe7E3E925E5dcFeaF5C5CEBfbc6EfD4B404B0e607;
        Jonathan_address = 0xC117E7247be4830D169da13427311F59BD25d669;
        _setupRole(ADMIN_ROLE, owner);
        _setupRole(ADMIN_ROLE, Jonathan_address);
        _setupRole(ADMIN_ROLE, Aurelien_address);
        _setupRole(ADMIN_ROLE, address(this));
    } 

    function mint_HouseT_batch(address _to, string memory _tokenURI, uint256 amount) public onlyAdmin
    //URI  is a json string that contains the relevant infos
    {
        uint256 newTokenID = _tokenIds.current();
        _mint(_to,newTokenID);
        _setTokenURI(newTokenID, _tokenURI);
        Last_update_HouseT[newTokenID] = block.timestamp;
        _tokenIds.increment();

    }

}