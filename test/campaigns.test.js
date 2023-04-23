const assert = require("assert");
const ganache = require('../ethereum/ganache-cli');
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CotractFactory.json");
const compiledContract = require("../etherum/build/DecenAngels.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object})
        .send({ from: accounts[0], gas: "1000000"})
});

