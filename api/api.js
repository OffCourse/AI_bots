require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fs = require("fs");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
	return res.send("Received a GET HTTP method");
});

app.get("/getRecommend/:tag", (req, res) => {
	getRecommendations(req.params.tag).then(function(result) {
		return res.send(result);
	});
});

app.post("/", (req, res) => {
	return res.send("Received a POST HTTP method");
});

app.put("/", (req, res) => {
	return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
	return res.send("Received a DELETE HTTP method");
});

app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`),
);

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
	} else {
		target = { label: targetLabel, vector: dataList.length };
	}
	return { data: dataList, target: target };
}


function getRecommendations(targetLabel) {
	const rawData = require("../cleaned_tweets.json");
	const preparedData = prepareData(rawData, targetLabel);
	const recommendations = evaluate(preparedData.data, preparedData.target);
	return recommendations;
}

function evaluate(data, target) {
	const Logic = require("../back/Logic");
	var recommendations = [];
	if (data.some(element => element["label"] === target.label)) {
		var targetInData = data.filter(function (element) {
			return element.label === target.label;
		});
		targetInData[0].vector.forEach(word => {
			if (word !== target.label) recommendations.push(word);
		});
	} else {
		// //If target is not in dataset, return random recommendations
		// var randomIndex = Math.floor(Math.random() * data.length);
		// data[randomIndex].vector.forEach(word => {
		// 	if (word !== target.label) recommendations.push(word);
		// });
	}
	recommendations = Logic.countWords(recommendations);
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
