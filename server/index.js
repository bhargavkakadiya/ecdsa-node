const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0xd6adbede82b4f6058b4133b25a38b5c761c0ab61": 100,
  "0x5468d141032fc0ba10a8831a4426a498e107a6aa": 50,
  "0x20585c2c34ab5701c24cb021857ccb7602c1631b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { data } = req.body;
  let {message, sig} = data;
  let [signature, recoveryBit] = sig;
  message = JSON.parse(message);
  let {recipient, amount} = message;
  amount = parseInt(amount);
  
  const hash = keccak256(utf8ToBytes(JSON.stringify(message)));

  const publicKey = secp.recoverPublicKey(hash, Uint8Array.from(Object.values(signature)), recoveryBit);
  const address = "0x" + toHex((keccak256(publicKey.slice(1))).slice(-20));

  const sender = address;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    // subtract from sender
    // add to recipient
    console.log(balances)
    balances[sender] -= amount;
    balances[recipient] += amount;
    console.log(balances)
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
