const Axios = require("axios");
const request = require("request");
const rp = require("request-promise");
const discluded = require("./DiscludedWords.json");
const logic = require("./Logic");

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

exports.getHashtags = async (username) => {
	let entries = [];

	var options = { 
		method: "GET",
		url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
		qs: { 
			screen_name: username, 
			include_rts: 1, 
			exclude_replies: true, 
			count: "200",
			tweet_mode: "extended" 
		},
		headers: { 
			Authorization: "Bearer " + process.env.BEARER_TWITTER
		}
	};

	rp(options)
		.then(function (error, response, body) {
			if (error) throw new Error(error);
			let postText;
		
			console.log(response.statusCode);
			let jsonResponse = JSON.parse(body);
			for (let index = 0; index < jsonResponse.length; index++) {
				//lastID = jsonResponse[index].id;
				try{
					if(!jsonResponse[index].full_text.slice(0,2) == "RT"){
						postText = (jsonResponse[index].full_text);
					} else {
						postText = (jsonResponse[index].retweeted_status.full_text);
					}
				} catch(error) {
					//
				}
				//console.log(postText);
				if(postText != undefined){
					entries.push(postText);
				}
			}
			return entries;
		})
		.catch(function (error) {
			//you dun goofd
		});
};

exports.postCleanup = async (textList, username) => {
	let cleanedList = [];
	textList.forEach(element => {
		let post = element.text;
		try {
			post = post.toLowerCase();
			var expStr = discluded.join("|");
			post = post.replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), " ").replace(/\s{2,}/g, " ");
			post = post.replace(/\n/g, " ");
			post = post.replace(username, " ");
			post = post.replace(/[^a-z+ ]/g, " ");
			post = post.replace(/ [a-z] /g, " ");
	

			post = post.replace(/ +/, " ");
			cleanedList.push(post);
		} catch (error) {
			//console.log(error);
		}
	});
	return cleanedList;
};

exports.countWords = async (list) => {
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

		let topWords = [];
		let ammountOfTopWords = 5;
		for (let index = 0; index < ammountOfTopWords; index++) {
			topWords.push(sorted[index]);			
		}
		return topWords;
	} catch (error) {
		console.log(error);
	}
};