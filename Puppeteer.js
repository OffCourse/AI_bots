const puppeteer = require('puppeteer');

async function scrollToBottom(page, n_posts, scrollDelay = 1000) {
    n_posts = n_posts.replace(",", "");
    returnArray = [];
    do {
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitFor(scrollDelay);
        returnArray = await scapeAndAdd(page, returnArray);
    } while (returnArray.length < n_posts);
    return returnArray;
}

async function scapeAndAdd(page, urlList){
    results = await page.$$eval('.v1Nh3.kIKUG._bz0w a', links => links.map(link => link.href));
    for(i in results) {
        if(!urlList.includes(results[i])) {
            urlList.push(results[i]);
        }
    }
    return urlList;
}

async function login(page) {
    await page.goto('https://www.instagram.com/accounts/login/', {
        waitUntil: 'networkidle0' 
    });
    await page.waitForSelector('._2hvTZ.pexuQ.zyHYP');
    await page.type('._2hvTZ.pexuQ.zyHYP', "c4453830");
    await page.keyboard.press("Tab");
    await page.keyboard.type('werty2468!')
    await Promise.all([
        page.click('.Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB'),
        page.waitForNavigation({
            waitUntil: 'networkidle0'
        }),
    ]);
}

exports.follow = async(username, password) => {
    // Set up browser and page.
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });
    
    await login(page);

    await page.goto('https://www.instagram.com/worstigaccount/');
    spanElement = await page.$$(".g47SY ");
    x = spanElement.pop();
    x = spanElement.pop();
    spanElement = spanElement.pop();
    spanElement = await spanElement.getProperty('innerText');
    spanElement = await spanElement.jsonValue();
    urlArray = await scrollToBottom(page, spanElement);

    console.log("ready to die now");
    console.log("please kill me")

    // Close the browser.
    await page.close();
    //await browser.close();
}
