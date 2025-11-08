const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  await page.goto('http://localhost:8081/news.html');

  console.log('✅ News page loaded');
  console.log('📸 Check the browser window to see the updated image heights');
  console.log('Press Ctrl+C when done');

  // Keep browser open
  await page.waitForTimeout(300000);
})();
