const Post = require("./Post");

var foodTrucks;
var posts;

// getPostByTag("Space");
// getAllPosts();
// createPost(5, ["Space", "Spaceship"], "No oxygen life");

Post.createPerson(2, "autobiografie", 1, -1, false, parseArray(["#hashtag", "#poesjes"]), parseArray(""))

async function getPostByTag(tag) {
    foodTrucks = await Post.getPostByTag(tag);
    console.log(foodTrucks.data.data.postsByTag.data);
}

async function getAllPosts() {
    posts = await Post.getAllData();
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
