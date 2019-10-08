const Axios = require("axios");

exports.postDB = async (query) => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query: query
        }
    }).then((result) => {
        console.log(result.data)
    });
}

exports.getAllData = async () => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query: `    
                query FindAllPosts {
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

exports.getPostByTag = async (tag) => {
    return await Axios({
        url: 'https://graphql.fauna.com/graphql',
        method: 'post',
        headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
        data: {
            query: `    
                query FindPostsByTag {
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