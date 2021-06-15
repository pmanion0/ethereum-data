/**
 * Get the Meebit details from a transaction hash
 * 
 * @param {Address} hash 
 * @param {*} meebitId 
 * @returns Object of Meebit Details
 */
async function getMeebitDetails(hash, meebitId) {
  try {
    let fullTrxn = await web3.eth.getTransaction(hash);
    let method = meebitsInterface.parseTransaction({ data: fullTrxn.input });
  
    return {
      id: meebitId,
      mintType: method.name,
      minter: fullTrxn.from,
      receipient: (method.name === 'devMint' ? method.args['recipient'] : fullTrxn.from)
    };
  } catch(err) {
    console.log(`[Meebit ${meebitId}]`);
    console.log(err);
  
    return {
      id: meebitId,
      mintType: 'ERROR',
      minter: 0,
      recipient: 0
    }
  }
}


module.exports = { getMeebitDetails };