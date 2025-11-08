const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('🌐 Checking footer and language selector...');

  const pages = [
    'index.html',
    'access.html',
    'facilities.html',
    'news.html',
    'rooms.html',
    'reservation.html',
    'faq.html'
  ];

  for (const pageName of pages) {
    await page.goto(`http://localhost:8081/${pageName}`);

    const footerVisible = await page.isVisible('.footer');
    const langsVisible = await page.isVisible('.langs');

    console.log(`\n📄 ${pageName}:`);
    console.log(`  Footer visible: ${footerVisible ? '✅' : '❌'}`);
    console.log(`  EN/PT visible: ${langsVisible ? '✅' : '❌'}`);
  }

  await page.goto('http://localhost:8081/index.html');
  console.log('\n✅ Check complete. Browser left on index.html');
  console.log('Press Ctrl+C when done');

  await page.waitForTimeout(300000);
})();
