const { meebitsContract, nullAddress } = require('./connection');


/**
 * Get all mint/origin Meebit transfers
 * 
 * @param {import("@alch/alchemy-web3").AlchemyWeb3}
 * @param {String} pageKey 
 * @returns Object
 */
async function getTransfers(web3Alchemy, nextKey) {
  let requestJson = {
    fromBlock: "0xbc91c0", // Deployment of Meebits contract
    fromAddress: nullAddress,
    contractAddresses: [meebitsContract],
    excludeZeroValue: false,
    category: ["token"]
  };

  if (nextKey) {
    requestJson.pageKey = nextKey;
  }

  let response;
  try {
    response = await web3Alchemy.getAssetTransfers(requestJson);
  } catch(err) {
    console.log('--- ERR! ---');
    console.log(response);
    console.log(err);
    console.log('--- ERR! ---');
  }

  return {data: response.transfers, nextKey: ('pageKey' in response ? response.pageKey : null)};
}


/**
 * Iterate through 
 * 
 * @returns Array of Transfers
 */
async function buildData(web3Alchemy) {
  let data = [];
  let nextKey;

  do {
    let xfers = await getTransfers(web3Alchemy, nextKey);

    setTimeout(() => null, 3000);

    nextKey = xfers.nextKey;
    data.push(...xfers.data);

    console.log(`nextKey: ${nextKey}  data.length:${data.length}`);
  } while (nextKey);

  return data;
}


module.exports = { buildData };