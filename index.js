'use strict'
//Make first and main thing in block chanin
//first blick

class Block{
  constructor(data, hash, lastHash){
    this.data = data
    this.hash = hash
    this.lastHash = lastHash
  }
}

//block chain class
class BlockChain{
  constructor(){
    const genesis = new Block('g-data', 'g-hash', 'g-LHash')
    this.chain = [genesis]
  }

  //Add new block to block chain
  addBlock(data){
    const lastHash = this.chain[ this.chain.length -1 ].hash
    const hash = hashFunc( data + lastHash )
    const block  = new Block( data, hash, lastHash )
    this.chain.push(block)
  }

}


//Hash function
const hashFunc = (input) => {
  return input
}

const fooBlockChain = new BlockChain();
fooBlockChain.addBlock('one')
fooBlockChain.addBlock('two')
fooBlockChain.addBlock('three')

console.log(fooBlockChain)
