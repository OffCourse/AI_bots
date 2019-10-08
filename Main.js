const Post = require("./Post");

var foodTrucks;
var posts;

// getPostByTag("Foodtruck");


async function getPostByTag(tag) {
    foodTrucks = await Post.getPostByTag(tag);
    console.log(foodTrucks.data.data.postsByTag.data);
}

async function getAllPosts() {
    posts = await Post.getAllData();
    console.log(posts.data.data.allPosts.data);
}
