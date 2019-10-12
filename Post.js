require('dotenv').config()
const Axios = require("axios");

exports.createPost = async (id, tags, text) => {
    try {
        const response = await Axios({
            url: process.env.DB_URL,
            method: 'post',
            headers: { "Authorization": "Bearer " + process.env.BEARER_TOKEN },
            data: {
                query: 
                    `mutation createPosts {
                        createPosts(data: { `+
                        `post_id: ` + post_id + `, ` +
                        `user_id: ` + user_id + `, ` +
                        `created_time: ` + created_time + `, ` +
                        `location: ` + location + `, ` +
                        `people_in_post: ` + people_in_post + `, ` +
                    `}) {
                            post_id
                            user_id
                            created_time
                            location
                            people_in_post
                        }
                    }`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    } 
}

exports.getAllPosts = async () => {
    try {
        const response = await Axios({
            url: process.env.DB_URL,
            method: 'post',
            headers: { "Authorization": "Bearer " + process.env.BEARER_TOKEN },
            data: {
                query: 
                    `query FindAllPosts {
                        allPosts {
                            data {
                                post_id
                                user_id
                                created_time
                                location
                                people_in_post
                            }
                        }
                    }`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}



// method doesn't work after refractoring database
//
//
// exports.getPostByTag = async (tag) => {
//     try {
//         const response = await Axios({
//             url: process.env.DB_URL,
//             method: 'post',
//             headers: { "Authorization": "Bearer " + process.env.BEARER_TOKEN },
//             data: {
//                 query:     
//                     `query FindPostsByTag {
//                         postsByTag(tags: \"`+ tag + `\") {
//                             data {
//                                 id
//                                 text
//                         }
//                     }
//                 }`
//             }
//         })
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     }
// }