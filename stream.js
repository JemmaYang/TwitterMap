var io = require('socket.io')(9000);
var level = require("level");
var Twit = require('twit');
var bacon = require("baconjs");

var db = level('./tweets.ldb');


function saveTweet(tweet) {
  db.put(tweet.id, JSON.stringify(tweet));
};

function mapTweet(tweet) {
  return {coordinates: tweet.coordinates};
}

var T = new Twit({
  consumer_key:         'ZLrjtA7H429gzwzrOmIZFTZkM',
  consumer_secret:      '12FtneGY125fbiPt7tySjneeCavdE7HfLSdh280S1G4U8PrJJh',
  access_token:         '589836889-L0FtS1CNKF11xuVnJotac3N7BRSJosQEJSeRKs2h',
  access_token_secret:  'OJ3DbnZ2S4L46IrPH92sq6o5pCtH2DwketdDWPeNpdLUd'
});

var stream = T.stream('statuses/sample');

io.on('connection', function(socket) {
  bacon.fromEventTarget(db.createValueStream(), "data")
  .bufferingThrottle(100)
  .onValue(function(tweet) {
      tweet = JSON.parse(tweet);
      io.to(socket.id).emit("tweet", mapTweet(tweet));
  });
});

//listen stream data
stream.on('tweet', function(tweet) {
  if(!tweet.coordinates) { return; }
  saveTweet(tweet);
  io.emit("tweet", mapTweet(tweet));
});
