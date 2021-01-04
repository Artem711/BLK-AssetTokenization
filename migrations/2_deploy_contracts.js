const SpaceToken = artifacts.require("SpaceToken")

module.exports = async (deployer) => {
  await deployer.deploy(SpaceToken, 1000000)
}
