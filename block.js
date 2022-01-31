"use strict";
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
  constructor(blockData) {
    this.timeStamp = blockData["timeStamp"];
    this.lastHash = blockData["lastHash"];
    this.hash = blockData["hash"];
    this.data = blockData["data"];
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock(mineData) {
    const timeStamp = Date.now();
    const lastHash = mineData["lastBlock"].hash;

    const blockData = {
      timeStamp,
      lastHash,
      data: mineData["data"],
      hash: cryptoHash(timeStamp, lastHash, mineData["data"]),
    };
    return new this(blockData);
  }
}

module.exports = Block;
