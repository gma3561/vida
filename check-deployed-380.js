const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('🌐 Loading deployed site with 380px image height...');

  // Clear cache and force reload
  await context.clearCookies();
  await page.goto('https://gma3561.github.io/vida/news.html', {
    waitUntil: 'networkidle'
  });

  await page.waitForTimeout(2000);

  // Check CSS
  const imageHeight = await page.evaluate(() => {
    const imageEl = document.querySelector('.news-card__image');
    if (!imageEl) return 'NOT FOUND';
    const styles = window.getComputedStyle(imageEl);
    return styles.height;
  });

  console.log('📏 News card image height:', imageHeight);

  // Scroll to Latest Highlights section
  await page.evaluate(() => {
    const section = document.querySelector('.news-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  await page.waitForTimeout(1000);

  // Take screenshot
  await page.screenshot({ path: 'deployed-news-380.png', fullPage: true });
  console.log('📸 Screenshot saved: deployed-news-380.png');

  console.log('\n✅ Deployed site loaded with updated image height');
  console.log('🔍 Check the browser to verify the black space is reduced');
  console.log('Press Ctrl+C when done');

  // Keep browser open
  await page.waitForTimeout(300000);
})();
