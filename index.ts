
import * as fs from 'fs';
import puppeteer from 'puppeteer';


// Ini code untuk meload cookies yang sudah di download, setelah itu melakukan scraping dan pencet tombol


(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Path untuk Google Chrome di macOS
    // executablePath: '/Applications/Safari.app/Contents/MacOS/Safari',
    defaultViewport: null,
    // defaultViewport: {
    //     width: 768, // Lebar tablet 
    //     height: 1024, // Tinggi tablet
    //     isMobile: true,
    //     hasTouch: true,
    //   },
    args: ["--start-maximized"],
  });
  const cookiesString = fs.readFileSync('cookies.json', 'utf8');
  const cookies = JSON.parse(cookiesString) 
  const page = await browser.newPage();
//   await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136");
  const formattedCookies = cookies.map((cookie:any) => ({
    name: cookie.name,
    value: cookie.value,
    domain: cookie.domain,
    path: cookie.path,
    expires: cookie.expires,
    httpOnly: cookie.HttpOnly,
    secure: cookie.Secure, 

}));
console.log(formattedCookies)
await page.setCookie(...formattedCookies)

await page.goto("https://studio.youtube.com/channel/UCTtgoI0NaOg7d8vwLThZNCQ/videos/short?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D", {
    waitUntil: "networkidle2",
});


await new Promise(resolve => setTimeout(resolve, 2000));
console.log("hallo")
await page.waitForSelector('#entity-name'); // Tunggu sampai elemen muncul

const element = await page.$('#entity-name');
const text = await page.evaluate((element:any) => element.textContent, element);
console.log(text.trim()); // Output: Test Riddle Rendezvous

await page.waitForSelector('ytcp-button#create-icon'); // Tunggu sampai elemen muncul
await page.click('ytcp-button#create-icon');
await page.waitForSelector('tp-yt-paper-item#text-item-0'); // Tunggu sampai elemen muncul
await page.click('tp-yt-paper-item#text-item-0');
// await page.waitForSelector('ytcp-button#select-files-button'); // Tunggu sampai elemen muncul
// await page.click('ytcp-button#select-files-button');

// Memilih file video
const filePath = '/Users/PRAYUGOSETIOKO/Kerja/Artifact-Inteligent/youtube-bot/asset/video/short-video/Wordplay-Riddles/Wordplay-Riddles.mp4';
const inputUploadHandle = await page.$('input[type=file]');
if (inputUploadHandle) {
    inputUploadHandle.uploadFile(filePath);
  } else {
    console.error('Elemen input tidak ditemukan');
  }
  
//   const searchFormEmail = await page.waitForSelector(`.whsOnd`, {
//     visible: true,
//   });
//   searchFormEmail?.type('nimeindo24@gmail.com');
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   const clcikButton = await page.waitForSelector('.VfPpkd-LgbsSe') 
//   if (clcikButton) {
//     await clcikButton.click();
//   } 
   


//   // Submit the form by calling its
//   const clcikButton = await page.waitForSelector('.pure-button')
//   if (clcikButton) {
//     await clcikButton.click();
//   } 

  

//   await page.waitForSelector(`#search-form`, {
//     visible: true,
//   });

//   const search = await page.waitForSelector(`#search-form`);
//   if (search) {
//     await search.click();
//   }
})();