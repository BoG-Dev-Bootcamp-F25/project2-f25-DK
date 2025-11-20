import { test, expect } from '@playwright/test';

test.beforeAll(async ({ request }) => {
    const response = await request.post('/api/user/register', {
        data: {
            fullName: 'Admin User',
            email: 'admin@gatech.edu',
            password: '12345678',
            confirmPassword: '12345678',
            admin: true,
        },
    });
    await expect(response).toBeOK();
});

test('create admin user', async ({ page }) => {
    await page.goto('/signup');
    // Expect a title "to contain" a substring.
    await page.getByRole('textbox', { name: 'Full Name' }).click();
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Admin User 2');
    await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
    await page
        .getByRole('textbox', { name: 'Email' })
        .fill('admin2@gatech.edu');
    await page.getByRole('textbox', { name: 'Password', exact: true }).click();
    await page
        .getByRole('textbox', { name: 'Password', exact: true })
        .fill('12345678');
    await page.getByRole('textbox', { name: 'Confirm Password' }).click();
    await page
        .getByRole('textbox', { name: 'Confirm Password' })
        .fill('12345678');
    await page.getByRole('checkbox', { name: 'Admin Access' }).check();
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(
        page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
});

test('login as admin user', async ({ page }) => {
    await page.goto('/');
    // Expect a title "to contain" a substring.
    await page.getByRole('link', { name: 'app logo Progress' }).click();
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@gatech.edu');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(
        page.getByRole('heading', { name: 'Admin Access' })
    ).toBeVisible();
});
