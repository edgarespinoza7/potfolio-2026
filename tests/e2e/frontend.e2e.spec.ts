import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the homepage hero', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Edgar Espinoza/)

    await expect(page.locator('h1').first()).toHaveText(
      'Connecting the dots. Advancing sustainability.',
    )

    await expect(page.getByRole('link', { name: 'Vizzuality' })).toHaveAttribute(
      'href',
      'https://vizzuality.com/',
    )

    for (const name of ['GitHub', 'LinkedIn', 'X']) {
      await expect(page.getByRole('link', { name, exact: true })).toBeVisible()
    }
  })
})
