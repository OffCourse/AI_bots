const Axios = require("axios");
const rp = require("request-promise");
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

function setOptions(username, maxId = 0, postsPerCall) {
	let options;
	if(maxId == 0) {
		options = { 
			method: "GET",
			url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
			qs: { 
				screen_name: username, 
				include_rts: 1, 
				exclude_replies: true, 
				count: `${postsPerCall}`,
				tweet_mode: "extended"
			},
			headers: { 
				Authorization: "Bearer " + process.env.BEARER_TWITTER
			},
			json: true
		};
	} else {
		options = { 
			method: "GET",
			url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
			qs: { 
				screen_name: username, 
				include_rts: 1, 
				exclude_replies: true, 
				count: `${postsPerCall}`,
				tweet_mode: "extended",
				max_id: maxId
			},
			headers: { 
				Authorization: "Bearer " + process.env.BEARER_TWITTER
			},
			json: true
		};		
	}
	return options;
}

exports.getHashtags = async (username, postId = 0, postsPerCall) => {
	setOptions(username);
	let entries = [];
	let lastID;
	let totalPosts = 0;

	return rp(setOptions(username, postId, postsPerCall))
		.then(function (resp) {
			totalPosts = resp[0].user.statuses_count;
			for (let index = 0; index < resp.length; index++) {
				lastID = resp[index].id;

				try{
					if(resp[index].full_text.match(/RT \S+/)){
						entries.push(resp[index].retweeted_status.full_text);
					} else {
						entries.push(resp[index].full_text);
					}
				} catch(error) {
					//
				}
			}
			return {entries: entries, lastID: lastID, totalPosts: totalPosts};
		})
		.catch(function (error) {
			console.log(error);
		})
	;
};

exports.postCleanup = async (textList, username) => {
	let cleanedList = [];
	textList.forEach(element => {
		let post = element;
		try {
			post = post.toLowerCase();
			var expStr = discluded.join("|");
			post = post.replace(/https?:\S+/g, "");		// remove urls
			post = post.replace(new RegExp(" \\b(" + expStr + ")\\b ", "gi"), " ").replace(/\s{2,}/g, " ");
			post = post.replace(/\n/g, " ");			// remove breaklines
			post = post.replace(username, "");			// remove username
			post = post.replace(/[^a-z+ ]/g, " ");		// remove non[a-z] chars
			post = post.replace(/(^| ).( |$)/g, " ");	// remove single letters
	
			post = post.replace(/\s+/g, " ");			// replace multiple blank spaces with one
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