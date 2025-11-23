import test, { expect } from '@playwright/test';

test('create a new animal', async ({ page }) => {
    await page.goto('/');
    // Expect a title "to contain" a substring.
    await page.getByRole('link', { name: 'app logo Progress' }).click();
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page
        .getByRole('textbox', { name: 'Email' })
        .fill('alice3@gatech.edu');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Animals icon Animals' }).click();
    await page
        .getByRole('link', { name: 'create new animal Create New' })
        .click();
    await page.getByRole('textbox', { name: 'Animal Name' }).click();
    await page.getByRole('textbox', { name: 'Animal Name' }).fill('Rover');
    await page.getByLabel('Breed').selectOption('German Shepherd');
    await page
        .getByRole('spinbutton', { name: 'Total hours trained' })
        .fill('5');

    await page.getByRole('button', { name: 'Save' }).click();

    await page.getByRole('link', { name: 'Animals icon Animals' }).click();
    await expect(page.getByText('Rover - German Shepherd')).toBeVisible();
});
