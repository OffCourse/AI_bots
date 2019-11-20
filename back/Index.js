
var express = require("express");
var routes = require("./Routes.js");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({
	type: ["application/json", 'text/plain']
}));


app.use("/api", routes);

app.listen(4000);


// init();

// async function init() {
// 	const reqTweetIt = require("./TweetIt");
// 	const tweetIt = new reqTweetIt();
// 	console.log(await tweetIt.getText("yeehaa"));

	
//const discluded = require("./DiscludedWords.json");
//var expStr = discluded.join("|");
//console.log(expStr);
	
// let users = ["yeehaa", "meiaWippoo", "simoneZeefuik", "tomoKihara", "wailQasim", "WillPollard", "chrisJulien", "flavia_Dzodan", "huwLemmey", "jakobJakobsen", "lindaStupart"];
	
// casette.reccomendUser({ tags=[], users=[] });
// casette.reccomentTags({ tags=[], users=[] });
// }