const SpaceToken = artifacts.require("SpaceToken")
const SpaceTokenSale = artifacts.require("SpaceTokenSale")
const KYC = artifacts.require("KYC")

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

  it("All tokens should be in the TokenSale SM by default", async () => {
    const instance = await SpaceToken.deployed()
    const totalSupply = await instance.totalSupply()

    return expect(
      instance.balanceOf(SpaceTokenSale.address)
    ).to.eventually.be.a.bignumber.equal(totalSupply)
  })

  it("Should be possible to buy tokens", async () => {
    const tokenInstance = await SpaceToken.deployed()
    const tokenSaleInstance = await SpaceTokenSale.deployed()
    const kycInstance = await KYC.deployed()

    const balanceBefore = await tokenInstance.balanceOf(deployerAcc)
    await kycInstance.allowKYC(deployerAcc)

    expect(
      tokenSaleInstance.sendTransaction({
        from: deployerAcc,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.fulfilled

    return expect(
      tokenInstance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)))
  })
})
