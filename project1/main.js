var SHA256 = require("crypto-js/sha256");

class Block{


    constructor(index, timestamp,previousHash=''){
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
        //console.log("Block mined : " + this.hash);

    }
}

class Blockchain{

    constructor(){

        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, new Date().getTime(), 0);
    }

    getLatesBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChianVaild(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let youmincoin = new Blockchain();


youmincoin.addBlock(new Block(1));
youmincoin.addBlock(new Block(2));
youmincoin.addBlock(new Block(3));

console.log(youmincoin)