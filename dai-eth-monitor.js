const { WETH9, Token, Price, ChainId, TokenAmount } = require('@uniswap/sdk-core');
const { Pair } = require('@uniswap/v2-sdk');
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json');
const ethers = require('ethers');


const DAI = new Token(ChainId.MAINNET, '0x6b175474e89094c44da98b954eedeac495271d0f', 18, 'DAI');
const ETH = WETH9[ChainId.MAINNET];

const ethDaiAddress = Pair.getAddress(ETH, DAI);

const alchemyApiKey = process.env.ALCHEMY_ETHEREUM_DATA_KEY;
const api = new ethers.providers.AlchemyProvider(ChainId.MAINNET, alchemyApiKey);

const contract = new ethers.Contract(ethDaiAddress, IUniswapV2Pair.abi, api);

contract.getReserves()
  .then(v => {
    let [r0, r1] = v;
    console.log(`r0: ${r0}  r1: ${r1}`);
    
    let price = r0/r1;
    console.log(`price: ${price}`);
  });