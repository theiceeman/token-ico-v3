const hre = require("hardhat");
/* 
BSCMAINNET CONTRACT ADDRESSES
TOKEN-> 0x19aA442e3FaCD30D52c54c8FDE6c683A3c920C05
CROWDSALE->0x140748C52AA24ADFF7D18e630365c1481dFEF76d 
*/

/* 
token address = 0x7e1B41ba3b4965751f09a0dA7294F84e3241722D
crowdsale address = 0x9a8d223b4a6570Ad62cBF6aF52B136d1575D72c6
timelock address = 0xaa1f40187677AdB98Fdf2D748D78C1Be21f09f8C
 */
async function main() {
  const [admin] = await ethers.getSigners();
  const LinkToken = await ethers.getContractFactory("LinkToken");
  const linkToken = await LinkToken.deploy(1000000000000000000000000);
  await linkToken.deployed();
  console.log("token address "+linkToken.address)

  const tokenPrice = "1000000000000000"; //  in wei = 0.001 ETH
  const referrerPercentage = "10";
  const totalTokensForAirdrop = "90";
  const amtClaimedPerAirdrop = "50";
  const LinkTokenCrowdsale = await ethers.getContractFactory("LinkTokenCrowdsale");
  const linkCrowdSale = await LinkTokenCrowdsale.deploy(
    linkToken.address,
    tokenPrice,
    referrerPercentage,
    totalTokensForAirdrop,
    amtClaimedPerAirdrop
  );
  await linkCrowdSale.deployed();
  console.log("crowdsale address "+linkCrowdSale.address)

  const TokenTimeLock = await ethers.getContractFactory("TokenTimeLock");
  const tokenTimeLock = await TokenTimeLock.deploy(
    linkToken.address,
    31536000,
    linkCrowdSale.address
  );
  await tokenTimeLock.deployed();
  console.log("timelock address "+tokenTimeLock.address)

  await linkToken.transfer(linkCrowdSale.address, 750000000000000000000000); // Transfer 75% of total supply to crowdsale
  await linkCrowdSale.setTimeLock(tokenTimeLock.address);




  console.log(
    "Transferred",
    await linkToken.balanceOf(linkCrowdSale.address),
    " to crowdsale"
  );
  console.log("Deployers address:", admin.address);
  console.log(
    "Deployers Link Balance:",
    await linkToken.balanceOf(admin.address)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
