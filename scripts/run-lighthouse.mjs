import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const url = process.env.LH_URL ?? 'http://localhost:4173';
const config = {
  extends: 'lighthouse:default',
};
const flags = {
  logLevel: 'info',
  output: 'json',
  onlyCategories: ['performance', 'accessibility'],
};

(async () => {
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const result = await lighthouse(url, { ...flags, port: chrome.port }, config);
  const { categories } = result.lhr;

  const perf = categories.performance.score * 100;
  const a11y = categories.accessibility.score * 100;

  console.log(`Performance: ${perf}`);
  console.log(`Accessibility: ${a11y}`);

  if (perf < 90 || a11y < 90) {
    console.error('Lighthouse scores below threshold');
    process.exit(1);
  }

  await chrome.kill();
})();
