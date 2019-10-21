const Post = require("./Post");
const User = require("./User");

var username, password;

class InstaCasette {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async recommendUser(users, tags) {
        recommendations = [];
    
        return recommendations;
    }

    async recommendTags(users, tags) {
        recommendations = [];
    
        return recommendations;
    }

    async getUser() {
        return (this.username);
    }

    async getPassword() {
        return (this.password);
    }

    async getUrlList() {
        return 
    }
};

module.exports = InstaCasette;

async function createUser(username) {
    dataResponse = await User.createUser(username);
    if(dataResponse.status == "200") {
        console.log(dataResponse.data.errors);
        console.log("user succesfully created");
    }
}

async function getAllUsers() {
    dataResponse = await User.getAllUsers();
    userArray = dataResponse.data.data.allUsers.data;
    console.log(userArray);
}

async function getPostByTag(tag) {

}

async function createPost(id, tags, text) {

}

async function getAllPosts() {
    
}

async function scrapePosts(username, depth) {
    
}
