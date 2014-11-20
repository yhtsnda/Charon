var request = require('request');
var _ = require('lodash');

module.exports =  {
    forward: function (req, res) {
        var id = req.param('id');

        Rule.findOne({
            id: id
        }).exec(function (err, rule) {
            var options = {
                url: rule.dist,
                method: rule.distMethod,
                headers: req.headers,
                qs: req.query
            };

            request(options, function (err, resp, body) {
                _.each(resp.headers, function (value, key) {
                    res.header(key, value);
                });
                res.send(resp.statusCode, body);
            });
        });
    }
};
