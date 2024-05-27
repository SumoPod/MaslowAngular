export const VEL_VENDING_MACHINE_ABI = [
  {
    "type": "function",
    "name": "velorumtest__calculateOutput",
    "inputs": [
      {
        "name": "inputRatio",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "outputRatio",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "inputAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "outputAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "remainingInput",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "velorumtest__executeVendingMachine",
    "inputs": [
      {
        "name": "smartObjectId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "quantity",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "inventoryItemIdIn",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "velorumtest__setVendingMachineRatio",
    "inputs": [
      {
        "name": "smartObjectId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "inventoryItemIdIn",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "inventoryItemIdOut",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "quantityIn",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "quantityOut",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }]