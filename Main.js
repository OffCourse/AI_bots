const Post = require("./Post");
const User = require("./User");
const GunDb = require("./GunDatabase");

// GunDb.createUser("koninklijkhuis");
// GunDb.getAllUsers();
// GunDb.createPost(1, ['tag1'], 'test');
// GunDb.getAllPosts();
// GunDb.getPostByTag('tag1');

async function createUser(username) {
    dataResponse = await User.createUser(username)
    if(dataResponse.status == "200") {
        console.log(dataResponse.data.errors)
        console.log("user succesfully created")
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
