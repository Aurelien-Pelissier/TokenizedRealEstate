// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract USDC_mint is ERC20, ERC20Burnable, BaseRelayRecipient {

    address owner;
    constructor(address forwarder_) ERC20("USDC", "USDC") {
        owner = _msgSender();
        _setTrustedForwarder(forwarder_);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function update_trusted_forwarder(address forwarder_) public
    {
        require(_msgSender() == owner, "Only owner can change address");
        _setTrustedForwarder(forwarder_);
    }

    string public override versionRecipient = "2.2.0";

    function _msgSender() internal view override(Context, BaseRelayRecipient)
        returns (address sender) {
        sender = BaseRelayRecipient._msgSender();
    }

    function _msgData() internal view override(Context, BaseRelayRecipient)
        returns (bytes calldata) {
        return BaseRelayRecipient._msgData();
    }


}
