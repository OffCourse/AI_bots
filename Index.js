init();

async function init() {
	const reqTweetIt = require("./TweetIt");
	const tweetIt = new reqTweetIt();
	
	// let users = ["yeehaa", "meiaWippoo", "simoneZeefuik", "tomoKihara", "wailQasim", "WillPollard", "chrisJulien", "flavia_Dzodan", "huwLemmey", "jakobJakobsen", "lindaStupart"];

	console.log(await tweetIt.getText("yeehaa"));
	
     
	// casette.reccomendUser({ tags=[], users=[] });
	// casette.reccomentTags({ tags=[], users=[] });
}