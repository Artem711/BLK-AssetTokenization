const SpaceToken = artifacts.require("SpaceToken")

const { chai, BN } = require("./config")
const expect = chai.expect

contract("SpaceToken Test", async (accounts) => {
  const [deployerAcc, recipientAcc, otherAcc] = accounts

  it("All tokens should be in my account", async () => {
    const instance = await SpaceToken.deployed()
    const totalSupply = await instance.totalSupply()

    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      totalSupply
    )
  })

  it("Is possible to send tokens btw accounts", async () => {
    const sendTokens = 1
    const instance = await SpaceToken.deployed()
    const totalSupply = await instance.totalSupply()
    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      totalSupply
    )
    expect(instance.transfer(recipientAcc, sendTokens)).to.eventually.be
      .fulfilled
    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      totalSupply.sub(new BN(sendTokens))
    )
    expect(instance.balanceOf(recipientAcc)).to.eventually.be.a.bignumber.equal(
      new BN(sendTokens)
    )
  })

  it("Is not possible to send more tokens - than available in total", async () => {
    const instance = await SpaceToken.deployed()
    const totalSupply = await instance.totalSupply()
    const balanceOfDeployer = await instance.balanceOf(deployerAcc)

    expect(instance.transfer(recipientAcc, new BN(balanceOfDeployer + 1))).to
      .eventually.be.rejected
    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      balanceOfDeployer
    )
    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      totalSupply
    )
  })
})
