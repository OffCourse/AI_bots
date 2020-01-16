const dataRetriever = require("./DataRetriever");

var wordPool;

async function prepareDataOneHot() {
	console.log("retrieving tweets");
	let tweets = await dataRetriever.getTweets();
	wordPool = createWordPool(tweets);
	console.log("Vectorizing tweets");
	let tweetVectors = [];
	tweets.forEach(tweet => {
		let tweetVector = vectorizeTweet(tweet);
		tweetVectors.push(tweetVector);
	});

	return tweetVectors;
}

async function getRecommendations(targetLabel) {
	targetLabel = targetLabel.toLowerCase();
	const vectorizedData = await prepareDataOneHot();
	const vectorizedTarget = vectorizeTweet(targetLabel);
	let recommendations = evaluateKmeans(vectorizedData, vectorizedTarget, 4);
	let result = [];
	for (let index = 0; index < recommendations.length; index++) {
		recommendations[index] = unVectorizeTweet(recommendations[index]);
		recommendations[index].forEach(recommendation => {
			result.push(recommendation);
		});
	}

	return result;
}

function evaluateKmeans(data, target, clusters) {
	const skmeans = require("skmeans");

	//Apply K-means algorithm
	console.log("Training model");
	const model = skmeans(data, clusters);

	//Test target on model
	const evaluation = model.test(target);
	
	//Get cluster index of target
	var clusterIndex = evaluation.idx;

	var recommendations = [];
	let clusterLengths = new Array(clusters).fill(0);
	//Get indexes of data in the same cluster as the target
	for (var i = 0; i < model.idxs.length; i++) {
		//Ignore the target itself
		clusterLengths[model.idxs[i]] += 1;
		if (model.idxs[i] === clusterIndex && data[i] !== target) {
			recommendations.push(data[i]);
		}
	}
	console.log("clusterLength list: " + clusterLengths);
	console.log("target cluster: " + evaluation.idx);
	return recommendations;
}

function createWordPool(data) {
	console.log("Creating word pool");
	var dict = [];
	data.forEach(string => {
		var words = splitString(string);
		words.forEach(word => {
			if (!dict.some(element => element === word)) {
				dict.push(word);
			}
		});
	});
	return dict;
}

function splitString(string){
	var words = string.split(/\s+/);
	// eslint-disable-next-line quotes
	words = words.filter(word => word != ''); //Remove empty strings
	return words;
}

function vectorizeTweet(tweet){
	let tweetVector = new Array(wordPool.length).fill(0);
	let words = splitString(tweet);
	words.forEach(word => {
		wordPool.forEach(function(poolWord, index) {
			if(word === poolWord){
				tweetVector[index] += 1;
			}
		});
	});
	return tweetVector;
}

function unVectorizeTweet(vectorizedTweet){
	let wordList = [];
	vectorizedTweet.forEach(function (vectorizedWord, index) {
		if(vectorizedWord >= 1){
			wordList.push(wordPool[index]);
		} 
	}); 
	return wordList;
}

module.exports.getRecommendations = getRecommendations;