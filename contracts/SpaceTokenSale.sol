pragma solidity ^0.7.6;
import "./lib/Crowdsale.sol";
import "./KYC.sol";

contract SpaceTokenSale is Crowdsale {
    KYC kyc;

    constructor(
        uint256 _rate,
        address payable _wallet,
        IERC20 _token,
        KYC _kyc
    ) Crowdsale(_rate, _wallet, _token) public {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.validateKYC(msg.sender), "KYC not completed, purchase not allowed");
    }
}