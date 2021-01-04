const SpaceTokenSale = artifacts.require("SpaceTokenSale")
const SpaceToken = artifacts.require("SpaceToken")

const { chai, BN } = require("./config")
const expect = chai.expect

/// /// /// /// /// /// /// /// /// /// /// /// /// ///

contract("SpaceTokenSale Test", async (accounts) => {
  const [deployerAcc, recipientAcc, otherAcc] = accounts

  it("Should not have any tokens in my deployer account", async () => {
    const instance = await SpaceToken.deployed()
    return expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(new BN(0))
  })
})
