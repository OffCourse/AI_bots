var express = require("express");
var router = express.Router();
var Kmeans = require("./Kmeans.js");
var Logic = require("./Logic.js");



router.post("/post", async function (req, res) {
	try {
		const tweet = [];
		const result = new Set();
		tweet.push(req.body.tweet);
		console.log(req.body);
		const cleanedWords = await Logic.postCleanup(tweet);
		const arrayWords = await cleanedWords[0].replace(/\s\s+/g, " ").split(" ");
		// console.log(arrayWords);
		for (var i = 0; i < arrayWords.length; i++) {
			// console.log("Word: " + cleanedWords[i]);
			const temp = await Kmeans.getRecommendations(arrayWords[i]);
			// console.log("Temp: " + temp);
			for (var j = 0; j < 5; j++) {
				result.add(temp[j]);
			}
		}
		// console.log(result);
		const endResult = JSON.stringify({"result" : Array.from(result)});
		// console.log(result2);
		res.json(endResult);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;