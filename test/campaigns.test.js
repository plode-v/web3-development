const assert = require("assert");
const ganache = require('ganache-cli');
const Web3 = require("web3");
const web3 = new Web3(ganache.provider({ gasLimit: "10000000" }));

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

    await factory.methods.deployCampaign("100").send({
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
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: "100"
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    })

    it("requires a minimum amount", async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: 0
            });
            assert(false);
        } catch(err) {
            assert(err)
        }
    });

    it("allows a manager to make a payment request", async () => {
        await campaign.methods
            .createRequest("buy batteries", "100", accounts[1])
            .send({ from: accounts[0], gas: "10000000"});
            const request = await campaign.methods.requests(0).call();
            assert.equal('buy batteries', request.description);
        });
    
    it("processes requests", async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether")
        });
        await campaign.methods
        .createRequest("buy batteries", web3.utils.toWei("5", "ether"), accounts[1])
        .send({ 
            from: accounts[0],
            gas: "10000000"
        });
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: "10000000"
        });
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: "10000000"
        });
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);
        assert(balance > 104);
    });

    it("lets only the manager to create requests", async () => {
        try {
            await campaign.methods
                .createRequest("A", web3.utils.toWei("1", "ether"), accounts[1])
                .send({ 
                    from: accounts[2], 
                    gas: "10000000"
                });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
});

