const { argv } = require('node:process');
const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Read `name`, passed as a CLI argument from stdin.
  const args = argv;
  if (args.length !== 3) {
    console.log(`Expected one argument, got ${args.length - 2} argument(s) instead.`)
    return
  }
  const name = args[2];

  // get the merkle proof of `name` from the nicelist merkle tree.
  const merkleTree = new MerkleTree(niceList);
  const nameIdx = niceList.findIndex((element) => { return name === element });
  const proof = merkleTree.getProof(nameIdx);

  // send the merkle proof to the server for verification, along with `name`.
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  // print the result of verification.
  console.log({ gift });
}

main();