## Crowd Funding Smart Contract

This is a smart contract for a crowd funding DApp.
Below is the contract designs

There are two contracts in this:
1. Manager contract, this contract's purpose is to create instances of CrowdFund contract for users to create new campaigns
2. CrowdFund contract, this contract is the main contract of each campaign

### Manager Contract:
**variables:**
- deployedCampaigns (address): _addresses of all deployed campaigns_

**Functions:**
- createCampaign: _deploys a new instance of a CrowdFund and stores the resulting address
- getDeployedCampaigns: _Returns a list of all deployed campaigns

**variables:**
- manager (address): _address of the person who is managing this campaign_ 
- minimumContribution (uint): _Minimum donation required to be considered a contributor or 'approver'_
- approvers (mapping): _List of addresses for every person who has donated money_
- requests (Request[]): _List of requests that the manager has created_

**Request Struct**
- description (string): _purpost of request_
- amount (uint): _Ether to transfer_
- recipient (address): _who gets the money_
- complete (bool): _whether the request is done_
- approvals (mapping): _track who has voted_
- approvalCount (uint): _track number of approvals_

**Functions:**
- constructor: _Constructor function that sets the minimumContribution and the owner_
- contribute: _Called when someone wants to donate money to the campaign and become an 'approver'_
- createRequest: _Called by the manager to create a new 'spending request'_
- approveRequest: _Called by each contributor to approve a spending request_
- finalizeRequest: _After a request has gotten enough approvals, the manager can call this to get money sent to the vendor_

<sub>*disclaimer* This is part of a Udemy lesson. Most of the code structure are from the course.</sub>