const SpaceToken = artifacts.require("SpaceToken")

const { chai, BN } = require("./config")
const expect = chai.expect

contract("SpaceToken Test", async (accounts) => {
  it("All tokens should be in my account", async () => {
    const instance = await SpaceToken.deployed()
    const totalSupply = await instance.totalSupply()

    expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(
      totalSupply
    )
  })
})
