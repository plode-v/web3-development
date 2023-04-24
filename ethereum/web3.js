import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // we are in the browser
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // We're on the server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        "0xCF530217e462ADceFCcFAE84f95ADA8323A029D8"
    );
    web3 = new Web3(provider);
};



export default web3;