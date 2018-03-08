var request = require("request");

var Lbank = function()
{
	this.url = "https://api.lbank.info/v1/";
}

Lbank.prototype.getTrades =  function (market, cb, count) {
	var path, url, qs;

	path = "trades.do";
	qs = "?symbol=";

	url = this.url+path+qs+market;

	if(count)
	{
		url += "&size="+count;
	}

	return request(url, (err, response, body) => {
		let error, result
		if (err || (response.statusCode !== 200 && response.statusCode !== 400)) {
			return cb(new Error(err != null ? err : response.statusCode))
		}
		try {
			result = JSON.parse(body)
		} catch (error1) {
			error = error1
			return cb(null, {
				message: body.toString()
			})
		}
		if (result.message != null) {
			return cb(new Error(result.message))
		}
		return cb(null, result)
	})
}


module.exports = Lbank;

