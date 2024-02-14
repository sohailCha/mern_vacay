import { test, expect, Page } from '@playwright/test'
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

test('should allow user to add hotel', async ({ page }) => {
	await page.goto(`${UI_URL}/add-hotel`)

	await page.locator('[name="name"]').fill('Test Hotel')
	await page.locator('[name="city"]').fill('Test City')
	await page.locator('[name="country"]').fill('Test Country')
	await page.locator('[name="description"]').fill('Test Description')
	await page.locator('[name="pricePerNight"]').fill('100')
	await page.selectOption('select[name="starRating"]', '3')

	await page.getByText('Budget').click()

	await page.getByLabel('Free Wifi').click()
	await page.getByLabel('Spa').click()

	await page.locator('[name="adultCount"]').fill('2')
	await page.locator('[name="childCount"]').fill('1')

	await page.setInputFiles('[name="imageFiles"]', [
		path.join(__dirname, 'images', 'background.jpg'),
		path.join(__dirname, 'images', 'main-bg.jpg'),
	])

	await page.getByRole('button', { name: 'Save' }).click()
	await expect(page.getByText('Hotel Saved')).toBeVisible({ timeout: 15000 })
})