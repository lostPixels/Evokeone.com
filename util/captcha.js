const
  https = require('https'),
  querystring = require('querystring');

var secretKey = "6LeUhiMTAAAAAD4SLOq8yjZXM6cqP2q6Duq3Rz5Y";

function verify(captchaResponse, callback){
  var data = querystring.stringify({
    secret: secretKey,
    response: captchaResponse
  });

  var options = {
    host: 'www.google.com',
    port: 443,
    path: '/recaptcha/api/siteverify',
    method: 'POST',
    headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
    }
  };

  var req = https.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data', function(result){
      result = JSON.parse(result);
      callback(result['success']);
    });
  });

  req.write(data);
  req.end();
}

exports.verify = verify;
