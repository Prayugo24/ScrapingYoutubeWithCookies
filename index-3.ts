import chrome from 'chrome-cookies-secure';
import puppeteer from 'puppeteer';
import * as fs from 'fs';

// Ini code untuk mendownload cookies sekaligus masuk ke web browser

const url = 'https://studio.youtube.com/channel/UCTtgoI0NaOg7d8vwLThZNCQ/videos/short?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D';

const getCookies = (callback: (cookies: any[]) => void) => {
    chrome.getCookies(url, 'puppeteer', function(err, cookies) {
        if (err) {
            console.log(err, 'error');
            return;
        }
        // console.log(cookies, 'cookies');
        fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
        callback(cookies);
    }, 'Default'); // e.g. 'Profile 2'
};

getCookies(async (cookies) => {
    const formattedCookies = cookies.map(cookie => ({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires,
        httpOnly: cookie.HttpOnly,
        secure: cookie.Secure, 

    }));
    

    const browser = await puppeteer.launch({ 
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Path untuk Google Chrome di macOS
    });
    const page = await browser.newPage();

    await page.setCookie(...formattedCookies);
    await page.goto(url);
    console.log("hello")
    // await page.waitForTimeout(2000);
    // browser.close();
});

