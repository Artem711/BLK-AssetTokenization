const SpaceTokenSale = artifacts.require("SpaceTokenSale")
const SpaceToken = artifacts.require("SpaceToken")

const amount = 1000000
module.exports = async (deployer) => {
  const addresses = await web3.eth.getAccounts()

  await deployer.deploy(SpaceToken, amount)
  await deployer.deploy(SpaceTokenSale, 1, addresses[0], SpaceToken.address)
  const tokenInstance = await SpaceToken.deployed()
  await tokenInstance.transfer(SpaceTokenSale.address, amount)
}
