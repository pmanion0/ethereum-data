## (1) LOOP THROUGH ALL ASSET TRANSFERS FROM NULL ADDRESS

{
 "jsonrpc": "2.0",
 "id": 0,
 "method": "alchemy_getAssetTransfers",
 "params": [
   {
     "fromBlock": "0xbc91c0",
     "fromAddress": "0x0000000000000000000000000000000000000000",
     "contractAddresses": [
       "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7"
     ],
     "pageKey": "262b4715-2ea8-427f-9a71-b34c2b4f0b7d",
     "excludeZeroValue": false,
     "category": [
       "token"
     ]
   }
 ]
}


## (2) GET TRANSACTION DETAILS TO UNDERSTAND ORIGIN

### OPTION A: PARSE FROM RESULT LOGS

 {
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_getTransactionReceipt",
  "params": [
    $TRANSACTION_HASH_ID
  ]
}

response.result.logs[0].topics[0]:
  "0x4e3883c75cc9c752bb1db2e406a822e4a75067ae77ad9a0a4d179f2709b9e1f6" == MINT
topics[1]: recipient
topics[2]: createVia (==0 is community airdrop, != 0 either dev or sale)
   devMint:              _mint(recipient, 0)   but must be called by the DEPLOYER contract
   mintWithPunkOrGlyph:  _mint(msg.sender, _createVia);  where _createVia is the punk/glyph index (through some transformation)
   mint:                 _mint(msg.sender, 0);
response.result.from:
 "0xc352b534e8b987e036a93539fd6897f53488e56a" == Autoglyph Deployer Contract (devMint)


### OPTION B: PARSE FROM REQUEST RAW DATA

 {
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_getTransactionByHash",
  "params": [
    $TRANSACTION_HASH_ID
  ]
}

response.result.input:
   "0x2d1a12f6" === devMint
   "0x1249c58b" === normalMint
   "0xd09229a8" === mintWithPunkOrGlyph

example input: "0x2d1a12f60000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f0d5127f685fe058247e03593d04cc2c4aa061a2"

Or use the Ethers.js data parsing method! https://docs.ethers.io/v5/api/utils/abi/interface/#Interface--parsing
