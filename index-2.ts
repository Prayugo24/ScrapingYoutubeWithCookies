import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import * as fs from 'fs';
import path from 'path';

// ini belum terlalu kepake, lupa juga fungsinya :v

async function convertCookiesToJson(userDataDir: string) {
  const cookiesFile = path.join(userDataDir, 'Cookies');

  const db = await open({
    filename: cookiesFile,
    driver: sqlite3.Database
  });

  // const cookies = await db.all('SELECT * FROM cookies');
  const cookies = await db.all("SELECT name, encrypted_value, host_key AS domain, path, expires_utc AS expires, is_secure AS secure, is_httponly AS httpOnly, sameSite FROM cookies WHERE host_key LIKE '%youtube.com'");
 
  await db.close();

  // const jsonCookies = cookies.filter(item => item.host_key == '.youtube.com')
  const jsonCokiesNew = cookies.map(item => ({
    'name': item.name,
    'value': item.value,
    'domain': item.host_key,
    'path': item.path,
    'expires': item.expires_utc,
    'httpOnly': item.is_httponly ? true : false,
    'secure': item.is_secure ? true : false,
    // 'session': item.session
  }))
  // console.log(jsonCookies)
  // process.exit()
  // const jsonCookies = cookies.filter(item => item.host_key == '.youtube.com')
  return cookies;
}

// Example usage
const userDataDir = '/Users/prayugosetioko/Library/Application Support/Google/Chrome/Profile 3'; // Ganti dengan username Anda
convertCookiesToJson(userDataDir).then(cookies => {
  fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
  console.log('Cookies converted to JSON and saved to cookies.json');
  process.exit()
}).catch(err => {
  console.error('Failed to convert cookies:', err);
});

