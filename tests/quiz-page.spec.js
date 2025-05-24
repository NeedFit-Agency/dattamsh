// @ts-check
const { test, expect } = require('@playwright/test');
const { quizzes } = require('../src/data/quizeData'); // Adjust path as necessary

const QUIZ_PAGE_URL_S1_C1 = '/quiz?standard=1&chapter=1';
const QUIZ_PAGE_URL_S1_C2 = '/quiz?standard=1&chapter=2'; // For completion test with fewer questions if needed

test.describe('Quiz Page E2E Tests for Standard 1, Chapter 1', () => {
  const standardId = '1';
  const chapterId = '1';
  const chapterData = quizzes[standardId].find(c => c.id === parseInt(chapterId));
  const questions = chapterData.questions;

  // Test 1: Quiz Content Loading
  test('should load quiz content correctly', async ({ page }) => {
    await page.goto(QUIZ_PAGE_URL_S1_C1);
    await page.waitForTimeout(1000); // Allow time for questions to load via useEffect/setTimeout

    // Verify chapter title
    await expect(page.getByText(chapterData.title, { exact: true })).toBeVisible();

    // Verify first question's prompt
    const firstQuestion = questions[0];
    await expect(page.getByText(firstQuestion.prompt)).toBeVisible();

    // Verify answer options are displayed
    for (const optionText of firstQuestion.options) {
      // AnswerOption component renders a button with a div for text inside
      await expect(page.locator('button').filter({ has: page.getByText(optionText, { exact: true }) })).toBeVisible();
    }
  });

  // Test 2: Answer Selection and AnswerOption Verification
  test('should show visual indication when an answer is selected', async ({ page }) => {
    await page.goto(QUIZ_PAGE_URL_S1_C1);
    await page.waitForTimeout(1000);

    const firstQuestion = questions[0];
    const firstOptionText = firstQuestion.options[0];
    const firstOptionButton = page.locator('button').filter({ has: page.getByText(firstOptionText, { exact: true }) });

    await firstOptionButton.click();

    // Verify selection by checking for a specific class (e.g., styles.selected from AnswerOption.module.css)
    // Playwright's class check can be `toHaveClass(/selected/)`
    await expect(firstOptionButton).toHaveClass(/selected/);
  });

  // Test 3: Checking Correct Answer
  test('should handle correct answer correctly', async ({ page }) => {
    await page.goto(QUIZ_PAGE_URL_S1_C1);
    await page.waitForTimeout(1000);

    const firstQuestion = questions[0]; // "Which of these is a NATURAL thing?"
    const correctAnswerText = firstQuestion.options[firstQuestion.correctAnswer]; // "Sun"
    const correctAnswerButton = page.locator('button').filter({ has: page.getByText(correctAnswerText, { exact: true }) });

    await correctAnswerButton.click();
    await page.getByRole('button', { name: 'CHECK' }).click();

    // Verify feedback
    await expect(page.getByText('Great job!')).toBeVisible();
    await expect(correctAnswerButton).toHaveClass(/correct/);

    // Verify "CONTINUE" button appears
    const continueButton = page.getByRole('button', { name: 'CONTINUE' });
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    await page.waitForTimeout(500); // For next question to load

    // Verify next question is displayed
    const secondQuestion = questions[1];
    await expect(page.getByText(secondQuestion.prompt)).toBeVisible();
  });

  // Test 4: Checking Incorrect Answer
  test('should handle incorrect answer correctly', async ({ page }) => {
    await page.goto(QUIZ_PAGE_URL_S1_C1);
    await page.waitForTimeout(1000);

    const firstQuestion = questions[0];
    // Select an incorrect answer (e.g., option 0 if correct is 1)
    const incorrectAnswerIndex = firstQuestion.correctAnswer === 0 ? 1 : 0;
    const incorrectAnswerText = firstQuestion.options[incorrectAnswerIndex];
    const incorrectAnswerButton = page.locator('button').filter({ has: page.getByText(incorrectAnswerText, { exact: true }) });

    const correctAnswerText = firstQuestion.options[firstQuestion.correctAnswer];
    const correctAnswerButton = page.locator('button').filter({ has: page.getByText(correctAnswerText, { exact: true }) });

    await incorrectAnswerButton.click();
    await page.getByRole('button', { name: 'CHECK' }).click();

    // Verify feedback
    await expect(page.getByText('Not quite.')).toBeVisible();
    await expect(incorrectAnswerButton).toHaveClass(/incorrect/);
    await expect(correctAnswerButton).toHaveClass(/correct/); // Correct answer should also be highlighted

    // Verify "CONTINUE" button appears
    const continueButton = page.getByRole('button', { name: 'CONTINUE' });
    await expect(continueButton).toBeVisible();
    await continueButton.click();
    await page.waitForTimeout(500);

    // Verify next question is displayed (if any)
    if (questions.length > 1) {
      const secondQuestion = questions[1];
      await expect(page.getByText(secondQuestion.prompt)).toBeVisible();
    }
  });

  // Test 5: Quiz Completion and Results
  test('should display completion screen with score after finishing all questions', async ({ page }) => {
    await page.goto(QUIZ_PAGE_URL_S1_C1); // Using S1C1 which has 6 questions
    await page.waitForTimeout(1000);

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const optionToSelectText = question.options[0]; // Just select the first option for simplicity
      const optionButton = page.locator('button').filter({ has: page.getByText(optionToSelectText, { exact: true }) }).first();
      
      await optionButton.click();
      await page.getByRole('button', { name: 'CHECK' }).click();
      await page.waitForTimeout(200); // For feedback to appear

      const continueOrFinishButtonName = (i === questions.length - 1) ? 'FINISH' : 'CONTINUE';
      const continueOrFinishButton = page.getByRole('button', { name: continueOrFinishButtonName });
      await expect(continueOrFinishButton).toBeVisible();
      await continueOrFinishButton.click();
      await page.waitForTimeout(500); // For next question or completion screen
    }

    // Verify completion screen
    await expect(page.getByText('Congratulations!')).toBeVisible();
    await expect(page.getByText('You\'ve completed this lesson.')).toBeVisible();

    // Verify score display (e.g., text containing '%' or 'Accuracy')
    await expect(page.getByText(/Accuracy/i)).toBeVisible();
    const scoreText = await page.locator('[class*="scoreValue"]').textContent();
    expect(scoreText).toContain('%');
  });
  
  // Test 6: LocalStorage Verification for Completed Chapter
  test('should mark chapter as completed in localStorage', async ({ page }) => {
    await page.goto(QUIZ_PAGE_URL_S1_C1);
    await page.waitForTimeout(1000);

    // Clear localStorage for this key to ensure a clean test
    await page.evaluate(() => {
      localStorage.removeItem('completedChapters');
    });

    // Answer all questions correctly to ensure completion
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const correctAnswerText = question.options[question.correctAnswer];
      const correctAnswerButton = page.locator('button').filter({ has: page.getByText(correctAnswerText, { exact: true }) }).first();
      
      await correctAnswerButton.click();
      await page.getByRole('button', { name: 'CHECK' }).click();
      await page.waitForTimeout(200);

      const continueOrFinishButtonName = (i === questions.length - 1) ? 'FINISH' : 'CONTINUE';
      const continueOrFinishButton = page.getByRole('button', { name: continueOrFinishButtonName });
      await expect(continueOrFinishButton).toBeVisible();
      await continueOrFinishButton.click();
      await page.waitForTimeout(500);
    }

    // Verify completion screen is shown
    await expect(page.getByText('Congratulations!')).toBeVisible();

    // Check localStorage
    const completedChapters = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('completedChapters') || '{}');
    });
    
    const expectedKey = `${standardId}-${chapterId}`; // "1-1"
    expect(completedChapters[expectedKey]).toBe(true);
  });

});
