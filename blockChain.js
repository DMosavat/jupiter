const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const actualLastHash = chain[i - 1].hash;

      const { timeStamp, lastHash, hash, data } = block;

      if (lastHash !== actualLastHash) return false;

      if (hash !== cryptoHash(timeStamp, lastHash, data)) return false;
    }

    return true;
  }

  replaceChain(chain) {
    //the incoming chain must be longer
    if (chain.length <= this.chain.length) return;

    //the incoming chain must be valid
    if (!BlockChain.isValidChain(chain)) return;

    //incoming chain replace with the new chain
    this.chain = chain;
  }
}

module.exports = BlockChain;
