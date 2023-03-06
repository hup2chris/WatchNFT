
const hre = require("hardhat");
const web3 = require('web3');
require('dotenv').config();

async function main() {
console.log('approving');
//const swapQuoteJSON = await getQuote();
const fromTokenAddress = 0x45812AF52f22e77D1d3Af9FCb4e9c8e8D0354C15;
const erc20abi = [{
    "_format": "hh-sol-artifact-1",
    "contractName": "WatchNFT",
    "sourceName": "contracts/WatchNFT.sol",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "message",
            "type": "string"
          }
        ],
        "name": "NewWallet",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_addr",
            "type": "address"
          }
        ],
        "name": "SetNFTWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getWallet",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "wallet",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610434806100606000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80631329960414610046578063521eb27314610064578063c1174c1514610082575b600080fd5b61004e61009e565b60405161005b919061024f565b60405180910390f35b61006c6100c8565b604051610079919061024f565b60405180910390f35b61009c6004803603810190610097919061029b565b6100ee565b005b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461017c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101739061034b565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167fb5867f3811ce0fb393ec1d015c984cb79fd517ac124440f1d89b36059463ab5c4260405161020391906103d0565b60405180910390a250565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102398261020e565b9050919050565b6102498161022e565b82525050565b60006020820190506102646000830184610240565b92915050565b600080fd5b6102788161022e565b811461028357600080fd5b50565b6000813590506102958161026f565b92915050565b6000602082840312156102b1576102b061026a565b5b60006102bf84828501610286565b91505092915050565b600082825260208201905092915050565b7f4f6e6c792074686520636f6e7472616374206f776e65722063616e206368616e60008201527f6765207468652061646472657373000000000000000000000000000000000000602082015250565b6000610335602e836102c8565b9150610340826102d9565b604082019050919050565b6000602082019050818103600083015261036481610328565b9050919050565b6000819050919050565b61037e8161036b565b82525050565b7f57616c6c65742061646472657373206368616e67656400000000000000000000600082015250565b60006103ba6016836102c8565b91506103c582610384565b602082019050919050565b60006040820190506103e56000830184610375565b81810360208301526103f6816103ad565b90509291505056fea26469706673582212209d76b323290f22ac863d91e37648cbfbc1a453e60800a8a232c3c0f533f8aab564736f6c63430008090033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100415760003560e01c80631329960414610046578063521eb27314610064578063c1174c1514610082575b600080fd5b61004e61009e565b60405161005b919061024f565b60405180910390f35b61006c6100c8565b604051610079919061024f565b60405180910390f35b61009c6004803603810190610097919061029b565b6100ee565b005b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461017c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101739061034b565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167fb5867f3811ce0fb393ec1d015c984cb79fd517ac124440f1d89b36059463ab5c4260405161020391906103d0565b60405180910390a250565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102398261020e565b9050919050565b6102498161022e565b82525050565b60006020820190506102646000830184610240565b92915050565b600080fd5b6102788161022e565b811461028357600080fd5b50565b6000813590506102958161026f565b92915050565b6000602082840312156102b1576102b061026a565b5b60006102bf84828501610286565b91505092915050565b600082825260208201905092915050565b7f4f6e6c792074686520636f6e7472616374206f776e65722063616e206368616e60008201527f6765207468652061646472657373000000000000000000000000000000000000602082015250565b6000610335602e836102c8565b9150610340826102d9565b604082019050919050565b6000602082019050818103600083015261036481610328565b9050919050565b6000819050919050565b61037e8161036b565b82525050565b7f57616c6c65742061646472657373206368616e67656400000000000000000000600082015250565b60006103ba6016836102c8565b91506103c582610384565b602082019050919050565b60006040820190506103e56000830184610375565b81810360208301526103f6816103ad565b90509291505056fea26469706673582212209d76b323290f22ac863d91e37648cbfbc1a453e60800a8a232c3c0f533f8aab564736f6c63430008090033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
  ];

  
 /* const web3 = new Web3(Web3.givenProvider);

const ERC20TokenContract = new web3.eth.Contract(erc20abi, fromTokenAddress);
//const ERC20TokenContract = new web3.eth.Contract(erc20abi);

//const maxApproval = new BigNumber(2).pow(256).minus(1);
ERC20TokenContract.methods.SetNFTWallet(0xc63f3edf0ccbc286922fd39562d6347f4ac15911)
  .send({ from: 0xc0F0038b5716948AF0E3ce672312739955cD57ec })
  .then(tx => {
    console.log("tx: ", tx);
  })

console.log("setup ERC20TokenContract: ", ERC20TokenContract);*/

//const contractABI = require('../contract-abi.json')
const contractAddress = "0x45812AF52f22e77D1d3Af9FCb4e9c8e8D0354C15";
const takerAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const newAddress = "0xc63f3edf0ccbc286922fd39562d6347f4ac15911";
const origAddress = "0xD814E14Fa07660cB9C101Cb2493897dCa5De0198";

const contract = require("../artifacts/contracts/WatchNFT.sol/WatchNFT.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", process.env.REACT_APP_ALCHEMY_KEY);

// signer - you
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);

// contract instance
const WorldContract = new ethers.Contract(contractAddress, contract.abi, signer);

    const message = await WorldContract.getWallet();
    console.log("The message is: " + message); 

    console.log("Updating the message...");
    const tx = await WorldContract.SetNFTWallet(origAddress);
    await tx.wait();

    const newMessage = await WorldContract.getWallet();
    console.log("The new message is: " + newMessage); 


const alchemyKey = process.env.GOERLI_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 
//const neeAdd = web3.ethereum.SetNFTWallet;
//const newAddress = web3.ethereum.address("0xc63f3edf0ccbc286922fd39562d6347f4ac15911");

const helloWorldContract = new web3.eth.Contract(
    erc20abi,
    contractAddress
);

//helloWorldContract.methods.SetNFTWallet

/*helloWorldContract.methods.SetNFTWallet(
  newAddress
)
  .send({ from: takerAddress })
  .then(tx => {
    console.log("tx: ", tx);
  });*/

//await web3.ethereum.SetNFTWallet(0xc63f3edf0ccbc286922fd39562d6347f4ac15911);
//await helloWorldContract.SetNFTWallet(0xc63f3edf0ccbc286922fd39562d6347f4ac15911);

//const loadCurrentMessage = async () => { 
    //const message = //await helloWorldContract.wallet().call(); 
    //await helloWorldContract.methods.getWallet();
    //console.log(message);
//};


//let setNewWallet = await helloWorldContract.methods.SetNFTWallet(newAddress).encodeABI();

/*const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: takerAddress, // must match user's active address.
    data: helloWorldContract.methods.SetNFTWallet(newAddress).encodeABI(),
  };

//sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }*/



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
