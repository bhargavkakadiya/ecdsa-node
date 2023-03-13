const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

// get random private key
const privateKey = secp.utils.randomPrivateKey();

// get public key from private key
const publicKey = secp.getPublicKey(privateKey);

// get address from public key
const address = "0x" + toHex((keccak256(publicKey.slice(1))).slice(-20));

console.log({ 
    privateKey: toHex(privateKey), 
    publicKey: toHex(publicKey), 
    address });

// Random generated keys for testing

// Private key:  2a74e11e56342bcc052c034e40d7213c59f7b821ccf6ee14104a4440ee710ba6
// Public key:  041239093643eb8028cbecd28189d7b58ea6e9ca0704973994d641d098654baa5dd0d472a57790a9239f10d85a779cd617949ebb8e4c14e28cb4d99a636c01c60e
// Address: 0xd6adbede82b4f6058b4133b25a38b5c761c0ab61

// Private key:  89831a4e503ce743dfbed0ce0881a7adaa7f812c16852b49073843edf1ee7c76
// Public key:  04bf19e5477702fa519af48af91ec98e7bc23691b12f7bcb8f90b18b5369fc5783dc9408bf7b6386a54e0f0f21eae06185796bbe342fbc02848892b0a6ea7b60b1
// Address: 0x5468d141032fc0ba10a8831a4426a498e107a6aa

// Private key:  9e350f4460a32f8168a54f2596246a0f098e70ad8e40779155a5e8f689bbc9d6
// Public key:  041f05d0db24691e1efef64bf39368d57d87d26b3e46529da5daf5c6921850321d5c39267a54c4fe232cb563690b94366019e158c374e8ea55126f8ffe70fa36a7
// Address: 0x20585c2c34ab5701c24cb021857ccb7602c1631b

