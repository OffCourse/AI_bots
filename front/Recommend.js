function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

// async function addUser() {
// 	const text = document.getElementById("usernameTextarea").value;

// 	const username = JSON.stringify({ username: text });
// 	console.log("Checking if " + username + " is a valid username.");
// 	//todo make api port dynamic
// 	const url = "http://localhost:4000/api/addUser";
// 	const response = await fetch(url, {
// 		method: "POST", // *GET, POST, PUT, DELETE, etc.
// 		mode: "cors", // no-cors, *cors, same-origin
// 		headers: {
// 			"Content-Type": "application/json"
// 			// 'Content-Type': 'application/x-www-form-urlencoded',
// 		},
// 		body: username
// 	});
// }

async function onChange(algorithm) {
	// const axios = require("axios");
	// let buttonGroup = document.querySelector(".btn-group");

	// let child = buttonGroup.lastElementChild;
	// while (child) {
	// 	buttonGroup.removeChild(child);
	// 	child = buttonGroup.lastElementChild;
	// }

	const text = document.getElementById("textarea").value;
	var start = "";
	var hashtags = [];
	if (text.split(" ").length > 5) {
		document.getElementById("img"+ algorithm).style.opacity  = 1;
		const amountOfTags = document.getElementById("amountOfTags").value;
		// console.log("Spaghetti");

		const tweetJson = JSON.stringify({ username: "yeehaa", tweet: text });
		console.log(tweetJson);
		//todo make api port dynamic
		console.log(algorithm);
		let url = "http://localhost:4000/api/" + algorithm;
		if (algorithm === "Random") {
			console.log("it's Random");
			return;
		}
		console.log(url);
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
			hashtags = json;
			console.log(hashtags);
			let result = "";
			for (let index = 0; index < amountOfTags; index++) {
				if (algorithm == "knn") {
					result += hashtags[index].key + " ";
				} else result += hashtags[index] + " ";
			}
			document.getElementById("result" + algorithm).innerHTML = result;
			document.getElementById("img"+ algorithm).style.opacity  = 0;
			// for (let index = 0; index < amountOfTags; index++) {
			// 	let button = document.createElement("BUTTON");
			// 	button.innerHTML = hashtags[index].key;
			// 	button.onclick = function() {
			// 		button.innerHTML =
			// 			hashtags[getRandomInt(hashtags.length)].key;
			// 	};
			// 	buttonGroup.appendChild(button);
			// }
		});
	}
	//document.getElementById("result").innerHTML = text + start;
}
