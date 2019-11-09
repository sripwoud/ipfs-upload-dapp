from dotenv import load_dotenv
from os import getenv
import json
from web3 import Web3, HTTPProvider


load_dotenv()

# web3.py instance
INFURA_KEY = getenv('INFURA_KEY')
w3 = Web3(HTTPProvider(f'https://rinkeby.infura.io/v3/{INFURA_KEY}'))
print(f'Connected to infura node: {w3.isConnected()}')
#
# get deployment account
account = w3.eth.account.privateKeyToAccount(getenv('PRIVATE_KEY'))

# get abi and bytecode
contract_json = json.load(open('./build/hash.json'))
abi = contract_json['abi']
bytecode = contract_json['bytecode']
contract = w3.eth.contract(bytecode=bytecode, abi=abi)

# deployment tx
deploy_tx = contract.constructor().buildTransaction({
    'from': account.address,
    'nonce': w3.eth.getTransactionCount(account.address)
})
signed_tx = account.signTransaction(deploy_tx)
print('Deploying contract on Rinkeby network')
tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
print('...')
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
print('Contract deployed at', tx_receipt['contractAddress'])
print('Deployment transaction', tx_hash.hex())
