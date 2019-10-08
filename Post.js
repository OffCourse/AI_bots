const Axios = require("axios");

var events = require('events');
var emitter = new events.EventEmitter;

function postDB(query) {
    Axios({
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

function getAllData() {
    Axios({
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
    }).then((result) => {

        // console.log(result.data.data.allPosts.data);
        emitter.emit('loaded', result.data.data.allPosts.data)
    });
}

getAllData();

emitter.on('loaded', (data) => {
    console.log(data);
})

//postDB('mutation createPosts {createPosts(data: { id: 4, tags: ["Method"], text: "het is gelukt via een #Method" }) {    id     tags     text    } }')