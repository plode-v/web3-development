import web3 from "./web3";

const address = "0xC727de55Df8437b578101D117015cB961BCd8BFB";

const abi = [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      payable: undefined,
      signature: 'constructor'
    },
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      constant: undefined,
      payable: true,
      signature: '0xe97dcb62'
    },
    {
      inputs: [],
      name: 'getAll',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x53ed5143'
    },
    {
      inputs: [],
      name: 'manager',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x481c6a75'
    },
    {
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
      constant: undefined,
      payable: undefined,
      signature: '0x5d495aea'
    },
    {
      inputs: [ [Object] ],
      name: 'players',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xf71d96cb'
    }
  ];

  export default new web3.eth.Contract(abi, address);