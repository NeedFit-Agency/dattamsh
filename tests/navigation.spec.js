// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  // Test Landing to Home Navigation
  test('should navigate from Landing to Home page', async ({ page }) => {
    // Start at the /landing page
    await page.goto('/landing');

    // Find and click a "Get Started" or "Start Learning Now" button
    // Assuming the button has text "Start Learning Now"
    // You might need to adjust the locator based on the actual button
    await page.getByRole('button', { name: 'Start Learning Now' }).click();

    // Verify that the URL changes to /home
    await expect(page).toHaveURL('/home');

    // Verify that some unique element of the Home page is visible
    await expect(page.getByText('Choose Your Learning Path')).toBeVisible();
  });

  // Test Home to Learning Page Navigation
  test('should navigate from Home to Learning page for 1st Standard', async ({ page }) => {
    // Start at the /home page
    await page.goto('/home');

    // Click on the card for the "1st Standard"
    // The link should be /standard/1/chapter/1
    // Adjust locator as necessary
    await page.getByRole('link', { name: /1st Standard/i }).click();


    // Verify that the URL changes to /standard/1/chapter/1
    await expect(page).toHaveURL('/standard/1/chapter/1');

    // Verify that a unique element of the Learning page is visible
    // Looking for an element with class containing 'learningContent' or a progress bar
    // This might need adjustment based on actual class names or structure
    const learningContentLocator = page.locator('[class*="learningContent"], [role="progressbar"]');
    await expect(learningContentLocator.first()).toBeVisible();
    
    // Verify that the content loaded corresponds to Standard "1", Chapter "1"
    // (e.g., look for the title "Introduction to Nature and Man-made" from standardsData.ts)
    await expect(page.getByText('Introduction to Nature and Man-made', { exact: true })).toBeVisible();
  });

  // Test Learning to Quiz Page Navigation
  test('should navigate from Learning page to Quiz page after completing a lesson', async ({ page }) => {
    // Programmatically navigate to a learning page for Standard "1", Chapter "1"
    await page.goto('/standard/1/chapter/1');

    // Simulate completing the lesson (4 slides for Standard "1", Chapter "1")
    // Repeatedly click the "Continue" button
    // The button might have text "Continue" or a specific style/test-id
    const continueButton = page.getByRole('button', { name: 'Continue' });
    const startQuizButton = page.getByRole('button', { name: 'Start Quiz' });

    for (let i = 0; i < 3; i++) { // Click "Continue" 3 times for 4 slides (0, 1, 2)
      await continueButton.click();
      await page.waitForTimeout(500); // Brief pause for content to potentially load/animations
    }

    // Click the "Start Quiz" button (which should be the state of the button after the last content slide)
    await startQuizButton.click();

    // Verify that the URL changes to /quiz?standard=1&chapter=1
    await expect(page).toHaveURL('/quiz?standard=1&chapter=1');

    // Verify that a unique element of the Quiz page is visible
    // e.g., an element with class styles.quizContainer or the text "Question 1/"
    const quizContainerLocator = page.locator('[class*="quizContainer"], :text("Question 1/")');
    await expect(quizContainerLocator.first()).toBeVisible();
  });
});
