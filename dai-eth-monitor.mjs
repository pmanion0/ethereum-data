import { ChainId, WETH, Fraction, Pair, Token, TokenAmount, Fetcher } from '@uniswap/sdk';
import { ethers } from 'ethers';

const alchemyApiKey = process.env.ALCHEMY_ETHEREUM_DATA_KEY;

const alchemy = new ethers.providers.AlchemyProvider(ChainId.MAINNET, alchemyApiKey);

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);

let maxIterations = 100;
let intervalSeconds = 10;

let counter = 0;

let interval = setInterval(async () => {
  counter++;

  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], alchemy);
  console.log(`DAI per ETH: ${pair.token1Price.toSignificant(7)}`);

  if (counter > maxIterations) clearInterval(interval);

}, 1000 * intervalSeconds);