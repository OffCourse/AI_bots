const Gun = require('gun');
const Logic = require("./Logic");

const GunInstance = new Gun();
const Users = 'Users';
const Posts = 'Posts';

exports.createUser = async (username) => {
    const user = await Logic.scrapeInstagramUser(username);
    posts = [];
    keywords = [];
    comments = [];
    
    const users = GunInstance.get(Users);
    users.set(
        GunInstance.get(user.id).put({
                username: user.username,
                user_id: user.id,
                posts: JSON.stringify(posts),
                biography: user.biography,
                n_follows: user.edge_follow["count"],
                n_followers: user.edge_followed_by["count"],
                is_company: user.is_business_account,
                keywords: JSON.stringify(keywords),
                comments: JSON.stringify(comments)
            }
        )
    );
}

exports.getAllUsers = async () => {
    const users = GunInstance.get(Users);
    users.map().once(function(user){
        console.log(user);
    });
}

exports.createPost = async (id, tags, text) => {
    const posts = GunInstance.get(Posts);
    posts.set(
        GunInstance.get(id).put({
                post_id: id,
                //user_id: user_id,
                //created_time: created_time,
                //biography: user.biography,
                //location: location,
                //people_in_post: people_in_post,
                tags: JSON.stringify(tags),
                text: text
            }
        )
    );
}

exports.getAllPosts = async () => {
    const posts = GunInstance.get(Posts);
    posts.map().once(function(post){
        console.log(post);
    });
}

exports.getPostByTag = async (tag) => {
    const posts = GunInstance.get(Posts);
    posts.map().once(function(post){
        tagList = JSON.parse(post.tags);
        if(tagList.includes(tag)){
            console.log(post);
        }
    });
}