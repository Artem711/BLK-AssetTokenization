pragma solidity ^0.7.6;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SpaceToken is ERC20 {
    constructor(uint256 _initialSupply) public ERC20("Space Token", "SPT") {
        _mint(msg.sender, _initialSupply);
    }
}