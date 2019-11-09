init();
async function init() {
	const instaCasette = require("./InstaCasette");

	const insta = new instaCasette(process.env.USERNAME_IG, process.env.PASSWORD_IG);
	// let users = ["yeehaa", "meiaWippoo", "simoneZeefuik", "tomoKihara", "wailQasim", "WillPollard", "chrisJulien", "flavia_Dzodan", "huwLemmey", "jakobJakobsen", "lindaStupart"];
	// let promiseArray = await insta.classifyUsers(users);
	// const resolvedArray = await Promise.all(promiseArray);
	// console.log(resolvedArray);
	console.log(await insta.getText("yeehaa"));
    
    
	//insta.getUrlList("chrisjulien").then().catch(error => console.log(error));

	//insta.getUser().then(data => console.log(data)).catch(error => console.log(error));

	// casette.reccomendUser({ tags=[], users=[] });
	// casette.reccomentTags({ tags=[], users=[] });
}