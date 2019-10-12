const Axios = require("axios")
const cheerio = require(`cheerio`)

const parseResponse = response => {
  const $ = cheerio.load(response.data)
  const scripts = $(`html > body > script`)
  let id = 0
  if (scripts.get(0).attribs.type === `application/ld+json`) {
    id = 1
  }
  const jsonData = $(`html > body > script`)
    .get(id)
    .children[0].data.replace(/window\._sharedData\s?=\s?{/, `{`)
    .replace(/;$/g, ``)
  return JSON.parse(jsonData).entry_data
}

exports.scrapeInstagramUser = async (username) => {
  try {
    const response = await Axios({
      url: `https://www.instagram.com/`+username,
      methods: 'post'
    })
    const data = parseResponse(response);
    const { user } = data.ProfilePage[0].graphql
    return user;
  } catch (error) {
    console.log(error)
  }
}

exports.executeQuery = async(payload) => {
  try {
    const response = await Axios({
      method: 'post',
      url: process.env.DB_URL,
      headers: { "Authorization": "Bearer " + process.env.BEARER_TOKEN },
      data: {
        query: 
         payload
        }
    })
    return response;
  } catch (error) {
    console.log(error);
  }
}