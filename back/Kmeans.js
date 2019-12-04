const dataRetriever = require("./DataRetriever");

var wordPool;

function prepareData(rawData, targetLabel) {
	var dataList = [];
	var count = 0;

	const encodedDictionary = createDictionary(rawData);
	rawData.forEach(string => {
		var words = splitString(string);
		words.forEach(function(word, wordIndex) {
			var values = [];
			var amountOfAdjacentWords = 1; //Amount of adjacent words to look for, in front of and behind the corresponding word
			for (var adjacentIndex = -amountOfAdjacentWords; adjacentIndex <= amountOfAdjacentWords; adjacentIndex++) {
				if (adjacentIndex != 0 && words[wordIndex + adjacentIndex] != undefined){
					var wordInDictionary = encodedDictionary.filter(function (element) {
						return element.label === words[wordIndex + adjacentIndex];
					});
					values.push(wordInDictionary[0].label); //Note: change "label" to "value" when using K-means 
					
				}
			}

			if (dataList.some(element => element["label"] === word)) {
				var wordInDataList = dataList.filter(function (element) {
					return element.label === word;
				});
				
				var oldVector = dataList[wordInDataList[0].index].vector;
				var newVector = oldVector.concat(values);
				dataList[wordInDataList[0].index].vector = newVector;
				
			}
			else {
				dataList.push({ label: word, vector: values, index: count++ });
			}
		});
	});

	var target = {};
	if (dataList.some(element => element["label"] === targetLabel)) {
		var targetInDataList = dataList.filter(function (element) {
			return element.label === targetLabel;
		});
		target = { label: targetLabel, vector: targetInDataList[0].vector };
	}
	else {
		target = { label: targetLabel, vector: dataList.length };
	}

	return { data: dataList, target: target };
}

function shapeData(data, target) {
	const vectorLimit = 10;
	data.forEach(element => {
		element.vector = element.vector.slice(0, vectorLimit);
	});
	//target.vector = target.vector.slice(0, vectorLimit);

	return { data: data, target: target };
}

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
	//const rawData = require("../cleaned_tweets.json");
	//const preparedData = prepareData(rawData, targetLabel);
	//const shapedData = shapeData(preparedData.data, preparedData.target);
	
	//const recommendations = evaluate(preparedData.data, preparedData.target);

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

function evaluate(data, target) {
	const Logic = require("./Logic");
	var recommendations = [];
	if (data.some(element => element["label"] === target.label)) {
		var targetInData = data.filter(function (element) {
			return element.label === target.label;
		});
		targetInData[0].vector.forEach(word => {
			if (word !== target.label) recommendations.push(word);
		});
	}
	else {
		//If target is not in dataset, return random recommendations
		var randomIndex = Math.floor(Math.random() * data.length);
		data[randomIndex].vector.forEach(word => {
			if (word !== target.label) recommendations.push(word);
		});
	}

	recommendations = Logic.countWords(recommendations);

	return recommendations;
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
		//Ignore last element, this is the target itself
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

function createDictionary(data) {
	var dict = [];
	var count = 0;
	data.forEach(string => {
		var words = splitString(string);
		words.forEach(word => {
			if (!dict.some(element => element["label"] === word)) {
				dict.push({ label: word, value: count++ });
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