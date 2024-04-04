const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  // grab the parameters from the client here.
  const body = req.body;
  const proof = body.proof;
  const name = body.name;

  // send the result of the verification to the client.
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

// start the server.
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
