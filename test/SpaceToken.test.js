const SpaceToken = artifacts.require("SpaceToken")

const { chai, BN } = require("./config")
const expect = chai.expect

/// /// /// /// /// /// /// /// /// /// /// /// /// ///

contract("SpaceToken Test", async (accounts) => {
  const [deployerAcc, recipientAcc, otherAcc] = accounts

  beforeEach(async () => {
    this.tokenInstance = await SpaceToken.new(process.env.INITIAL_TOKENS)
  })

  it("All tokens should be in my account", async () => {
    const instance = this.tokenInstance
    const totalSupply = await instance.totalSupply()

    return expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(totalSupply)
  })

  it("Is possible to send tokens btw accounts", async () => {
    const sendTokens = 1
    const instance = this.tokenInstance
    const totalSupply = await instance.totalSupply()
    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      totalSupply
    )
    expect(instance.transfer(recipientAcc, sendTokens)).to.eventually.be
      .fulfilled
    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      totalSupply.sub(new BN(sendTokens))
    )
    return expect(
      instance.balanceOf(recipientAcc)
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
  })

  it("Is not possible to send more tokens - than available in total", async () => {
    const instance = this.tokenInstance
    const totalSupply = await instance.totalSupply()
    const balanceOfDeployer = await instance.balanceOf(deployerAcc)

    expect(instance.transfer(recipientAcc, new BN(balanceOfDeployer + 1))).to
      .eventually.be.rejected
    expect(instance.balanceOf(deployerAcc)).to.eventually.be.a.bignumber.equal(
      balanceOfDeployer
    )
    return expect(
      instance.balanceOf(deployerAcc)
    ).to.eventually.be.a.bignumber.equal(totalSupply)
  })
})
