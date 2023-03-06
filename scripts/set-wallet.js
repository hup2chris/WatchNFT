// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 // const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  const l1Address = "0xc63f3edf0ccbc286922fd39562d6347f4ac15911";
  const l2Address = "0xD814E14Fa07660cB9C101Cb2493897dCa5De0198";

  const WatchNFT = await hre.ethers.getContractFactory("WatchNFT");
  const watchNFT = await WatchNFT.deploy();
  await watchNFT.deployed();
  console.log("WatchNFT deployed to ", watchNFT.address);
  console.log("== start ==");

  console.log("== get wallet ==");
  let wallet = await watchNFT.getWallet();
  console.log(wallet);

  console.log("== set wallet ==");
  wallet = await watchNFT.SetNFTWallet(l1Address);
  console.log(wallet);

  console.log("== get wallet ==");
  wallet = await watchNFT.getWallet();
  console.log(wallet);

  console.log("== set wallet ==");
  wallet = await watchNFT.SetNFTWallet(l2Address);
  console.log(wallet);

  console.log("== get wallet ==");
  wallet = await watchNFT.getWallet();
  console.log(wallet);

  //let storedData = 
 /* await watchNFT.set(75);

  let storedData = await watchNFT.get();
  console.log(storedData);
  const newX = await watchNFT.wallet();
  console.log(newX);*/

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
