const Gun = require("gun");
var http = require("http");

var server = http.createServer();
const GunInstance = new Gun({web: server});
const Users = "Users";
const Posts = "Posts";

server.listen(8080, function () {
	console.log("Server listening on http://localhost:8080/gun");
});

exports.createUser = async (username, id, posts, biography, n_follows, n_followers, is_company, keywords, comments) => {
	const users = GunInstance.get(Users);
	users.set(
		GunInstance.get(id).put({
			username: username,
			user_id: id,
			posts: JSON.stringify(posts),
			biography: biography,
			n_follows: n_follows,
			n_followers: n_followers,
			is_company: is_company,
			keywords: JSON.stringify(keywords),
			comments: JSON.stringify(comments)
		})
	);
};

exports.getAllUsers = async () => {
	const users = GunInstance.get(Users);
	users.map().once(function(user){
		console.log(user);
	});
};

exports.createPost = async (id, text, post_date, location, n_responses, n_likes) => {
	const posts = GunInstance.get(Posts);
	posts.set(
		GunInstance.get(id).put({
			post_id: id,
			text: text,
			post_date: post_date,
			location: location,
			amount_of_responses: n_responses,
			amount_of_likes: n_likes            
		})
	);
};

exports.getAllPosts = async () => {
	const posts = GunInstance.get(Posts);
	posts.map().once(function(post){
		console.log(post);
	});
};

exports.getPostByTag = async (tag) => {
	const posts = GunInstance.get(Posts);
	posts.map().once(function(post){
		var tagList = JSON.parse(post.tags);
		if(tagList.includes(tag)){
			console.log(post);
		}
	});
};
