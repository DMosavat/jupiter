const Block = require("./block");
const BlockChain = require("./blockChain");

describe("BlockChain", () => {
  let blockChain, newChain, orginalChain;

  beforeEach(() => {
    blockChain = new BlockChain();
    newChain = new BlockChain();
    orginalChain = blockChain.chain;
  });

  it("contain a `chain` Array instance", () => {
    expect(blockChain.chain instanceof Array).toBe(true);
  });

  it("starts with the genesis block", () => {
    expect(blockChain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const newData = "foo bar";
    blockChain.addBlock({ data: newData });
    expect(blockChain.chain[blockChain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain()", () => {
    describe("when the chain does not start with genesis block", () => {
      it("returns falss", () => {
        blockChain.chain[0] = { data: "fake-g" };
        expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
      });
    });

    describe("when the chain does start with genesis block and has multiple block", () => {
      beforeEach(() => {
        blockChain.addBlock({ data: "one" });
        blockChain.addBlock({ data: "two" });
        blockChain.addBlock({ data: "three" });
      });

      describe("and a lastHash refrence has changed", () => {
        it("returns falss", () => {
          blockChain.chain[2].lastHash = "broken-hash";
          expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
        });
      });
      describe("and chain contains a block with an invalid field", () => {
        it("returns falss", () => {
          blockChain.chain[2].lastHash = "broken-hash";
          expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
        });
      });
      describe("and the chain does not contain any invalid blocks", () => {
        it("returns true", () => {
          expect(BlockChain.isValidChain(blockChain.chain)).toBe(true);
        });
      });
    });
  });

  describe("replaceChain()", () => {
    describe("When the new chain is not longer", () => {
      it("does not replace the chain", () => {
        newChain[0] = { new: "chain" };
        blockChain.replaceChain(newChain.chain);
        expect(blockChain.chain).toEqual(orginalChain);
      });
    });

    describe("When the new chain is longer", () => {
      beforeEach(() => {
        newChain.addBlock({ data: "one" });
        newChain.addBlock({ data: "two" });
        newChain.addBlock({ data: "three" });
      });

      describe("and the chain is invalid", () => {
        it("does not replace the chain", () => {
          newChain.chain[2].hash = "fake-hash";
          blockChain.replaceChain(newChain.chain);
          expect(blockChain.chain).toEqual(orginalChain);
        });
      });

      describe("and the chain is valid", () => {
        it("does replace the chain", () => {
          blockChain.replaceChain(newChain.chain);
          expect(blockChain.chain).toEqual(newChain.chain);
        });
      });
    });
  });
});
