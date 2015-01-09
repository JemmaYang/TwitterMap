var io = require('socket.io')(9000);

var Twit = require('twit')

var T = new Twit({
  consumer_key:         'ZLrjtA7H429gzwzrOmIZFTZkM',
  consumer_secret:      '12FtneGY125fbiPt7tySjneeCavdE7HfLSdh280S1G4U8PrJJh',
  access_token:         '589836889-L0FtS1CNKF11xuVnJotac3N7BRSJosQEJSeRKs2h',
  access_token_secret:  'OJ3DbnZ2S4L46IrPH92sq6o5pCtH2DwketdDWPeNpdLUd'
});

var stream = T.stream('statuses/sample');

//listen stream data
stream.on('tweet', function(tweet) {
  if(!tweet.coordinates) { return; }
  io.emit("tweet", {coordinates: tweet.coordinates});
});
