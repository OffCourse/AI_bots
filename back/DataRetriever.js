// getTweets().then(function (result) {
// 	console.log(result);
// });

exports.getTweets = async (forceRetrieve = false) => {
	const saveFilePath = "./data/tweets.json";
	const loadFilePath = "." + saveFilePath;
	const userList = require("../data/users.json");
	let usersToRetrieve = []; 	// Users yet to retrieve from the API
	let tweetsObj = [];			// Object containing the usernames and their tweets

	try {
		tweetsObj = await require(loadFilePath);
		// eslint-disable-next-line no-empty
	} catch (error) { }

	if (tweetsObj.length == 0 || forceRetrieve == true){
		tweetsObj = []; //Empty list when forcing to retrieve the data again
		usersToRetrieve = userList.slice();
	}
	else {
		// Check for each user if their data is already in the file
		// If not, the data of the specified user will be retrieved
		userList.forEach(user => {
			if (!tweetsObj.some(element => element.username == user)) {
				usersToRetrieve.push(user);
			}
		});
	}

	// If there are users that need to be retrieved from the API,
	// Their data is appended to tweetsObj
	if (usersToRetrieve.length > 0) {
		let newTweetsObj = await retrieveTweets(usersToRetrieve);
		newTweetsObj.forEach(tweetObj => {
			tweetsObj.push(tweetObj);
		});
		await saveTweets(tweetsObj, saveFilePath);
	}

	// Extract tweets from tweetsObj, so that the tweets are returned instead of the object
	let tweets = [];
	tweetsObj.forEach(tweetObj => {
		tweetObj.tweets.forEach(tweet => {
			tweets.push(tweet);
		});
	});

	return tweets;
}

async function retrieveTweets(users) {
	const TweetIt = require("./TweetIt");
	const tweetIt = new TweetIt();
	let tweetsObj = [];

	for (let user of users) {
		let tweetList = [];
		console.log(`Retrieving user ${user}`);
		let tweets = await tweetIt.getText(user, true);
		tweets.forEach(cleanTweet => {
			if (cleanTweet.length > 1) {
				tweetList.push(cleanTweet);
			}
		});
		tweetsObj.push({ username: user, tweets: tweetList });
	}
	return tweetsObj;
}

async function saveTweets(tweetList, filePath) {
	console.log("begin writing");
	const fs = require("fs");
	fs.writeFile(filePath, JSON.stringify(tweetList), function () { });
	console.log("done");
}
