async function getRecommendations(minHashtags = 4) {
	const dataRetriever = require("./DataRetriever");
	const tweets = await dataRetriever.getTweets();
	let chosenTweet;
	do {
		const randomIndex = getRandomInt(tweets.length);
		chosenTweet = tweets[randomIndex];
	} while (chosenTweet.length < minHashtags);
	const hashtags = splitString(chosenTweet);
	return hashtags;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function splitString(string) {
	let words = string.split(/\s+/);
	// eslint-disable-next-line quotes
	words = words.filter(word => word != ''); // Remove empty strings   
	return words;
}

module.exports.getRecommendations = getRecommendations;