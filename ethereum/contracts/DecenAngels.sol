// SPDX-License-Identifier: UNIDENTIFIED

pragma solidity >=0.8.0;

contract ContractFactory {
    address[] public deployedCampaigns;

    function deployCampaign(uint _minimumContribution) public {
        address newCampaign = address(new DecenAngels(_minimumContribution, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract DecenAngels {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier managerOnly {
        require(msg.sender == manager, "You are not authorized");
        _;
    }

    constructor(uint _minimumContribution, address _creator) {
        manager = _creator;
        minimumContribution = _minimumContribution;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "Sorry, please put more");
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory _description, uint _value, address payable _recipient) public managerOnly {
        Request storage r = requests.push();
        r.description = _description;
        r.value = _value;
        r.recipient = _recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint _index) public {
        Request storage r = requests[_index];

        require(approvers[msg.sender], "Sorry, you are not a contributor");
        require(!r.approvals[msg.sender], "Sorry, you can only vote once.");

        r.approvals[msg.sender] = true;
        r.approvalCount++;
    }

    function finalizeRequest(uint _index) public payable managerOnly {
        Request storage r = requests[_index];
        require(!r.complete);
        require(r.approvalCount > (approversCount / 2));

        r.recipient.transfer(r.value);
        r.complete = true;
    }



}