const path = require("path");
const solc = require('solc');
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "DecenAngels.sol");
const source = fs.readFileSync(contractPath, "utf-8");

const input = {
    language: "Solidity",
    sources: {
        "DecenAngels.sol": {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["DecenAngels.sol"];
fs.ensureDirSync(buildPath);
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + ".json"), 
        output[contract]
    );
}