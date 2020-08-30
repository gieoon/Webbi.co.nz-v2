const puppeteer = require('puppeteer');

const URL = 
// "https://google.com";
// "https://docs.google.com/spreadsheets/d/1OaZy1u08OxvcJJe_hqTmVhbUzAhO0u8pAtclAilkO6U/edit#gid=193262248";
"https://docs.google.com/spreadsheets/d/1OaZy1u08OxvcJJe_hqTmVhbUzAhO0u8pAtclAilkO6U/";

(async () => {
    const browser = await puppeteer.launch({
        headless: false//true
    });
    const [page] = await browser.pages();

    const results = []; // collects all results

    let paused = false;
    let pausedRequests = [];

    const nextRequest = () => { // continue the next request or "unpause"
        if (pausedRequests.length === 0) {
            paused = false;
        } else {
            // continue first request in "queue"
            (pausedRequests.shift())(); // calls the request.continue function
        }
    };

    await page.setRequestInterception(true);
    page.on('request', request => {
        if(request.resourceType === 'image') request.abort();
        else request.continue();

        // if (paused) {
        //     pausedRequests.push(() => request.continue());
        // } else {
        //     paused = true; // pause, as we are processing a request now
        //     request.continue();
        // }
    });

    page.on('requestfinished', async (request) => {
        const response = await request.response();

        const responseHeaders = response.headers();
        let responseBody;
        if (request.redirectChain().length === 0) {
            // body can only be access for non-redirect responses
            // responseBody = await response.buffer();
        }

        const information = {
            url: request.url(),
            requestHeaders: request.headers(),
            requestPostData: request.postData(),
            responseHeaders: responseHeaders,
            responseSize: responseHeaders['content-length'],
            responseBody,
        };
        if(request.url().includes('lh3.googleusercontent.com') ||
            request.url().includes('lh4.googleusercontent.com') ||
            request.url().includes('lh5.googleusercontent.com') ||
            request.url().includes('lh6.googleusercontent.com')
        ) {
        // if(information.url.includes('googleusercontent.com')){
            console.log(information.url);
            results.push(information.url);
        }

        nextRequest(); // continue with next request
    });
    page.on('requestfailed', (request) => {
        // handle failed request
        nextRequest();
    });

    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log("done");

    await browser.close();
})();