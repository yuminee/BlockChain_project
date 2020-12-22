var SHA256 = require("crypto-js/sha256");

class Block{


    constructor(index,previousHash=''){

        this.index = index,
        this.timestamp = new Date().getTime(),
        this.previousHash = previousHash
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash(){

        return SHA256(this.index + this.previousHash + this.timestamp + this.nonce).toString();

    }

    mineBlock(difficulty){

        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();

        }
    }

}

class Blockchain{

    constructor(){

        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; //난이도 조절
    }

    createGenesisBlock(){
        return new Block(0,'');
    }

    getLatesBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.index =  this.getLatesBlock().index + 1;
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.difficulty);
        if (this.isVaildBlock(newBlock, this.getLatesBlock())){
            this.chain.push(newBlock);
      
            }
        
    }

    isVaildBlock = (newBlock, previousBlock) => {
 
        if(newBlock.previousHash != previousBlock.hash){
            return false
        }
        else if(newBlock.calculateHash() !==newBlock.hash){
            return false
        }
        return true
    }
}

let youmincoin = new Blockchain();


youmincoin.addBlock(new Block());
youmincoin.addBlock(new Block());
youmincoin.addBlock(new Block());

console.log(youmincoin)