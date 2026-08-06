// 登录志愿者平台并保存登录态到 data/state.json
// 用法: node login.js  （打开可见 Edge，微信扫码登录，成功后自动保存并关闭）
const { launchVolunteer, VOLUNTEER_URL, STATE_FILE, sleep } = require('./common');
const fs = require('fs');

(async () => {
  const { browser, context, page } = await launchVolunteer({ headless: false });
  await page.goto(VOLUNTEER_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('请在浏览器中用微信扫码登录 aipoju.com/volunteer ...');
  let loggedIn = false;
  for (let i = 0; i < 60; i++) { // 最多等 5 分钟
    await sleep(5000);
    try {
      // 登录成功判定：看板出现「待评分N / 全部组员N」统计或右上角用户名即已登录。
      // 注意：落地页默认是组员管理表，作业表收起在「待评分N」统计块后，根本没有「查看作业」文字，
      // 所以不能像旧逻辑那样等「查看作业」——否则永远检测不到、超时不存 state。
      const ok = await page.evaluate(() => {
        const t = document.body ? document.body.innerText : '';
        if (/扫码登录|微信扫码/.test(t)) return false;
        return /待评分\d+|全部组员\d+/.test(t) || t.includes('白兰度');
      });
      if (ok) { loggedIn = true; console.log('\n✓ 登录成功'); break; }
    } catch (e) {
      // 页面/浏览器被用户提前关闭
      if (page.isClosed() || browser.isConnected() === false) { console.log('\n✗ 浏览器已关闭，登录中止'); process.exit(0); }
    }
    process.stdout.write('.');
  }
  if (loggedIn) {
    const state = await context.storageState();
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
    console.log('✓ 登录态已保存到', STATE_FILE);
  } else {
    console.log('\n✗ 登录超时，请重试');
  }
  await browser.close();
})().catch(e => { console.error('ERR', e && e.message); process.exit(1); });
