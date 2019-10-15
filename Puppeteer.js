const fs = require('fs');
const puppeteer = require('puppeteer');


function extractItems() {
    const extractedElements = document.querySelectorAll('#boxes > div.box');
    const items = [];
    for (let element of extractedElements) {
      items.push(element.innerText);
      console.log(element.innerText)
    }
    return items;
  }
  
  async function scrapeInfiniteScrollItems(
    page,
    extractItems,
    itemTargetCount,
    scrollDelay = 1000,
  ) {
    let items = [];
    try {
      let previousHeight;
      while (items.length < itemTargetCount) {
        items = await page.evaluate(extractItems);
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitFor(scrollDelay);
      }
    } catch(e) { }
    return items;
  }
  
 exports.follow = async () => {
    // Set up browser and page.
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });
  
    // Navigate to the demo page.
    await page.goto('https://intoli.com/blog/scrape-infinite-scroll/demo.html');
  
    // Scroll and extract items from the page.
    const items = await scrapeInfiniteScrollItems(page, extractItems, 100);
  
    // Save extracted items to a file.
    fs.writeFileSync('./items.txt', items.join('\n') + '\n');
  
    // Close the browser.
    await browser.close();
  }

// /**
//  * This function is injected into the page and used to scrape items from it.
//  */
// async function extractItems(page) {
//     console.log("begin")
//     await page.evaluate(() => {
//         const extractedElements = document.querySelectorAll('.v1Nh3 kIKUG  _bz0w a');
//     })
//     const items = [];
//     for (let element of extractedElements) {
//         console.log(element.innerText)
//         items.push(element.innerText);
//     }
//     return items;
// }

// /**
//  * Scrolls and extracts content from a page.
//  * @param {object} page - A loaded Puppeteer Page instance.
//  * @param {function} extractItems - Item extraction function that is injected into the page.
//  * @param {number} itemTargetConut - The target number of items to extract before stopping.
//  * @param {number} scrollDelay - The time (in milliseconds) to wait between scrolls.
//  */
// async function scrapeInfiniteScrollItems(page, extractItems, itemTargetCount, scrollDelay = 1000) {
//     let items = [];
//     try {
//         let previousHeight;
//         while (items.length < itemTargetCount) {
//             console.log("start scraping", items.length + " " + itemTargetCount)
//             items = await page.evaluate(extractItems);
//             previousHeight = await page.evaluate('document.body.scrollHeight');
//             await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
//             await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
//             await page.waitFor(scrollDelay);
//         }
//     } catch(e) {
//         console.log(e)
//     }
//     return items;
// }

// exports.follow = async () => {
//     const browser = await puppeteer.launch({
//         headless: true,
//     });
//     const page = await browser.newPage();
//     page.setViewport({ width: 1280, height: 926 });
//     await page.goto('https://www.instagram.com/koninklijkhuis/');
//     const items = await scrapeInfiniteScrollItems(page, extractItems(page), 5);
//     fs.writeFileSync('./items.txt', items.join('\n') + '\n');
//     await browser.close();
// }