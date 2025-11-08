const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('🌐 Loading deployed site...');
  await page.goto('https://gma3561.github.io/vida/news.html');

  await page.waitForTimeout(2000);

  // Check CSS
  const imageHeight = await page.evaluate(() => {
    const imageEl = document.querySelector('.news-card__image');
    if (!imageEl) return 'NOT FOUND';
    const styles = window.getComputedStyle(imageEl);
    return styles.height;
  });

  console.log('📏 News card image height:', imageHeight);

  // Take screenshot
  await page.screenshot({ path: 'deployed-news.png', fullPage: true });
  console.log('📸 Screenshot saved: deployed-news.png');

  console.log('\n✅ Deployed site loaded');
  console.log('Press Ctrl+C when done');

  // Keep browser open
  await page.waitForTimeout(300000);
})();
