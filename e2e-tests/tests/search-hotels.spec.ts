import { test, expect } from '@playwright/test'
import path from 'path'

const UI_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
	await page.goto(UI_URL)

	//get sign in button

	await page.getByRole('link', { name: 'Sign In' }).click()

	await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()

	await page.locator('[name=email]').fill('1@2.com')
	await page.locator('[name=password]').fill('Naush@1014')

	await page.getByRole('button', { name: 'Log In' }).click()

	await expect(page.getByText('Sign in successful')).toBeVisible()
})

test('should show hotel search result', async ({ page }) => {
	await page.goto(UI_URL)

	await page.getByPlaceholder('Where are you going?').fill('Test City')
	await page.getByRole('button', { name: 'Search' }).click()

	await expect(page.getByText('Hotels found in Test City')).toBeVisible()
	await expect(page.getByText('Test Hotel').first()).toBeVisible()
})
