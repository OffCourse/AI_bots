function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function onChange() {
	const text = document.getElementById("textarea").value;
	var start = "";
	if (text.split(" ").length > 5) {
		const amountOfTags = document.getElementById("amountOfTags").value;
		const hashtags = ["tag0", "tag1", "tag2"];
		for (var i = 0; i < amountOfTags; i++) {
			const index = getRandomInt(hashtags.length);
			start += " #" + hashtags[index];
		}
	}

	document.getElementById("result").innerHTML = text + start;
}