const Axios = require("axios");
const discluded = require("./DiscludedWords.json");

exports.executeQuery = async (payload) => {
	try {
		const response = await Axios({
			method: "post",
			url: process.env.DB_URL,
			headers: { "Authorization": "Bearer " + process.env.BEARER_TOKEN },
			data: {
				query:
					payload
			}
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

exports.postCleanup = async (textList, username) => {
	let cleanedList = [];
	textList.forEach(element => {
		let post = element.text;
		try {
			post = post.toLowerCase();
			post = post.replace(/\n/g, " ");
			post = post.replace(username, " ");
			post = post.replace(/[^a-z+ ]/g, " ");
			post = post.replace(/ [a-z] /g, " ");
	
			var expStr = discluded.join("|");
			post = post.replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), " ").replace(/\s{2,}/g, " ");
			post = post.replace(/ +/, " ");
			cleanedList.push(post);
		} catch (error) {
			console.log(error);
		}
	});
	return cleanedList;
};

exports.countWords = async (list, username) => {
	try {
		let countList = [];
		let splitList = [];
		list.forEach(el => {
			if (el.match(/\b(\w+)\b/g) != null) splitList.push(el.match(/\b(\w+)\b/g));
		});

		splitList.forEach(el => {
			el.forEach(element => {
				countList[element] = (countList[element] || 0) + 1;
			});
		});

		var sorted = Object.keys(countList).sort(function (a, b) {
			return countList[b] - countList[a];
		});

		console.log(sorted);
		console.log(username + " is tagged with: " + sorted[0] + ", " + sorted[1] + ", " + sorted[2] + ", " + sorted[3] + ", " + sorted[4]);
		let topWords = [];
		return topWords;
	} catch (error) {
		console.log(error);
	}
};