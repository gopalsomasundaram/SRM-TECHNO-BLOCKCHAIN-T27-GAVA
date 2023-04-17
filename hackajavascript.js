// Check if Web3 is already injected
if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // If no Web3 injected, use Infura to connect to Ethereum network
    window.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/your-infura-project-id'));
  }

  // Connect to the contract on the Ethereum network
  const contractAddress = '0xbd25D7013f549d436c737E8a17ED5D4E37D73898';
  const abi = [
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "orderNumber",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "customerName",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "totalPrice",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "imageHash",
            "type": "string"
        }
    ],
    "name": "addOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "orderNumber",
            "type": "uint256"
        }
    ],
    "name": "getOrder",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}
];
  const contract = new web3.eth.Contract(abi, contractAddress);

  async function addOrder() {
    const orderNumber = document.getElementById('orderNumber').value;
    const customerName = document.getElementById('customerName').value;
    const totalPrice = document.getElementById('totalPrice').value;
    const imageHash = document.getElementById('imageHash').value;

    // Get the user's Ethereum account address
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    // Create a new order using the smart contract's "addOrder" function
    await contract.methods.addOrder(orderNumber, customerName, totalPrice, imageHash)
      .send({ from: account })
      .on('receipt', function(receipt){
        console.log(receipt);
        document.getElementById('result').innerHTML = 'Order added successfully.';
      });
  }

  async function getOrder() {
    const orderNumber = document.getElementById('getOrderNumber').value;

    // Call the smart contract's "getOrder" function to retrieve an order
    const result = await contract.methods.getOrder(orderNumber).call();

    // Display the order details
    const orderDetails = `Order Number: ${result[0]}<br>
                          Customer Name: ${result[1]}<br>
                          Total Price: ${result[2]}<br>
                          Image Hash: ${result[3]}`;
    document.getElementById('result').innerHTML = orderDetails;
  }