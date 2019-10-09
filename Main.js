const Post = require("./Post");

var foodTrucks;
var posts;
var people;

// getPostByTag("Space");
// getAllPosts();
// createPost(5, ["Space", "Spaceship"], "No oxygen life");

createUser(1, "boring bio", 0, 0, false, ["tag"], ["comment"]);
getAllUsers();


async function createUser(id, biografie, aantalFollows, aantalFollowers, bedrijf, tags, comments) {
    await Post.createUser(id, biografie, aantalFollows, aantalFollowers, bedrijf, parseArray(tags), parseArray(comments));
}

async function getAllUsers() {
    allUsers = await Post.getAllUsers();
    allUsers = people.data.data.allUsers.data;
    console.log(allUsers);
}

async function getPostByTag(tag) {
    foodTrucks = await Post.getPostByTag(tag);
    console.log(foodTrucks.data.data.postsByTag.data);
}

async function getAllPosts() {
    posts = await Post.getAllPosts();
    console.log(posts.data.data.allPosts.data);
}

async function createPost(id, tags, text) {
    await Post.createPost(id, parseArray(tags), text);
}

function parseArray(tags) {
    var str = "";
    for (var i = 0; i < tags.length; i++) {
        if (i == tags.length - 1) {
            str += "\"" + tags[i] + "\""
        } else {
            str += "\"" + tags[i] + "\","
        }
    }
    console.log("tags: " + str);
    return str;
}
