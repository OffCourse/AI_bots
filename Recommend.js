function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function onChange() {
	const text = document.getElementById("textarea").value;
	var start = "";
	if (text.split(" ").length > 5) {
		const amountOfTags = document.getElementById("amountOfTags").value;
		const hashtags = ["#Blessed", "#Satan", "#BeachLife", "#DyingRightNow", "#666", "#NotTheDevil", "#Idk", "#GoingHome", "#BoycotScott"];
		for (var i = 0; i < amountOfTags; i++) {
			const index = getRandomInt(hashtags.length);
			start += " " + hashtags[index];
		}
	}

	document.getElementById("result").innerHTML = text + start;
}