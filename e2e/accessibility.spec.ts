import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { languageText } from '../src/features/language/language.text';
import { topBarText } from '../src/features/topBar/topBar.text';
import { languages, openSite, revealEverySection } from './openSite';

for (const language of languages) {
  test(`${language} page passes axe`, async ({ page }) => {
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openSite(page, language);
    await revealEverySection(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('keyboard reaches the language switch and the top bar call link', async ({
  page,
}, testInfo) => {
  const tabKey =
    testInfo.project.name === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab';
  await openSite(page, 'en');

  await page.keyboard.press(tabKey);
  await expect(page.getByRole('button', { name: languageText.en.switchLabel })).toBeFocused();
  await page.keyboard.press(tabKey);
  const callLink = page
    .getByRole('navigation')
    .getByRole('link', { name: topBarText.en.callLabel });
  await expect(callLink).toBeFocused();
});
