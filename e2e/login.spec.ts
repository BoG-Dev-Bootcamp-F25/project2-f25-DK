import { test, expect } from '@playwright/test';

test('should log in sucessfully', async ({ page }) => {

  await page.locator('body').click();
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('kworathur3@gatech.edu');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByRole('main')).toContainText('Training logs');
});

