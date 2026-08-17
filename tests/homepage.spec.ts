import { test, expect } from '@playwright/test';

test('homepage loads and displays hero', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  // Check if hero title exists
  const heading = page.locator('h1');
  await expect(heading).toContainText('لحظه‌هایی که زندگی');

  // Check CTA buttons
  const exploreBtn = page.getByRole('link', { name: 'کشف تجربه‌ها' }).first();
  await expect(exploreBtn).toBeVisible();
});
