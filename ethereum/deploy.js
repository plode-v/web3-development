const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/ContractFactory.json");
require("dotenv").config();

const provider = new HDWalletProvider(
    process.env.ACCOUNT_MNEMONIC,
    process.env.INFURA_API
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[1]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[1], gas: "10000000" });

        console.log(JSON.stringify(compiledFactory.abi));
        console.log("Contract deployed to", result.options.address);
        provider.engine.stop();
};

deploy();