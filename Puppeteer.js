const fs = require('fs');
const puppeteer = require('puppeteer');

/**
 * This function is injected into the page and used to scrape items from it.
 */
function extractItems() {
  const extractedElements = document.querySelectorAll('#boxes > div.box');
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerText);
  }
  return items;
}

/**
 * Scrolls and extracts content from a page.
 * @param {object} page - A loaded Puppeteer Page instance.
 * @param {function} extractItems - Item extraction function that is injected into the page.
 * @param {number} itemTargetConut - The target number of items to extract before stopping.
 * @param {number} scrollDelay - The time (in milliseconds) to wait between scrolls.
 */
async function scrapeInfiniteScrollItems(page, extractItems, itemTargetCount, scrollDelay = 1000) {
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
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });
  await page.goto('https://intoli.com/blog/scrape-infinite-scroll/demo.html');
  const items = await scrapeInfiniteScrollItems(page, extractItems, 500);
  fs.writeFileSync('./items.txt', items.join('\n') + '\n');
  await browser.close();
  console.log("see, this is the problem.... but why")
}