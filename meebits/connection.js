const alchemy = require('@alch/alchemy-web3');
const ethers = require('ethers');

// Create an Ethersjs interface to the Meebits contract
const meebitsAbi = require('./contract_abi.json');
const meebitsInterface = new ethers.utils.Interface(meebitsAbi);

// Assign useful addresses
const meebitsContract = '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7';
const deployerContract = '0xc352b534e8b987e036a93539fd6897f53488e56a';
const nullAddress = '0x0000000000000000000000000000000000000000';


// Setup the API access
const alchemyApiKey = process.env.ALCHEMY_ETHEREUM_DATA_KEY;
const ethersApi = new ethers.providers.AlchemyProvider(null, alchemyApiKey);
const web3 = alchemy.createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
);


module.exports = { meebitsAbi, meebitsContract, deployerContract, nullAddress, meebitsInterface, web3, ethersApi };