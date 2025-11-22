import test, { expect } from '@playwright/test';
test.describe.serial('training log tests ', () => {
    test('create a new training log', async ({ page }) => {
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
        await page
            .getByRole('link', { name: 'Training Logs icon Training' })
            .click();
        await page
            .getByRole('link', { name: 'create new training log' })
            .click();
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page
            .getByRole('textbox', { name: 'Title' })
            .fill('Fetch Practice');

        await page.getByLabel('Select Animal').selectOption({ label: 'Rover' });
        await page.getByRole('textbox', { name: 'Description' }).click();
        await page
            .getByRole('textbox', { name: 'Description' })
            .fill('Rover played fetch and returned the ball every time.');
        await page.getByRole('button', { name: 'Save' }).click();

        await page
            .getByRole('link', { name: 'Training Logs icon Training' })
            .click();
        await expect(page.getByRole('main')).toContainText(
            'Rover played fetch and returned the ball every time.'
        );
    });

    test('edit a training log', async ({ page }) => {
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

        const dataLoaded = page.waitForRequest('/api/training-log/*');
        await page.getByRole('link', { name: 'edit training log' }).click();

        await dataLoaded;
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.waitForTimeout(5000);
        await page
            .getByRole('textbox', { name: 'Title' })
            .fill('Running Practice');
        await page.getByRole('button', { name: 'Save' }).click();
        await page
            .getByRole('link', { name: 'Training Logs icon Training' })
            .click();
        await expect(page.locator('h3')).toContainText('Running Practice');
    });
});
