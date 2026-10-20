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

  test('renders selected work and footer', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page.getByRole('heading', { level: 2, name: 'Selected work' })).toBeVisible()

    for (const [name, href] of [
      ['forestinnovationplatform.org', 'https://forestinnovationplatform.org/'],
      ['forestryanalytics.org', 'https://forestryanalytics.org/'],
    ]) {
      await expect(page.getByRole('link', { name })).toHaveAttribute('href', href)
    }

    await expect(page.getByRole('contentinfo').getByText('Let’s connect.')).toBeVisible()
  })
})
