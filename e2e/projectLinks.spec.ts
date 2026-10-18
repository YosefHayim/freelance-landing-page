import { expect, test } from '@playwright/test';
import { experienceText } from '../src/features/experience/experience.text';
import type { ProjectName } from '../src/features/projects/projects';
import { projectsText } from '../src/features/projects/projects.text';
import { languages, openSite } from './openSite';

const liveProjects: { projectName: ProjectName; address: string }[] = [
  { projectName: 'oly', address: 'https://www.olyapp.com/' },
  { projectName: 'myPr', address: 'https://mypr.co.il/' },
  { projectName: 'omriAssociation', address: 'https://www.omri-association.com/' },
  { projectName: 'calFriend', address: 'https://calfriend.ai/' },
  { projectName: 'replybase', address: 'https://replybase.dev/' },
  { projectName: 'smallBites', address: 'https://apps.apple.com/app/id6759283694' },
  { projectName: 'wiseNoteTaker', address: 'https://apps.apple.com/app/id6759506382' },
];

for (const language of languages) {
  test(`${language} each project card opens the live project in a new tab`, async ({ page }) => {
    await openSite(page, language);
    const projectCards = page.locator('#projects .project-link');
    await expect(projectCards).toHaveCount(liveProjects.length);
    const text = projectsText[language];
    for (const { projectName, address } of liveProjects) {
      const projectTitle = page.getByText(text.projects[projectName].name, { exact: true });
      const projectCard = projectCards.filter({ has: projectTitle });
      await expect(projectCard).toHaveAttribute('href', address);
      await expect(projectCard).toHaveAttribute('target', '_blank');
      await expect(projectCard).toHaveAttribute('rel', 'noopener');
      const projectImage = projectCard.locator('img');
      await projectImage.scrollIntoViewIfNeeded();
      await expect
        .poll(() => projectImage.evaluate((image: HTMLImageElement) => image.naturalWidth))
        .toBe(1200);
    }
  });
}

test('project pictures are WebP files cached for a year', async ({ page, request }) => {
  await openSite(page, 'en');
  const imageAddresses = await page
    .locator('#projects .project-image')
    .evaluateAll((images: HTMLImageElement[]) => images.map((image) => image.src));
  expect(imageAddresses).toHaveLength(liveProjects.length);
  for (const imageAddress of imageAddresses) {
    expect(new URL(imageAddress).pathname, imageAddress).toMatch(/^\/assets\/.+\.webp$/);
    const imageResponse = await request.get(imageAddress);
    expect(imageResponse.status(), imageAddress).toBe(200);
    expect(imageResponse.headers()['content-type'], imageAddress).toBe('image/webp');
    expect(imageResponse.headers()['cache-control'], imageAddress).toBe(
      'public, max-age=31536000, immutable',
    );
  }
});

for (const language of languages) {
  test(`${language} the GitHub stars proof opens the eBay tool on GitHub`, async ({ page }) => {
    await openSite(page, language);
    const toolLink = page
      .locator('#experience')
      .getByRole('link', { name: experienceText[language].ebayMcpLinkLabel });
    await expect(toolLink).toHaveAttribute('href', 'https://github.com/YosefHayim/ebay-mcp');
    await expect(toolLink).toHaveAttribute('target', '_blank');
    await expect(toolLink).toHaveAttribute('rel', 'noopener');
  });
}
