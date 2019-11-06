import pytest


@pytest.fixture
def hash_contract(w3, get_contract):
    with open('../ethereum/contracts/Hash.vy') as f:
        contract_code = f.read()
        contract = get_contract(contract_code)
    return contract


def test_setHash(w3, hash_contract):
    k0 = w3.eth.accounts[0]

    # let k0 set hash
    hash_contract.setHash('test'.encode('utf-8'), transact={"from": k0})
    result = hash_contract.ipfsHash().rstrip(b'\x00').decode('utf-8')
    assert result == 'test'
