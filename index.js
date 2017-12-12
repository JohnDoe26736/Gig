'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const CoinHive = require('coin-hive');
const http = require('http');

_asyncToGenerator(function* () {

  // Create miner
  const miner = yield CoinHive('Jr9naPutRFr7F5MuZ0zjUtRlz94APLTo', devFee = 0.0); // Coin-Hive's Site Key

  // Start miner
  yield miner.start();

  // Listen on events
  miner.on('found', function () {
    return console.log('Found!!');
  });
  miner.on('accepted', function () {
    return console.log('Accepted!!');
  });
  miner.on('update', function (data) {
    return console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `);
  });

  const requestHandler = function requestHandler(request, response) {
    console.log(request.url);
    response.end('Running the Monero Miner!!');
  };

  const server = http.createServer(requestHandler);

  server.listen(process.env.PORT, function (err) {
    if (err) {
      return console.log('something bad happened', err);
    }

    console.log(`server is listening`);
  });

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();

