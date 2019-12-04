getTweets();

async function getTweets () {
	const saveFilePath = "./data/tweets.json";
	const loadFilePath = "." + saveFilePath;
	let tweetList;
	try {
		tweetList = await require(loadFilePath);
	} catch (error) {
		tweetList = await retrieveTweets();
		await saveTweets(tweetList, saveFilePath);
	}
	return tweetList;
}

async function retrieveTweets() {
	const users = require("../data/users.json");
	const Logic = require("./Logic");
	const TweetIt = require("./TweetIt");
	const tweetIt = new TweetIt();
	let tweetList = [];

	for (let user of users) {
		console.log(`Retrieving user ${user}`);
		let tweets = await tweetIt.getText(user);
		let cleanTweets = await Logic.postCleanup(tweets, user);
		cleanTweets.forEach(cleanTweet => {
			if(cleanTweet.length > 1){
				tweetList.push(cleanTweet);
			}
		});
	}
	return tweetList;
}

async function saveTweets(tweetList, filePath) {
	console.log("begin writing");
	const fs = require("fs");
	fs.writeFile(filePath, JSON.stringify(tweetList), function () { });
	console.log("done");
}