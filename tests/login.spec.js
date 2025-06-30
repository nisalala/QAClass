// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Login tests using locator()', () => {
  const loginUrl = 'https://the-internet.herokuapp.com/login';

  test('Valid login should succeed', async ({ page }) => {
    await page.goto(loginUrl);

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    await expect(page.locator('a.button.secondary.radius')).toBeVisible(); // Logout button
  });

  test('Invalid username should show error', async ({ page }) => {
    await page.goto(loginUrl);

    await page.locator('#username').fill('invalidUser');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Invalid password should show error', async ({ page }) => {
    await page.goto(loginUrl);

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('wrongPassword');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

});
