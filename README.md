## Lottery System Smart Contract

This is part of the web3 development online course projects.
It is a simple contract and functions, the rule is basically people enters amount of ETH to the pool and the contract will choose one winner and send all ETH in the pool to the winner.

### Contract Design:

**Variables:**
- manager: *Address of person who created the contract*
- players: *Array of addresses of people who have entered*

**Functions:**
- enter: *Enters a player into the lottery*
- pickWinner: *Randomly picks a winner and sends them the prize pool*