require("dotenv").config();
const cors = require("cors");
var Logic = require("../back/Logic");
const express = require("express");
var Kmeans = require("../back/Kmeans");
const recommend = require("../back/Recommend");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
	return res.send("Received a GET HTTP method");
});

app.get("/getRecommend/:username/:tag", (req, res) => {
	recommend.getRecommendations(req.params.username, req.params.tag).then(function (result) {
		return res.send(result);
	});
});

app.post("/", (req, res) => {
	return res.send("Received a POST HTTP method");
});

app.post("/api/post", async function (req, res) {
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
		const endResult = await JSON.stringify({"result" : Array.from(result)});
		// console.log(result2);
		res.json(endResult);
	} catch (error) {
		console.log(error);
	}
});

app.put("/", (req, res) => {
	return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
	return res.send("Received a DELETE HTTP method");
});

app.listen(process.env.API_PORT, () =>
	console.log(`Example app listening on port ${process.env.API_PORT}!`),
);