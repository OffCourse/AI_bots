getRecommendations("offcourse");

async function prepareData(data, targetLabel) {
	var dataList = [];
	var count = 0;
	const encodedDictionary = createDictionary(data);
	data.forEach(string => {
		var words = splitString(string);
		words.forEach(function(word, wordIndex) {
			var vectors = [];
			var amountOfAdjacentWords = 2; //Amount of adjacent words to look for, in front of and behind the corresponding word
			for (var adjacentIndex = -amountOfAdjacentWords; adjacentIndex <= amountOfAdjacentWords; adjacentIndex++) {
				if (adjacentIndex != 0 && words[wordIndex + adjacentIndex] != undefined){
					var wordInDictionary = encodedDictionary.filter(function (element) {
						return element.label === words[wordIndex + adjacentIndex];
					});
					vectors.push(wordInDictionary[0].value);
					
				}
			}

			if (dataList.some(element => element["label"] === word)) {
				var wordInDataList = dataList.filter(function (element) {
					return element.label === word;
				});
				var oldVector = dataList[wordInDataList[0].index].vector;
				var newVector = oldVector.concat(vectors);
				dataList[wordInDataList[0].index].vector = newVector;
			}
			else {
				dataList.push({ label: word, vector: vectors, index: count++ });
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

async function getRecommendations(target) {
	const rawData = require("../cleaned_tweets.json");
	const preparedData = await prepareData(rawData, target);
	console.log(preparedData.data);
	//const recommendations = evaluate(preparedData.data, preparedData.target, 100);
	//console.log(recommendations);
}

function evaluate(data, target, clusters) {
	const skmeans = require("skmeans");

	//Add target to end of vector
	data.push(target);

	//Get vectors from data
	var vectors = [];
	data.forEach(entry => {
		vectors.push(entry.vector);
	});

	//Apply K-means algorithm
	var result = skmeans(vectors, clusters);

	//Get cluster index of target
	var clusterIndex = result.idxs[data.length - 1];

	//console.log(result);

	// console.log(target.label + " is in cluster# : " + clusterIndex);

	// console.log(target.label + " is clustered with: ");

	var recommendations = [];
	//Get indexes of data in the same cluster as the target
	for (var i = 0; i < result.idxs.length; i++) {
		//Ignore last element, this is the target itself
		if (result.idxs[i] === clusterIndex && i != (result.idxs.length - 1)) {
			recommendations.push(data[i].label);
		}
	}
	return recommendations;
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