const Logic = require("./Logic");

class InstaCasette {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	async recommendUser(users, tags) {
		var recommendations = [];

		return recommendations;
	}

	async recommendTags(users, tags) {
		var recommendations = [];

		return recommendations;
	}

	async getUser() {
		return (this.username);
	}

	async getPassword() {
		return (this.password);
	}

	async getUrlList(usr) {
		var urlList = await followUser(usr);
		return urlList;
	}

	async classifyUsers(username) {
		let classifiedUsers = [];
		for (let index = 0; index < username.length; index++) {
			classifiedUsers.push(classify(username[index]));			
		}
		return classifiedUsers;
	}
	async getText(usr){
		let lastId; 						// Id of last retrieved post
		let listOfPosts = []; 				// List of retrieved posts
		let postsPerCall = 200; 			// Amount of posts to retrieve per call
		let retrievedPosts = 0; 			// Total amount of retrieved posts
		let totalPosts = 0; 				// Total amount of posts a user has posted
		const maxRetrievablePosts = 3200; 	// Amount of retrievable posts, limited by the API
		do {
			let object = await Logic.getHashtags(usr, lastId, postsPerCall);
			lastId = object.lastID; 
			retrievedPosts += postsPerCall;
			totalPosts = object.totalPosts;
			let posts = await Logic.postCleanup(object.entries);
			posts.forEach(post => {
				listOfPosts.push(post);
			});
		} while (retrievedPosts < maxRetrievablePosts && retrievedPosts < totalPosts);
		return listOfPosts;	
	}
}

module.exports = InstaCasette;

async function classify(username) {
	const postData = require(`./user_data/twitter_${username}.json`);

	let cleanedPost = await Logic.postCleanup(postData, username);
	let topWords = await Logic.countWords(cleanedPost, username);
	return topWords;
}
