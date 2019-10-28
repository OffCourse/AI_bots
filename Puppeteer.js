const puppeteer = require("puppeteer");

async function scrollToBottom(page, n_posts, scrollDelay = 1000) {
	n_posts = n_posts.replace(",", "");
	var returnArray = [];
	do {
		var previousHeight = await page.evaluate("document.body.scrollHeight");
		try{
			await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
			await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
			await page.waitFor(scrollDelay);
			returnArray = await scrapeUrls(page, returnArray, n_posts);
		} catch (e){
			console.log("an error occured, I shall try again.");
		}
	} while (returnArray.length < n_posts);
	return returnArray;
}

async function scrapeUrls(page, urlList, totalPosts){
	var results = await page.$$eval(".v1Nh3.kIKUG._bz0w a", links => links.map(link => link.href));
	for(var index in results) {
		if(!urlList.includes(results[index])) {
			urlList.push(results[index]);
		}
	}
	console.log("scraped " + urlList.length + " of the " + totalPosts + " posts.");
	return urlList;
}

async function login(page) {
	await page.goto("https://www.instagram.com/accounts/login/", {
		waitUntil: "networkidle0" 
	});
	await page.waitForSelector("._2hvTZ.pexuQ.zyHYP");
	await page.type("._2hvTZ.pexuQ.zyHYP", "c4453830");
	await page.keyboard.press("Tab");
	await page.keyboard.type("werty2468!");
	await Promise.all([
		page.click(".Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB"),
		page.waitForNavigation({
			waitUntil: "networkidle0"
		}),
	]);
}

async function getValue(page, tag, property) {
	var tmp = await page.$(tag);
	tmp = await tmp.getProperty(property);
	return await tmp.jsonValue();
}

async function scrapePost(page, urlArray) {
	for(var index in urlArray) {
		await page.goto(urlArray[index]);
		// try{
		// 	await page.$eval((".glyphsSpriteCircle_add__outline__24__grey_9.u-__7"));
		// 	console.log("great success");
		// } catch (error) {
		// 	console.log();
		// }

		var post = await getValue(page, ".C4VMK", "innerText");

		var responses = await page.$$(".Mr508");

		var postdate = await getValue(page, "._1o9PC.Nzb55", "title");

		try {
			var location = await getValue(page, ".O4GlU", "innerText");
		} catch (error) {
			location = "unknown";
		}

		var likes;
		try{
			likes = await getValue(page, ".Nm9Fw", "innerText");
		} catch (e) {
			likes = await getValue(page, ".vcOH2", "innerText");
		}

		console.log("\nUrl:                  " + urlArray[index]);
		console.log("Post date:            " + postdate);
		console.log("Location:             " + location);
		console.log("Ammount of responses: " + responses.length);
		console.log("Ammount of likes:     " + likes);
		console.log("Post text:\n" + post);
	}
}

exports.follow = async(username) => {
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();
	page.setViewport({ width: 1280, height: 926 });
    
	await login(page);

	await page.goto(`https://www.instagram.com/${username}/`);
	var ammount_of_posts = await getValue(page, ".Y8-fY", "innerText");
	ammount_of_posts = ammount_of_posts.replace(" posts", "");
	var urlArray = await scrollToBottom(page, ammount_of_posts);
	await scrapePost(page, urlArray);

	// Close the browser.
	await browser.close();
};
