pragma solidity ^0.7.6;
import "./lib/Crowdsale.sol";

contract SpaceTokenSale is Crowdsale {
     constructor(
        uint256 _rate,
        address payable _wallet,
        IERC20 _token
    ) Crowdsale(_rate, _wallet, _token) public {

    }
}