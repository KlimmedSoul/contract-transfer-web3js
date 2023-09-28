const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id_transfer",
				"type": "uint256"
			}
		],
		"name": "cancel_transfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_all_transfers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount_of",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "to_whom",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "from_who",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "status_accept",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "canceled",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "closed",
						"type": "bool"
					},
					{
						"internalType": "bytes32",
						"name": "code_word",
						"type": "bytes32"
					}
				],
				"internalType": "struct money_transfer.Transfer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "user_code_word",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "id_transfer",
				"type": "uint256"
			}
		],
		"name": "get_money",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "user_address",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "user_code_word",
				"type": "bytes32"
			}
		],
		"name": "transfer_money",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "all_transfers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount_of",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to_whom",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from_who",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "status_accept",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "canceled",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "closed",
				"type": "bool"
			},
			{
				"internalType": "bytes32",
				"name": "code_word",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]