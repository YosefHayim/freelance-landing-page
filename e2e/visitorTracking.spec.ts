import { expect, type Page, test } from '@playwright/test';
import { introText } from '../src/features/intro/intro.text';
import type { Language } from '../src/features/language/language';
import { languageText } from '../src/features/language/language.text';
import { collectPixelCalls } from './collectPixelCalls';
import { letAppStart } from './letAppStart';
import { letPageSettle } from './letPageSettle';
import { metaPixelLogPrefix, tikTokPixelLogPrefix, visitSite } from './openSite';

const clockStart = new Date('2026-01-01T09:00:00');
const visitStart = new Date('2026-01-01T10:00:00');

const callsNamed = (pixelCalls: unknown[][], eventName: string) =>
  pixelCalls.filter((pixelCall) => pixelCall[1] === eventName);

const detailsNamed = (pixelCalls: unknown[][], eventName: string) => {
  const namedCalls = callsNamed(pixelCalls, eventName);
  return namedCalls.map((pixelCall) => pixelCall[2]);
};

const letNextRenderHappen = (page: Page) =>
  page.evaluate(
    () =>
      new Promise<void>((pageRendered) => {
        const nextRender = new IntersectionObserver(() => {
          nextRender.disconnect();
          pageRendered();
        });
        nextRender.observe(document.documentElement);
      }),
  );

const openSiteWithPixel = async (page: Page, language: Language) => {
  const pixelCalls = collectPixelCalls(page, metaPixelLogPrefix);
  await visitSite(page, language);
  await letAppStart(page);
  await letPageSettle(page);
  await page.keyboard.press('Shift');
  await letNextRenderHappen(page);
  await expect.poll(() => pixelCalls).toContainEqual(['track', 'PageView']);
  return pixelCalls;
};

const scrollToEdge = async (page: Page, edge: 'top' | 'bottom') => {
  await page.evaluate((isBottom) => {
    const top = Number(isBottom) * document.documentElement.scrollHeight;
    window.scrollTo(0, top);
  }, edge === 'bottom');
  await letNextRenderHappen(page);
};

const introCallLink = (page: Page, language: Language) =>
  page.locator('#intro').getByRole('link', { name: introText[language].callLabel });

const keepClicksOnPage = (page: Page) =>
  page.evaluate(() => {
    for (const eventType of ['click', 'auxclick', 'contextmenu']) {
      document.addEventListener(eventType, (event) => event.preventDefault(), { capture: true });
    }
  });

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(visitStart);
});

test('the pixel starts with the page view', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  const firstCalls = pixelCalls.slice(0, 2);
  expect(firstCalls).toEqual([
    ['init', '4662982497316102'],
    ['track', 'PageView'],
  ]);
});

test('the TikTok pixel starts with the page view', async ({ page }) => {
  const tikTokCalls = collectPixelCalls(page, tikTokPixelLogPrefix);
  await openSiteWithPixel(page, 'en');
  await expect.poll(() => tikTokCalls.slice(0, 1)).toEqual([['page']]);
});

test('a WhatsApp click is a contact and other clicks name their button', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'he');
  await keepClicksOnPage(page);
  await introCallLink(page, 'he').click();
  await page.getByRole('button', { name: introText.he.workTypes.app.label, exact: true }).click();
  await page.locator('.intro-summary').click();
  await expect
    .poll(() => pixelCalls)
    .toContainEqual([
      'track',
      'Contact',
      { target: 'intro_call', section: 'intro', language: 'he' },
    ]);
  expect(pixelCalls).toContainEqual([
    'trackCustom',
    'WhatsAppClick',
    { target: 'intro_call', section: 'intro', language: 'he' },
  ]);
  expect(pixelCalls).toContainEqual([
    'trackCustom',
    'Click',
    { target: 'work_type_app', section: 'intro', language: 'he' },
  ]);
  expect(pixelCalls).toContainEqual([
    'trackCustom',
    'Click',
    { target: 'none', section: 'intro', language: 'he' },
  ]);
  expect(callsNamed(pixelCalls, 'Contact')).toHaveLength(1);
  expect(callsNamed(pixelCalls, 'WhatsAppClick')).toHaveLength(1);
  expect(callsNamed(pixelCalls, 'Click')).toHaveLength(2);
});

test('every WhatsApp button and the top bar report under their own names', async ({ page }) => {
  const tikTokCalls = collectPixelCalls(page, tikTokPixelLogPrefix);
  const pixelCalls = await openSiteWithPixel(page, 'en');
  await keepClicksOnPage(page);
  for (const link of await page.locator('a[href^="https://wa.me/"]').all()) {
    await link.dispatchEvent('click');
  }
  await page.getByRole('button', { name: languageText.en.switchLabel }).click();
  await expect.poll(() => callsNamed(pixelCalls, 'WhatsAppClick')).toHaveLength(4);
  const whatsappButtons = [
    { target: 'top_bar_call', section: 'page', language: 'en' },
    { target: 'intro_call', section: 'intro', language: 'en' },
    { target: 'contact_call', section: 'contact', language: 'en' },
    { target: 'footer_whatsapp', section: 'contact', language: 'en' },
  ];
  expect(detailsNamed(pixelCalls, 'Contact')).toEqual(whatsappButtons);
  expect(detailsNamed(pixelCalls, 'WhatsAppClick')).toEqual(whatsappButtons);
  await expect.poll(() => detailsNamed(tikTokCalls, 'Contact')).toEqual(whatsappButtons);
  expect(pixelCalls).toContainEqual([
    'trackCustom',
    'Click',
    { target: 'language_switch', section: 'page', language: 'he' },
  ]);
});

test('the phone and price form links report as clicks under their own names', async ({ page }) => {
  const tikTokCalls = collectPixelCalls(page, tikTokPixelLogPrefix);
  const pixelCalls = await openSiteWithPixel(page, 'en');
  await keepClicksOnPage(page);
  await page.locator('[data-track="contact_phone"]').dispatchEvent('click');
  await page.locator('[data-track="contact_start_form"]').dispatchEvent('click');
  await expect
    .poll(() => detailsNamed(pixelCalls, 'Click'))
    .toEqual([
      { target: 'contact_phone', section: 'contact', language: 'en' },
      { target: 'contact_start_form', section: 'contact', language: 'en' },
    ]);
  expect(callsNamed(pixelCalls, 'Contact')).toHaveLength(0);
  expect(callsNamed(tikTokCalls, 'Contact')).toHaveLength(0);
});

test('the project and GitHub links report as clicks under their own names', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  await keepClicksOnPage(page);
  for (const link of await page.locator('#experience a, #projects a').all()) {
    await link.dispatchEvent('click');
  }
  await expect
    .poll(() => detailsNamed(pixelCalls, 'Click'))
    .toEqual([
      { target: 'experience_ebay_mcp', section: 'experience', language: 'en' },
      { target: 'project_oly', section: 'projects', language: 'en' },
      { target: 'project_mypr', section: 'projects', language: 'en' },
      { target: 'project_omri_association', section: 'projects', language: 'en' },
      { target: 'project_vybekiit', section: 'projects', language: 'en' },
      { target: 'project_cal_friend', section: 'projects', language: 'en' },
      { target: 'project_replybase', section: 'projects', language: 'en' },
      { target: 'project_small_bites', section: 'projects', language: 'en' },
      { target: 'project_wise_note_taker', section: 'projects', language: 'en' },
    ]);
  expect(callsNamed(pixelCalls, 'Contact')).toHaveLength(0);
});

test('a middle click counts as a click and a right click does not', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  await keepClicksOnPage(page);
  await page.locator('.intro-summary').click({ button: 'right' });
  await introCallLink(page, 'en').click({ button: 'middle' });
  await expect
    .poll(() => callsNamed(pixelCalls, 'Contact'))
    .toEqual([['track', 'Contact', { target: 'intro_call', section: 'intro', language: 'en' }]]);
  expect(callsNamed(pixelCalls, 'WhatsAppClick')).toHaveLength(1);
  expect(callsNamed(pixelCalls, 'Click')).toHaveLength(0);
});

test('resting the mouse on a button reports one hover', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  const callLink = introCallLink(page, 'en');
  await callLink.hover();
  await page.clock.runFor(500);
  await page.locator('.intro-summary').hover();
  await page.clock.runFor(1500);
  expect(callsNamed(pixelCalls, 'Hover')).toHaveLength(0);

  await callLink.hover();
  await page.clock.runFor(1100);
  await page.locator('.intro-summary').hover();
  await callLink.hover();
  await page.clock.runFor(1100);
  await expect
    .poll(() => callsNamed(pixelCalls, 'Hover'))
    .toEqual([
      ['trackCustom', 'Hover', { target: 'intro_call', section: 'intro', language: 'en' }],
    ]);
});

test('pressing and holding reports one hold, a quick click reports none', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  const summary = page.locator('.intro-summary');
  await summary.hover();
  await page.mouse.down();
  await page.clock.runFor(100);
  await page.mouse.up();
  await page.clock.runFor(600);
  expect(callsNamed(pixelCalls, 'Hold')).toHaveLength(0);

  await page.mouse.down();
  await page.clock.runFor(500);
  await page.mouse.up();
  await page.mouse.down();
  await page.clock.runFor(500);
  await page.mouse.up();
  await expect
    .poll(() => callsNamed(pixelCalls, 'Hold'))
    .toEqual([['trackCustom', 'Hold', { target: 'none', section: 'intro', language: 'en' }]]);
});

test('scrolling reports each depth once and the sections the visitor stops on', async ({
  page,
}) => {
  const tikTokCalls = collectPixelCalls(page, tikTokPixelLogPrefix);
  const pixelCalls = await openSiteWithPixel(page, 'en');
  await page.clock.runFor(1100);
  await expect
    .poll(() => callsNamed(pixelCalls, 'SectionView'))
    .toEqual([['trackCustom', 'SectionView', { section: 'intro', language: 'en' }]]);

  await scrollToEdge(page, 'bottom');
  await page.clock.runFor(1100);
  await scrollToEdge(page, 'top');
  await page.clock.runFor(1100);
  await scrollToEdge(page, 'bottom');
  await page.clock.runFor(1100);
  await expect
    .poll(() => callsNamed(pixelCalls, 'ScrollDepth').map((pixelCall) => pixelCall[2]))
    .toEqual([
      { percent: 25, language: 'en' },
      { percent: 50, language: 'en' },
      { percent: 75, language: 'en' },
      { percent: 100, language: 'en' },
    ]);
  await expect
    .poll(() => callsNamed(pixelCalls, 'SectionView').map((pixelCall) => pixelCall[2]))
    .toEqual([
      { section: 'intro', language: 'en' },
      { section: 'contact', language: 'en' },
    ]);
  await expect
    .poll(() => detailsNamed(tikTokCalls, 'ViewContent'))
    .toEqual([
      { section: 'intro', language: 'en' },
      { section: 'contact', language: 'en' },
    ]);
});

test('time on the page is reported at each milestone', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  await page.clock.runFor(7000);
  expect(callsNamed(pixelCalls, 'TimeOnPage')).toHaveLength(0);
  await page.clock.runFor(125000);
  await expect
    .poll(() => callsNamed(pixelCalls, 'TimeOnPage').map((pixelCall) => pixelCall[2]))
    .toEqual([
      { seconds: 10, language: 'en' },
      { seconds: 30, language: 'en' },
      { seconds: 60, language: 'en' },
      { seconds: 120, language: 'en' },
    ]);
});

test('selecting and copying text is reported once per section', async ({ page }) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  const selectSummary = () =>
    page.locator('.intro-summary').evaluate((summary) => {
      const selection = document.getSelection();
      selection?.selectAllChildren(summary);
      document.dispatchEvent(new ClipboardEvent('copy'));
    });
  await selectSummary();
  await page.clock.runFor(700);
  await selectSummary();
  await page.clock.runFor(700);
  const place = { target: 'none', section: 'intro', language: 'en' };
  await expect
    .poll(() => callsNamed(pixelCalls, 'TextSelect'))
    .toEqual([['trackCustom', 'TextSelect', place]]);
  expect(callsNamed(pixelCalls, 'TextCopy')).toEqual([['trackCustom', 'TextCopy', place]]);
});

test('the first click on the chat widget opens the chat, later ones are chat clicks', async ({
  page,
}) => {
  const pixelCalls = await openSiteWithPixel(page, 'en');
  await page.evaluate(() => {
    const chatWidget = document.createElement('ai-chat-widget');
    document.body.append(chatWidget);
    chatWidget.click();
    chatWidget.click();
  });
  await expect.poll(() => callsNamed(pixelCalls, 'ChatClick')).toHaveLength(1);
  expect(callsNamed(pixelCalls, 'ChatOpen')).toEqual([
    ['trackCustom', 'ChatOpen', { language: 'en' }],
  ]);
  expect(callsNamed(pixelCalls, 'Click')).toHaveLength(0);
});
