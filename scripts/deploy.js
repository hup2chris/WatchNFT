const hre = require("hardhat");

async function main() {
    

  const WatchNFT = await hre.ethers.getContractFactory("WatchNFT");
  const watchNFT = await WatchNFT.deploy();
  await watchNFT.deployed();
  console.log("WatchNFT deployed to ", watchNFT.address);
  
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });