const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('🌐 Checking deployed site footer and language selector...');

  const pages = [
    '',
    'access.html',
    'facilities.html',
    'news.html',
    'rooms.html',
    'reservation.html',
    'faq.html'
  ];

  const baseUrl = 'https://gma3561.github.io/vida/';

  for (const pageName of pages) {
    const url = baseUrl + pageName;
    await page.goto(url, { waitUntil: 'networkidle' });

    const footerVisible = await page.isVisible('.footer');
    const langsVisible = await page.isVisible('.langs');
    const sidebarFooterVisible = await page.isVisible('.sidebar__footer');

    console.log(`\n📄 ${pageName || 'index.html'}:`);
    console.log(`  Main Footer (.footer): ${footerVisible ? '✅' : '❌'}`);
    console.log(`  Sidebar Footer (.sidebar__footer): ${sidebarFooterVisible ? '✅' : '❌'}`);
    console.log(`  EN/PT (.langs): ${langsVisible ? '✅' : '❌'}`);
  }

  await page.goto(baseUrl);
  console.log('\n✅ Check complete. Browser left on home page');
  console.log('Press Ctrl+C when done');

  await page.waitForTimeout(300000);
})();
