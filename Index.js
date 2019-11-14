init();

async function init() {
	const instaCasette = require("./InstaCasette");

	const insta = new instaCasette(process.env.USERNAME_IG, process.env.PASSWORD_IG);
	
	// let users = ["yeehaa", "meiaWippoo", "simoneZeefuik", "tomoKihara", "wailQasim", "WillPollard", "chrisJulien", "flavia_Dzodan", "huwLemmey", "jakobJakobsen", "lindaStupart"];

	console.log(await insta.getText("yeehaa"));
	
     
	// casette.reccomendUser({ tags=[], users=[] });
	// casette.reccomentTags({ tags=[], users=[] });
}
