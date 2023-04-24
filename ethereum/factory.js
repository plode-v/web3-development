import web3 from "./web3.js";
import ContractFactory from "./build/ContractFactory.json";

const instance = new web3.eth.Contract(ContractFactory.abi, "0xCF530217e462ADceFCcFAE84f95ADA8323A029D8");

export default instance;
