require("dotenv").config({ path: "../.env" })
const SpaceTokenSale = artifacts.require("SpaceTokenSale")
const SpaceToken = artifacts.require("SpaceToken")

module.exports = async (deployer) => {
  const addresses = await web3.eth.getAccounts()

  await deployer.deploy(SpaceToken, process.env.INITIAL_TOKENS)
  await deployer.deploy(SpaceTokenSale, 1, addresses[0], SpaceToken.address)

  const tokenInstance = await SpaceToken.deployed()
  await tokenInstance.transfer(
    SpaceTokenSale.address,
    process.env.INITIAL_TOKENS
  )
}
