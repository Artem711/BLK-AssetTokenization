require("dotenv").config({ path: "../.env" })
const SpaceToken = artifacts.require("SpaceToken")
const SpaceTokenSale = artifacts.require("SpaceTokenSale")
const KYC = artifacts.require("KYC")

module.exports = async (deployer) => {
  const addresses = await web3.eth.getAccounts()

  await deployer.deploy(KYC)
  await deployer.deploy(SpaceToken, process.env.INITIAL_TOKENS)
  await deployer.deploy(
    SpaceTokenSale,
    1,
    addresses[0],
    SpaceToken.address,
    KYC.address
  )

  const tokenInstance = await SpaceToken.deployed()
  await tokenInstance.transfer(
    SpaceTokenSale.address,
    process.env.INITIAL_TOKENS
  )
}
