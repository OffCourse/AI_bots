getRecommendations("offcourse");

async function prepareData(data, targetLabel){
	var dataList = [];
	var count = 0;
	const encodedDictionary = await createDictionary(data);
	data.forEach(string => {
		var words = [];
		words = string.split(/\s+/);
		words.forEach(x => {
			var vectors = [];
			words.forEach(y => {
				if (x != y){
					var wordInDictionary = encodedDictionary.filter(function(element) {
						return element.label === y;
					});
					vectors.push(wordInDictionary[0].value);
				}
			});

			var existsInDataList = Object.keys(dataList).some(function(element) {
				return dataList[element].label === x;
			});

			if(existsInDataList){
				var wordInDataList = dataList.filter(function(element) {
					return element.label === x;
				});
				var oldVector = dataList[wordInDataList[0].index].vector;
				var newVector = oldVector.concat(vectors);
				dataList[wordInDataList[0].index].vector = newVector;
			}
			else{
				dataList.push({label: x, vector: vectors, index: count++});
			}
			
		});
	});

	var target = {};
	var targetExists = Object.keys(dataList).some(function(element) {
		return dataList[element].label === targetLabel;
	});

	if(targetExists) {
		var targetInDataList = dataList.filter(function(element) {
			return element.label === targetLabel;
		});
		target = {label: targetLabel, vector: targetInDataList[0].vector};
	}
	else {
		target = {label: targetLabel, vector: dataList.length};
	}

	return {data: dataList, target: target};
}

async function getRecommendations(target){
	const rawData = require("../cleaned_tweets.json");
	const preparedData = await prepareData(rawData, target);
	console.log(preparedData.data);
	const recommendations = evaluate(preparedData.data, preparedData.target, 100);
	console.log(recommendations);
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
		if (result.idxs[i] === clusterIndex && i != (result.idxs.length - 1)){
			recommendations.push(data[i].label);
		}
	}
	return recommendations;
}

async function createDictionary(data){
	var dict = [];
	var count = 0;
	data.forEach(string => {
		var words = [];
		words = string.split(/\s+/);
		words.forEach(word => {
			if (!dict.some(element => element["label"] === word)){
				dict.push({label: word, value: count++});
			}
		});
	});
	return dict;
}