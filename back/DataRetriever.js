const saveFilePath = "./data/tweets.json";
const loadFilePath = "." + saveFilePath;

exports.getTweets = async () => {
	let tweets;
	try {
		tweets = await require(loadFilePath);
	} catch (error) {
		tweets = await retrieveTweets();
	}
	return tweets;
};

async function retrieveTweets() {
	const users = require("../data/users.json");
	const Logic = require("./Logic");
	const TweetIt = require("./TweetIt");
	const tweetIt = new TweetIt();
	let tweetList = [];

	for (let index in users) {
		console.log(users[index]);
		let tweets = await tweetIt.getText(users[index]);
		let cleanTweets = await Logic.postCleanup(tweets, users[index]);
		cleanTweets.forEach(cleanTweet => {
			if(cleanTweet.length > 1){
				tweetList.push(cleanTweet);
			}
		});
	}
	await saveTweets(tweetList);
	return tweetList;
}

async function saveTweets(tweetList) {
	console.log("begin writing");
	const fs = require("fs");
	fs.writeFile(saveFilePath, JSON.stringify(tweetList), function () { });
	console.log("done");
}