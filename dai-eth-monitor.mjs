import { ChainId, WETH, Fraction, Pair, Token, TokenAmount, Fetcher } from '@uniswap/sdk';

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);

let timer = 1;

let interval = setInterval(async () => {
  timer++;

  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
  console.log(`DAI per ETH: ${pair.token1Price.toSignificant(7)}`);

  if (timer > 2) clearInterval(interval);
}, 5000);