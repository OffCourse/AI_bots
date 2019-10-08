const Axios  = require("axios");

var config = {
    headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" }
}

Axios({
    url: 'https://graphql.fauna.com/graphql',
    method: 'post',
    headers: { "Authorization": "Bearer " + "fnADaLYJAlACC3T4--QFqHBrS-L3tb5MFP0_U_q9" },
    data: {
        query: `       
            mutation createPosts {
            createPosts(data: { id: 3, tags: ["HUH"], text: "#HUH" }) { 
                id 
                tags 
                text
                } 
            }
  
        `
    }
}).then((result) => {
    console.log(result.data)
});