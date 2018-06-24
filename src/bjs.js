const bitcoin = require('bitcoinjs-lib')

/**
 * 
 * @param {*} provider It has to support the standard Provider methods
 */
function Bjs(provider) {
    // attributes
    this.currentProvider = provider
    this.bictoinjs = bitcoin
}

Bjs.prototype.setProvider = function (provider) {
    // this._requestManager.setProvider(provider);
    this.currentProvider = provider;
}

Bjs.prototype.getBalance = function (address) {
    return this.currentProvider.getBalance(address)
}

Bjs.prototype.sendTransaction = function (addressFrom, addressTo, amount) {
    console.log("Function not implemented yet")
}

// export default { Bjs }
module.exports = Bjs;