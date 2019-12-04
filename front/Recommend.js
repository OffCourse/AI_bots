function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

async function onChange() {
	// const axios = require("axios");
	let buttonGroup = document.querySelector(".btn-group");

	let child = buttonGroup.lastElementChild;
	while (child) {
		buttonGroup.removeChild(child);
		child = buttonGroup.lastElementChild;
	}


	const text = document.getElementById("textarea").value;
	var start = "";
	var hashtags = [];
	let hashtagCount = 0;
	
	// if (text.split(" ").length > 5) {
	const amountOfTags = document.getElementById("amountOfTags").value;

	const tweetJson = JSON.stringify({ "tweet": text });
	//todo make api port dynamic
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
		hashtags = JSON.parse(json);
			
		for (let index = 0; index < amountOfTags; index++) {
			let button = document.createElement("BUTTON");
			button.innerHTML = "#" + hashtags[index]; 
			button.onclick = function () {
				hashtagCount += 1;		
				button.innerHTML = "#" + hashtags[+hashtagCount + +amountOfTags];
			};
			buttonGroup.appendChild(button);
		}
	});	
	//}
	document.getElementById("result").innerHTML = text + start;
}