const papa = require('papaparse');
const fs = require('fs');
const ethers = require('ethers');

const { buildData } = require('./meebit_inventory');
const { getMeebitDetails } = require('./meebit_details');


/**
 * SIMPLE HELPER FUNCTIONS
 */
function hex2dec(hexString) {
  return ethers.BigNumber.from(hexString).toNumber();
}

function readData(fileName) {
  try {
    let csv = fs.readFileSync(fileName, 'utf-8');
    let data = papa.parse(csv, {header: true}).data;
    return data;
  } catch (err) {
    return null;
  }  
}

function writeData(fileName, data) {
  try {
    let csv = papa.unparse(data, {header: true});
    fs.writeFileSync(fileName, csv, 'utf-8');
  } catch (err) {
    console.error(err);
  }  
}


/**
 * L
 */
(async () => { // Pull the Meebit Inventory Data
  let outputData = readData('data/mint_data.csv');

  if (!outputData) {
    await buildData(web3).then((data) => {
      writeData('data/mint_data.csv', data);
      outputData = data;
    });
  }

  return outputData;
})().then(async (data) => { // Pull the Mint Details for each Meebit
  let stored = readData('data/meebit_origin.csv');

  if (!stored) {
    let output = [];
    let counter = 0;
    let writeFrequency = 1000;

    for (let trxn of data) {
      let hash = trxn.hash;
      let meebitId = hex2dec(trxn.erc721TokenId);
      let meebitDetails = getMeebitDetails(hash, meebitId);
      output.push(meebitDetails);

      counter++;

      if (counter % writeFrequency === 0 || counter === data.length) {
        writeData(`origin_parts/meebit_origin_${Math.ceil(counter/writeFrequency)}.csv`, output);
        output = [];
      }
    }
  }

  return stored;
}).then(async (detailsData) => { // Pull all the Meebit sale information
  console.log(detailsData.length);
})
