import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

function Wallet(props) {
  const { balance, setBalance, privateKey, setPrivateKey, address, setAddress } = props;

  const onChange = async (evt) => {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = "0x" + toHex((keccak256((secp.getPublicKey(privateKey)).slice(1))).slice(-20));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in a private Key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
