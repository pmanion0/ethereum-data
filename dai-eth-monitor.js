const { WETH9, Token, Price, ChainId, TokenAmount } = require('@uniswap/sdk-core');
const { Pair } = require('@uniswap/v2-sdk');
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json');
const ethers = require('ethers');


const DAI = new Token(ChainId.MAINNET, '0x6b175474e89094c44da98b954eedeac495271d0f', 18, 'DAI', 'DAI');
const ETH = WETH9[ChainId.MAINNET];

const ethDaiAddress = Pair.getAddress(ETH, DAI);

const alchemyApiKey = process.env.ALCHEMY_ETHEREUM_DATA_KEY;
const api = new ethers.providers.AlchemyProvider(ChainId.MAINNET, alchemyApiKey);

const contract = new ethers.Contract(ethDaiAddress, IUniswapV2Pair.abi, api);

async function printPrice() {
  let [r0, r1] = await contract.getReserves();

  let [t0, t1] = DAI.sortsBefore(ETH) ? [DAI,ETH] : [ETH,DAI];
  
  let amt0 = new TokenAmount(t0, r0);
  let amt1 = new TokenAmount(t1, r1);
  let p = new Pair(amt0, amt1);

  console.log(`${DAI.symbol} per ${ETH.symbol}: ${p.priceOf(ETH).toSignificant(6)}`);
}

let maxIterations = 100;
let intervalSeconds = 10;
let counter = 0;

let interval = setInterval(async () => {
  counter++;
  printPrice();
  if (counter > maxIterations) clearInterval(interval);
}, 1000 * intervalSeconds);