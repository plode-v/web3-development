const assert = require("assert");
const ganache = require('ganache-cli');
const Web3 = require("web3");
const web3 = new Web3(ganache.provider({ gasLimit: 10000000 }));

const compiledFactory = require("../ethereum/build/ContractFactory.json");
const compiledContract = require("../ethereum/build/DecenAngels.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object})
        .send({ 
            from: accounts[0], 
            gas: "10000000"
        })

    await factory.methods.deployCampaign("1000").send({
        from: accounts[0],
        gas: "10000000"
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(compiledContract.abi, campaignAddress)
});

describe("Campaigns", () => {
    it("Deploys a facotry and a campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("marks caller as the campaign manager", async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it("allows people to contribute and marks them as approvers", async () => {
        await campaign.methods.constructor().send({
            from: accounts[1],
            value: "100"
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert.equal(isContributor);
    })
});

