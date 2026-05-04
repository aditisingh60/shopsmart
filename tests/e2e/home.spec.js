const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173'); // Adjust if vite port is different

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ShopSmart/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Click the get started link.
  // Check for the hero banner heading.
  await expect(page.getByRole('heading', { name: /Beauty Unleashed/i })).toBeVisible();
});
