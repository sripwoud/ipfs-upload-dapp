const {
  BN,
  constants,
  expectEvent,
  shouldFail
} = require('openzeppelin-test-helpers')
const should = require('chai').should()

const Hash = artifacts.require('Hash')

contract('hash', async ([_, ...otherAccounts]) => {
  let hash

  beforeEach(async function () {
    hash = await Hash.new()
    hash.initialize()
  })

  it('should have proper default value', async () => {
    (await counter.ipfHash().call()).should.equal(value)
  })

  it('should update ipfsHash value', async () => {
    await hash.setHash('test');
    (await hash.ipfsHash()).should.equal('test')
  })
})
