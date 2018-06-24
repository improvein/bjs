

// --- workaround to use httpprovider in different envs
// browser
if (typeof window !== 'undefined' && window.XMLHttpRequest) {
    XMLHttpRequest = window.XMLHttpRequest; // jshint ignore: line
    // node
} else {
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // jshint ignore: line
}
let XHR2 = require('xhr2'); // jshint ignore: line

function BlockcypherProvider(url, token) {
    this.url = url
    this.token = token

}

/**
 * Should be called to prepare new XMLHttpRequest
 *
 * @method prepareRequest
 * @param {Boolean} true if request should be async
 * @return {XMLHttpRequest} object
 */
BlockcypherProvider.prototype.prepareRequest = function (method, endpoint, async) {
    var request;

    if (async) {
        request = new XHR2();
        // request.timeout = this.timeout;
    } else {
        request = new XMLHttpRequest();
    }

    request.open(method, this.url + endpoint, async);
    // if (this.user && this.password) {
    //     var auth = 'Basic ' + new Buffer(this.user + ':' + this.password).toString('base64');
    //     request.setRequestHeader('Authorization', auth);
    // } 
    // request.setRequestHeader('Content-Type', 'application/json');
    // if (this.headers) {
    //     this.headers.forEach(function (header) {
    //         request.setRequestHeader(header.name, header.value);
    //     });
    // }
    return request;
};

BlockcypherProvider.prototype.getNetworkName = function () {
    console.log("Not implemented.")
}

/**
 * @method getBalance
 * @param {string} address 
 * @returns {Promise}
 */
BlockcypherProvider.prototype.getBalance = function (address) {
    return new Promise((resolve, reject) => {
        var request = this.prepareRequest("GET", `/addrs/${address}/balance`, true);

        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.timeout !== 1) {
                var result = request.responseText;
                var error = null;

                try {
                    result = JSON.parse(result);
                } catch (e) {
                    let error = new Error(request.responseText)
                    reject(error)
                    return
                }

                resolve(result.balance)
            }
        };

        request.ontimeout = function () {
            // callback(errors.ConnectionTimeout(this.timeout));
            let error = new Error("Connection timeout")
            reject(error)
        };

        try {
            request.send();
        } catch (e) {
            let error = new Error("Connection error: " + this.host)
            reject(error)
            return
        }
    })
}

BlockcypherProvider.prototype.getTransactions = function (address) {
    console.log("Not implemented.")
}

BlockcypherProvider.prototype.sendTransaction = function (rawTxHex) {
    console.log("Not implemented.")
}

module.exports = BlockcypherProvider