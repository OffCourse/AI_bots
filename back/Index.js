init();

async function init() {
	const reqTweetIt = require("./TweetIt");
	const tweetIt = new reqTweetIt();
	console.log(await tweetIt.getText("yeehaa"));

	
	//const discluded = require("./DiscludedWords.json");
	//var expStr = discluded.join("|");
	//console.log(expStr);
	
	// let users = ["yeehaa", "meiaWippoo", "simoneZeefuik", "tomoKihara", "wailQasim", "WillPollard", "chrisJulien", "flavia_Dzodan", "huwLemmey", "jakobJakobsen", "lindaStupart"];
	
	// casette.reccomendUser({ tags=[], users=[] });
	// casette.reccomentTags({ tags=[], users=[] });
}