// @ts-check
const { test, expect } = require('@playwright/test');

const HOME_PAGE_URL = '/home';

test.describe('Home Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_PAGE_URL);
  });

  // Test 1: Page Load and Basic Elements
  test('should load the home page and display basic elements', async ({ page }) => {
    // Verify the main heading
    await expect(page.getByRole('heading', { name: 'Choose Your Learning Path' })).toBeVisible();
    await expect(page.getByText('Select your grade level and start exploring the world of technology!')).toBeVisible();
  });

  // Test 2: Standards Listing
  test.describe('Standards Listing', () => {
    test('should display multiple standard cards', async ({ page }) => {
      // Check for elements with class styles.standardCard
      // Since styles.standardCard is a CSS module class, its actual rendered name might be different.
      // A more robust way is to count the Link elements within the standardList div.
      // The page structure is: div.standardList > motion.div.standardCard > Link.standardLink
      const standardCards = page.locator('div[class*="standardList"] > div[class*="standardCard"]');
      await expect(standardCards.count()).toBeGreaterThan(1); // Check if more than one card is present
      
      // Or, more specifically, count the links that represent the cards
      const standardLinks = page.locator('a[class*="standardLink"]');
      await expect(standardLinks.count()).toBeGreaterThanOrEqual(8); // As per the provided data, there are 8 standards
    });

    test('should display correct content for "1st Standard" card', async ({ page }) => {
      // Locate the card for "1st Standard" - it's a Link element
      const firstStandardCard = page.locator('a[class*="standardLink"]').filter({ hasText: '1st Standard' });

      await expect(firstStandardCard).toBeVisible();
      // Check title
      await expect(firstStandardCard.getByRole('heading', { name: '1st Standard' })).toBeVisible();
      // Check subtitle
      await expect(firstStandardCard.getByText('Basic Computer Education')).toBeVisible();
      // Check description
      await expect(firstStandardCard.getByText('Learn all about computers')).toBeVisible();
      // Check units
      await expect(firstStandardCard.getByText('4 Chapters')).toBeVisible();
       // Check message
      await expect(firstStandardCard.getByText('Start your journey into the world of computers!')).toBeVisible();
    });

    test('should display correct content for "2nd Standard" card', async ({ page }) => {
      const secondStandardCard = page.locator('a[class*="standardLink"]').filter({ hasText: '2nd Standard' });

      await expect(secondStandardCard).toBeVisible();
      // Check title
      await expect(secondStandardCard.getByRole('heading', { name: '2nd Standard' })).toBeVisible();
      // Check subtitle
      await expect(secondStandardCard.getByText('Intermediate Computer Education')).toBeVisible();
      // Check description
      await expect(secondStandardCard.getByText('Explore different types of computers, smartphones, and learn to use Notepad')).toBeVisible();
      // Check units
      await expect(secondStandardCard.getByText('4 Chapters')).toBeVisible();
    });
  });

  // Test 3: Navigation from Standard Card
  test.describe('Navigation from Standard Card', () => {
    test('should navigate to 1st Standard learning page', async ({ page }) => {
      const firstStandardCard = page.locator('a[class*="standardLink"]').filter({ hasText: '1st Standard' });
      await firstStandardCard.click();

      await expect(page).toHaveURL('/standard/1/chapter/1');
      // Verify some content on the learning page for 1st standard, chapter 1
      await expect(page.getByRole('heading', { name: 'Introduction to Nature and Man-made' })).toBeVisible();
    });

    test('should navigate to 2nd Standard learning page', async ({ page }) => {
      // Navigate back to home if the previous test changed the URL
      // This is already handled by beforeEach, so no need to navigate back manually here.

      const secondStandardCard = page.locator('a[class*="standardLink"]').filter({ hasText: '2nd Standard' });
      await secondStandardCard.click();

      await expect(page).toHaveURL('/standard/2/chapter/1');
      // Verify some content on the learning page for 2nd standard, chapter 1
      // (Assuming Chapter 1 title is "More about Computers" from standardsData.ts for Standard "2")
      await expect(page.getByRole('heading', { name: 'Questions to Ponder' })).toBeVisible();
    });
  });
});
