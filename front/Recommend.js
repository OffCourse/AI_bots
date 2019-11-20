
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

async function onChange() {
	// const axios = require("axios");

	const text = document.getElementById("textarea").value;
	var start = "";
	var hashtags = [];
	if (text.split(" ").length > 5) {
		const amountOfTags = document.getElementById("amountOfTags").value;
		// console.log("Spaghetti");

		const tweetJson = JSON.stringify({"tweet": text });
		console.log(tweetJson);
		const url = "http://localhost:4000/api/post";
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			headers: {
				"Content-Type": "application/json"
				// 'Content-Type': 'application/x-www-form-urlencoded',
			  },
			body: tweetJson
		  });

		  response.json().then(json => {
			  console.log(json);
		  });

		  
		for (let index = 0; index < amountOfTags; index++) {
			let button = document.createElement("BUTTON");
			button.innerHTML = result[index];
			button.onclick = function () {
				button.innerHTML = "#"+ hashtags[getRandomInt(hashtags.length)];
			};
			buttonGroup.appendChild(button);
		}
	}

	document.getElementById("result").innerHTML = text + start;
}