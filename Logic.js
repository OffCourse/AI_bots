const Axios = require("axios");

exports.executeQuery = async(payload) => {
	try {
		const response = await Axios({
			method: "post",
			url: process.env.DB_URL,
			headers: { "Authorization": "Bearer " + process.env.BEARER_TOKEN },
			data: {
				query: 
                payload
			}
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
