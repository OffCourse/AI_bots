require("dotenv").config();
const cors = require("cors");
var Logic = require("../back/Logic");
const bodyParser = require("body-parser");
const express = require("express");
var Kmeans = require("../back/Kmeans");
const recommend = require("../back/Recommend");

const app = express();
app.use(bodyParser.json());

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
		let tweet = req.body.tweet;

		//Todo: add username variable
		tweet = await Logic.postCleanup([tweet], "yeehaa");
		const reccomendations = await Kmeans.getRecommendations(tweet[0]);

		const endResult = JSON.stringify(Array.from(reccomendations));
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