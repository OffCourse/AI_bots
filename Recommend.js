var requirejs = require("requirejs");

requirejs.config({
	//Pass the top-level main.js/index.js require
	//function to requirejs so that node modules
	//are loaded relative to the top-level JS file.
	nodeRequire: require
});


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function onChange() {
	const text = document.getElementById("textarea").value;
	var start = "";
	if (text.split(" ").length > 5) {
		const amountOfTags = document.getElementById("amountOfTags").value;
		const hashtags = requirejs("./hashtags.json");
		for (var i = 0; i < amountOfTags; i++) {
			const index = getRandomInt(hashtags.length);
			start += " #" + hashtags[index];
		}
	}

	document.getElementById("result").innerHTML = text + start;
}