from vyper import compiler
import json


def compile(source_code):
    out = compiler.compile_code(
        source_code,
        ['abi', 'bytecode']
    )
    return out


with open('./contracts/Hash.vy') as f:
    contract_code = f.read()
    contract = compile(contract_code)
    f.close()

with open('./build/hash.json', 'w', encoding='utf-8') as f:
    json.dump(contract, f, ensure_ascii=False, indent=2)
    f.close()
