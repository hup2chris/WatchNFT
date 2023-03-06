// import testing libraries: https://www.chaijs.com/guide/styles/ 
const { expect, assert } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyVariable", function () {

  it("Should set the wallet", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("WatchNFT");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy();

    // wait for contract to be deployed and validated!
    await contract.deployed();

    const wall = "0xD814E14Fa07660cB9C101Cb2493897dCa5De0198";
    //const wall2 = "0xc63f3edf0ccbc286922fd39562d6347f4ac15911";
    const wall2 = "0xc63F3EDF0ccbC286922fd39562d6347F4ac15911";
    var newX = await contract.getWallet();
    console.log(newX);
    await contract.SetNFTWallet(wall);
    // getter for state variable x
    newX = await contract.getWallet();
    console.log(newX);
    assert.equal(newX, wall);
    await contract.SetNFTWallet(wall2);
    // getter for state variable x
    newX = await contract.getWallet();
    console.log(newX);
    assert.equal(newX, wall2);
  });
});