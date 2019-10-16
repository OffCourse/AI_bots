const puppeteer = require('puppeteer');

async function scrollToBottom( page, itemTargetCount = 0, scrollDelay = 0) {
    var number_of_scrolls_needed = itemTargetCount;
    try {
        let previousHeight;
        for (i = 0; i < number_of_scrolls_needed; i++) {
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await page.waitFor(scrollDelay);    
            console.log("scrolled", i, "times.")        
        }
    } catch(e) { 
        console.log(e)
    }
}

async function login(page) {
    await page.goto('https://www.instagram.com/accounts/login/', {
        waitUntil: 'networkidle0' 
    });
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
        headless: false,
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });
    
    await login(page);

    await page.goto('https://www.instagram.com/danielmadison/');
    spanElement = await page.$$(".g47SY ");
    x = spanElement.pop();
    x = spanElement.pop();
    spanElement = spanElement.pop();
    spanElement = await spanElement.getProperty('innerText');
    spanElement = await spanElement.jsonValue();

    // Scroll and extract items from the page.
    await scrollToBottom(page);
    console.log("this was a triumph")
    item = await page.$$('.v1Nh3.kIKUG._bz0w');
    
    item2 = item.pop();
    item2 = await item2.$$('.a');
    
    console.log(item2)

    // // Close the browser.
    // await browser.close();
}
