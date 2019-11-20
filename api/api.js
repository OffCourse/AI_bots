require("dotenv").config();
const cors = require("cors");
const express = require("express");
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

app.put("/", (req, res) => {
	return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
	return res.send("Received a DELETE HTTP method");
});

app.listen(process.env.API_PORT, () =>
	console.log(`Example app listening on port ${process.env.API_PORT}!`),
);