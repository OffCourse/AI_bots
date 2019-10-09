const Axios = require("axios");

exports.createPost = async (id, tags, text) => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query: 
                `mutation createPosts {
                    createPosts(data: { id: ` + id + `, tags: [` + tags + `], text: \"` + text + `\" }) {
                    id
                    tags
                    text
                    }
                }`
        }
    }).then((result) => {
        console.log(result.data);
    }).catch((error => {
        console.log(error);
    }));
}

exports.createUser = async (id, biografie, aantalFollows, aantalFollowers, bedrijf, tags, comments) => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query: 
                `mutation createUser {
                    createUser(data: { `+
                        `id: ` + id + `, `+
                        `biografie: "` + biografie + `", `+
                        `aantalFollows: ` + aantalFollows + `, `+
                        `aantalFollowers: ` + aantalFollowers + `, `+
                        `bedrijf: ` + bedrijf + `, `+
                        `tags: [` + tags + `], `+
                        `comments: [` + comments + `] `+
                    `}) {
                        id
                        biografie
                        aantalFollows
                        aantalFollowers
                        bedrijf
                        tags
                        comments
                    }
                }`
        }
    }).then((result) => {
        console.log(result.data);
    }).catch((error => {
        console.log(error);
    }));
}

exports.getAllPosts = async () => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query: 
                `query FindAllPosts {
                    allPosts {
                        data {
                            id
                            tags
                            text
                        }
                    }
                }`
        }
    })
}

exports.getAllUsers = async () => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query:     
                `query FindAllUsers{
                    allUsers {
                        data {
                            id
                            biografie
                            aantalFollows
                            aantalFollowers
                            bedrijf
                            tags
                            comments
                        }
                    }
                }`
        }
    })
}

exports.getPostByTag = async (tag) => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query:     
                `query FindPostsByTag {
                    postsByTag(tags: \"`+ tag + `\") {
                        data {
                            id
                            text
                    }
                }
            }`
        }
    })
}