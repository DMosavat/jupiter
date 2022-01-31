const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe("Block", () => {
  const timeStamp = "a.data";
  const lastHash = "l-hash";
  const hash = "hash";
  const data = ["blockChain", "data"];

  const block = new Block({
    timeStamp,
    lastHash,
    hash,
    data,
  });

  it("it has time stamp, last hash and data property", () => {
    expect(block.timeStamp).toEqual(timeStamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("Genesis test", () => {
    const genesisBlock = Block.genesis();
    it("return a block instanse", () => {
      expect(genesisBlock instanceof Block).toEqual(true);
    });

    it("require the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "Mined data";
    const mineBlock = Block.mineBlock({ lastBlock, data });

    it("return a block instance", () => {
      expect(mineBlock instanceof Block).toEqual(true);
    });

    it("Set the `lastHash` to the `hash` of the lastBlock", () => {
      expect(mineBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("Set the `data`", () => {
      expect(mineBlock.data).toEqual(data);
    });

    it("Set the `timeStamp`", () => {
      expect(mineBlock.timeStamp).not.toEqual(undefined);
    });

    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(mineBlock.hash).toEqual(
        cryptoHash(mineBlock.timeStamp, lastBlock.hash, data)
      );
    });
  });
});
