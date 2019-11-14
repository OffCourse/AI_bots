require("dotenv").config();
const Logic = require("./Logic");

exports.createUser = async (username) => {
	const user = await Logic.scrapeInstagramUser(username);
	var posts= [];
	var keywords = [];
	var comments = [];

	const payload = 
        `mutation createUser {
            createUser(data: { `+
                "username: \"" + user.username + "\", " +
                "user_id: " + user.id + ", "+
                "posts: " + JSON.stringify(posts) + ", "+
                "biography: \"" + user.biography.replace(/\n/g, " ") + "\", "+
                "n_follows: " + user.edge_follow["count"] + ", "+
                "n_followers: " + user.edge_followed_by["count"] + ", "+
                "is_company: " + user.is_business_account + ", "+
                "keywords: " + JSON.stringify(keywords) + ", "+
                "comments: " + JSON.stringify(comments) +
            `}) {
                user_id
            }
        }`;
	return await Logic.executeQuery(payload);
};

exports.getAllUsers = async () => {
	const payload = 
        `query FindAllUsers {
            allUsers {
                data {
                    username
                    user_id
                    biography
                    n_follows
                    n_followers
                    is_company
                }
            }
        }`;
	return await Logic.executeQuery(payload);
};
