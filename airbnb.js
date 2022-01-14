const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.airbnb.co.uk/';

let browser = null;
let page = null;

const airbnb = {
    initialize: async () => {
        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();
        page.setViewport({
            width: 1400,
            height: 1000
        });

        await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    },

    search: async (destination) => {
        // Navigate to page
        let url = await page.url();
        if (url !== BASE_URL) {
            await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
        }

        // Accept cookies
        await page.waitForSelector('[data-testid="main-cookies-banner-container"]');
        await page.click('[data-testid="main-cookies-banner-container"] [data-testid="accept-btn"]');

        // Input search query
        await page.waitForSelector('#bigsearch-query-location-input');
        await page.type('#bigsearch-query-location-input', destination, { delay: 200 });

        // Select first suggestion
        await page.waitForSelector('#bigsearch-query-location-listbox > div[role="option"]');
        await page.click('#bigsearch-query-location-listbox > div[role="option"]');

        // Select flexible option
        await page.waitForSelector('button[aria-controls="panel--tabs--1"]');
        await page.click('button[aria-controls="panel--tabs--1"]');

        // Select 1 adult
        await page.click('[data-testid="structured-search-input-field-guests-button"]');
        await page.waitForSelector('[data-testid="stepper-adults-increase-button"]');
        await page.click('[data-testid="stepper-adults-increase-button"]');

        // Click search button
        await page.click('._1mzhry13');
    }
}

module.exports = airbnb;