getRecommendations("going to waag for some coding and ai related stuff.", 2).then(function (result) {
	console.log(result);
});

function prepareData(rawData) {
	let dataList = [];
	let count = 0;

	const encodedDictionary = createDictionary(rawData);
	rawData.forEach(string => {
		let words = splitString(string);
		words.forEach(function (word, wordIndex) {
			let adjacentWords = [];
			let amountOfAdjacentWords = 1; //Amount of adjacent words to look for, in front of and behind the corresponding word
			for (let adjacentIndex = -amountOfAdjacentWords; adjacentIndex <= amountOfAdjacentWords; adjacentIndex++) {
				if (adjacentIndex != 0 && words[wordIndex + adjacentIndex] != undefined) {
					let wordInDictionary = findWord(encodedDictionary, words[wordIndex + adjacentIndex]);
					adjacentWords.push(wordInDictionary[0].label);
				}
			}

			let wordInDataList = findWord(dataList, word);
			if (wordInDataList != null) {
				let oldVector = dataList[wordInDataList[0].index].vector;
				let newVector = oldVector.concat(adjacentWords);
				dataList[wordInDataList[0].index].vector = newVector;
			}
			else {
				dataList.push({ label: word, vector: adjacentWords, index: count++ });
			}
		});
	});
	return dataList;
}

function prepareTarget(dataList, targetLabel) {
	let targetInDataList = findWord(dataList, targetLabel);

	let targetVector = [];
	if (targetInDataList != null) {
		targetVector = targetInDataList[0].vector.slice();
	}

	let target = { label: targetLabel, vector: targetVector };
	return target;
}

function createDictionary(data) {
	let dict = [];
	let count = 0;
	data.forEach(string => {
		let words = splitString(string);
		words.forEach(word => {
			if (!dict.some(element => element.label == word)) {
				dict.push({ label: word, value: count++ });
			}
		});
	});  
	return dict;
}

async function getRecommendations(targetTweet, recommendationsPerWord = 1) {
	targetTweet = targetTweet.toLowerCase();

	const logic = require("./Logic");
	const saveFilePath = "./data/wordneighbor.json";
	const loadFilePath = "." + saveFilePath;

	let preparedData;
	try {
		preparedData = require(loadFilePath);
	} catch (error) {
		const dataRetriever = require("./DataRetriever");
		const rawData = await dataRetriever.getTweets();
		preparedData = prepareData(rawData);
		saveData(preparedData, saveFilePath);
	}
    
	targetTweet = await logic.cleanSinglePost(targetTweet);
	const targetLabels = splitString(targetTweet);

	let finalRecommendations = [];
	for (const targetLabel of targetLabels) {
		const preparedTarget = prepareTarget(preparedData, targetLabel);
		const recommendations = await evaluate(preparedData, preparedTarget);
		for (let index = 0; index < recommendationsPerWord; index++) {
			if (recommendations[index] != null) finalRecommendations.push(recommendations[index]);
		}
	}
	return finalRecommendations;
}

async function evaluate(data, target) {
	const Logic = require("./Logic");

	let targetInData = findWord(data, target.label);
	let recommendations = [];
    
	if (targetInData != null) {
		targetInData[0].vector.forEach(word => {
			if (word != target.label) recommendations.push(word);
		});
	}

	recommendations = Logic.countWords(recommendations);   
	return recommendations;
}

function splitString(string) {
	let words = string.split(/\s+/);
	// eslint-disable-next-line quotes
	words = words.filter(word => word != ''); //Remove empty strings   
	return words;
}

function saveData(data, filePath) {
	console.log("begin writing");
	const fs = require("fs");
	fs.writeFile(filePath, JSON.stringify(data), function () { });
	console.log("done");
}

function findWord(data, word) {
	let wordInData = data.filter(element => {
		return element.label == word;
	});

	if (wordInData.length != 0) {
		return wordInData;
	} else { return null; }
}

module.exports.getRecommendations = getRecommendations;