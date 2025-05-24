// @ts-check
const { test, expect } = require('@playwright/test');
const { standards } = require('../src/data/standardsData'); // Adjust path as necessary

const LEARNING_PAGE_BASE_URL = '/standard/1/chapter/1';

test.describe('Learning Page E2E Tests for Standard 1, Chapter 1', () => {
  // Test 1: Content Loading and ContentRenderer Verification (Text/Image Slide)
  test('should load initial content correctly (slide 1)', async ({ page }) => {
    await page.goto(LEARNING_PAGE_BASE_URL);

    const slide1Data = standards["1"][0].lessonContent[0]; // Intro slide

    // Verify the title
    await expect(page.getByRole('heading', { name: slide1Data.title, exact: true })).toBeVisible();

    // Verify description text (first line)
    const description1 = Array.isArray(slide1Data.description) ? slide1Data.description[0] : slide1Data.description;
    await expect(page.getByText(description1)).toBeVisible();
    
    // Verify image
    if (slide1Data.imageUrl) {
      await expect(page.locator(`img[src="${slide1Data.imageUrl}"]`)).toBeVisible();
    }
  });

  test('should load content for slide 2 correctly (Natural Things)', async ({ page }) => {
    await page.goto(LEARNING_PAGE_BASE_URL);
    const slide1Data = standards["1"][0].lessonContent[0];
    const slide2Data = standards["1"][0].lessonContent[1];

    // Navigate to slide 2
    await page.getByRole('button', { name: /Continue/i }).click();
    await page.waitForTimeout(500); // Allow time for content to update

    // Verify the title of slide 2
    await expect(page.getByRole('heading', { name: slide2Data.title, exact: true })).toBeVisible();

    // Verify description text for slide 2
    const description2 = Array.isArray(slide2Data.description) ? slide2Data.description[0] : slide2Data.description;
    await expect(page.getByText(description2)).toBeVisible();

    // Verify example images for slide 2
    if (slide2Data.exampleImages && slide2Data.exampleImages.length > 0) {
      for (const img of slide2Data.exampleImages) {
        await expect(page.locator(`img[src="${img.src}"]`)).toBeVisible();
      }
    }
  });

  // Test 2: Slide Navigation
  test('should navigate between slides using Continue and Previous buttons', async ({ page }) => {
    await page.goto(LEARNING_PAGE_BASE_URL);

    const slide1Title = standards["1"][0].lessonContent[0].title;
    const slide2Title = standards["1"][0].lessonContent[1].title;

    // Verify initial slide
    await expect(page.getByRole('heading', { name: slide1Title, exact: true })).toBeVisible();

    // Click "Continue"
    await page.getByRole('button', { name: /Continue/i }).click();
    await page.waitForTimeout(500); // Allow time for transition

    // Verify navigation to slide 2
    await expect(page.getByRole('heading', { name: slide2Title, exact: true })).toBeVisible();

    // Click "Previous"
    // The previous button in the footer might be specific. Let's target it carefully.
    // The 'Previous' button is inside a footer with class styles.learningFooter
    await page.locator('footer').getByRole('button', { name: /Previous/i }).click();
    await page.waitForTimeout(500); // Allow time for transition

    // Verify navigation back to slide 1
    await expect(page.getByRole('heading', { name: slide1Title, exact: true })).toBeVisible();
  });

  // Test 3: Drag-and-Drop Interaction
  test('should handle drag-and-drop activity', async ({ page }) => {
    await page.goto(LEARNING_PAGE_BASE_URL);
    const dragDropSlideData = standards["1"][0].lessonContent[3]; // "Activity: Sort Them Out!"

    // Navigate to the drag-and-drop slide (slide 4)
    for (let i = 0; i < 3; i++) {
      await page.getByRole('button', { name: /Continue/i }).click();
      await page.waitForTimeout(500);
    }

    // Verify title of the drag-and-drop slide
    await expect(page.getByRole('heading', { name: dragDropSlideData.title, exact: true })).toBeVisible();
    // Verify instruction text
    await expect(page.getByText(dragDropSlideData.instruction)).toBeVisible();

    // Identify draggable items and target boxes
    // Draggable items have a structure like: div > p (text) and div > img (if imageUrl)
    // Targets are usually divs with specific classes or roles.
    // For this example, we'll use text content to locate items and targets.
    // Note: Robust locators would ideally use test-ids.

    const banyanTreeItem = page.getByText('Banyan Tree', { exact: true });
    const charpaiItem = page.getByText('Charpai', { exact: true });

    // Targets might be identifiable by their titles (e.g., h3 or similar)
    const naturalThingsTarget = page.locator('div').filter({ hasText: /^Natural Things$/ }).last();
    const manMadeThingsTarget = page.locator('div').filter({ hasText: /^Human-made Things$/ }).last();
    
    // Perform drag-and-drop
    await banyanTreeItem.dragTo(naturalThingsTarget);
    await charpaiItem.dragTo(manMadeThingsTarget);
    
    // Click "Check Answers" button
    // The button text is "Check Answers" when dndChecked is false
    const checkAnswersButton = page.getByRole('button', { name: 'Check Answers' });
    await expect(checkAnswersButton).toBeVisible();
    await checkAnswersButton.click();
    await page.waitForTimeout(500);


    // Verify feedback (difficult to verify transient toasts, but check for state changes)
    // For example, the button text might change, or items might get a visual marker.
    // After checking, the button text becomes "Continue" if successful or might show incorrect state.
    // Check if the items are still within the target boxes (or marked correctly)
    // This part is highly dependent on implementation details of feedback.
    // We'll check if the button text changes to "Continue" which indicates the check was processed.
    const continueButtonAfterCheck = page.getByRole('button', { name: /Continue/i });
    await expect(continueButtonAfterCheck).toBeVisible();

    // A more robust check would be to see if the items are now considered "correct"
    // This might involve checking for a class or attribute on the item or target.
    // For now, we confirm the button changed, implying the state progressed.
    // For example, check if the banyan tree is now within the natural target and has a correct class (if applicable)
    // This requires knowledge of how correctness is visually indicated.
    // As a proxy, we'll check if the banyan tree text is a child of the natural things target after dropping.
    await expect(naturalThingsTarget.getByText('Banyan Tree')).toBeVisible();
    await expect(manMadeThingsTarget.getByText('Charpai')).toBeVisible();
  });

  // Test 4: Exit Confirmation Modal
  test('should display and handle exit confirmation modal on first slide', async ({ page }) => {
    await page.goto(LEARNING_PAGE_BASE_URL);
    const slide1Title = standards["1"][0].lessonContent[0].title;

    // The "Back" button that triggers the modal is part of ContentRenderer's props,
    // usually rendered as a FontAwesomeIcon. It might not have a specific text role.
    // Let's assume it's the first button in the header or a button with aria-label "Back".
    // In LearningPage.tsx, onBack is passed to ContentRenderer, but ContentRenderer itself doesn't show a specific back button.
    // The back logic is in LearningPage.tsx's handleBackClick, which is tied to currentSlideIndex.
    // The "Previous" button in the footer acts as back on subsequent slides.
    // On the first slide, handleBackClick (called by onBack in ContentRenderer) triggers setShowExitConfirm(true).
    // The actual back button that calls onBack prop of ContentRenderer is not clearly defined in the provided ContentRenderer code.
    // It's assumed there's a back button in the UI that calls the `onBack` prop.
    // For this test, we will simulate the state where the modal should appear by being on the first slide
    // and then interacting with the "Previous" button which should trigger the modal.

    // Click the "Previous" button (which should be the trigger for `handleBackClick` on the first slide)
    // The `ContentRenderer` is called with `onBack={handleBackClick}`.
    // If `ContentRenderer` itself renders a back button in its header that calls `onBack`, we'd target that.
    // If not, the `styles.previousButton` is the only explicit "back-like" button.
    // Let's assume the `styles.previousButton` in the footer calls `handlePrevious`, which calls `handleBackClick` indirectly
    // or that there's another UI element for "Back".
    // The provided code shows a previousButton in the footer. Let's assume that's what we click.
    // On the first slide, this button is disabled.

    // We need a way to trigger `handleBackClick` when `currentSlideIndex === 0`.
    // The `ContentRenderer` does not show its own back button.
    // The `learningHeader` in `LearningPage.tsx` is empty.
    // This test case might be hard to implement without a clear UI element for "Back" on the first slide
    // that is *not* the disabled "Previous" button.

    // Let's assume there is an icon button for back, perhaps with an aria-label.
    // For the sake of the test, let's consider the scenario where a generic back button exists.
    // If the previousButton in the footer is the only one, this test needs adjustment as it's disabled on slide 1.

    // Re-evaluating: The `handleBackClick` is called by `onBack` prop of `ContentRenderer`.
    // The `ContentRenderer` itself (e.g. Text, Video components) might render a back button.
    // Let's look for a generic back button within the main content area.
    // If `Text.tsx` (loaded by ContentRenderer) has a back button:
    const backButtonInContent = page.locator(`button[aria-label*="Back"], [data-testid="content-back-button"]`).first(); // Placeholder
    
    // Given the current structure, let's assume the "Previous" button is the only one,
    // and it's disabled on the first slide. This means the modal test as described might not be
    // directly testable by clicking "Previous" on slide 1.
    // However, the modal logic *is* present. If there's another way to trigger `handleBackClick` (e.g. a global back button), that would be it.

    // For now, let's test the modal functionality by directly calling the state change if possible (not ideal for E2E)
    // or by finding a scenario where the modal *is* triggered.
    // The `handleBackClick` is triggered by `onBack` in `ContentRenderer`.
    // The "Previous" button in the footer only calls `handlePrevious`.
    // This test will be challenging with the current information.

    // Let's simplify and assume the modal is triggered by a specific UI element if on the first slide.
    // We will simulate navigating to the first slide and attempting to go back.
    // Since the "Previous" button is disabled on the first slide, we'll assume there's another back mechanism.
    // If no such mechanism is obvious, we'll have to skip or modify this part of the test.

    // Given the code, the "Previous" button in the footer is disabled.
    // The `onBack` is passed to `ContentRenderer`, so specific content types might have their own back.
    // The `Text` component (loaded for slide 1) doesn't show an explicit back button in its props from `ContentRenderer.tsx`.

    // Let's assume the test means: navigate to slide 2, then back to slide 1, then attempt to go back again.
    await page.getByRole('button', { name: /Continue/i }).click(); // Go to slide 2
    await page.waitForTimeout(200);
    await page.locator('footer').getByRole('button', { name: /Previous/i }).click(); // Go back to slide 1
    await page.waitForTimeout(200);
    await expect(page.getByRole('heading', { name: slide1Title, exact: true })).toBeVisible();

    // Now on slide 1. The "Previous" button in the footer is disabled.
    // How is the modal triggered? The `onBack` prop of `ContentRenderer` is called by `handleBackClick`.
    // If any component rendered by `ContentRenderer` calls `onBack`, that would trigger it.
    // Let's assume there's a generic "back" button in the header that is not shown in the provided JSX for LearningPage.
    // For now, this specific part of the test for the modal is hard to implement accurately without a clear trigger on the first slide.

    // Let's try to find a button that could call `onBack`.
    // The `styles.learningHeader` is empty.
    // The `ContentRenderer` components themselves (Text, Video etc.) are passed `onBack`.
    // Let's assume the `Text` component for slide 1 has a back button.
    // It's more likely this is triggered by a global UI element not shown.

    // Test a different modal trigger: the "Quit" button in the quiz-like header on the learning page.
    // The `LearningPageContent` has a header with a quit button:
    // `<button className={styles.quitButton} onClick={() => setShowExitConfirm(true)} aria-label="Quit lesson">`
    // This button is always present according to `LearningPage.tsx` structure.

    const quitButton = page.getByRole('button', { name: 'Quit lesson' }); // Uses aria-label
    await expect(quitButton).toBeVisible();
    await quitButton.click();

    // Verify modal appears
    await expect(page.getByRole('heading', { name: 'Exit Lesson?' })).toBeVisible();
    await expect(page.getByText('Your progress on this lesson might not be saved if you exit now.')).toBeVisible();

    // Click "Cancel"
    const cancelButton = page.getByRole('button', { name: 'Cancel' });
    await cancelButton.click();

    // Verify modal disappears
    await expect(page.getByRole('heading', { name: 'Exit Lesson?' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: slide1Title, exact: true })).toBeVisible(); // Still on the page

    // Click "Quit" button again
    await quitButton.click();
    await expect(page.getByRole('heading', { name: 'Exit Lesson?' })).toBeVisible();

    // Click "Exit Anyway"
    const exitAnywayButton = page.getByRole('button', { name: 'Exit Anyway' });
    await exitAnywayButton.click();

    // Verify navigation. It should go to /standard/1/chapter/1 (refreshing or staying)
    // or potentially to the home page if that was the previous route in a real scenario.
    // The code `router.push(`/standard/${standard}/chapter/${chapter}`);` implies it re-navigates to the current chapter's start.
    await expect(page).toHaveURL(LEARNING_PAGE_BASE_URL); // It navigates to the same base URL
    await page.waitForTimeout(500); // Allow for navigation/reload
    // Check if we are back on the first slide of that chapter
    await expect(page.getByRole('heading', { name: slide1Title, exact: true })).toBeVisible();
  });

  test('should navigate to quiz page after completing all slides', async ({ page }) => {
    await page.goto(LEARNING_PAGE_BASE_URL);
    const chapter1Slides = standards["1"][0].lessonContent;
    const totalSlides = chapter1Slides.length;

    // Click through all slides
    for (let i = 0; i < totalSlides -1; i++) { // -1 because last click is "Start Quiz"
        const currentSlide = chapter1Slides[i];
        if (currentSlide.type === 'drag-drop') {
            // Handle DND if necessary to enable continue, for now, assume simple click through or auto-pass
            // For this test, we will just click check answers then continue.
            const dndCheckButton = page.getByRole('button', { name: 'Check Answers' });
            if (await dndCheckButton.isVisible()) { // Check if it's a DND slide needing check
                 // Perform minimal DND to enable check button if needed
                if (currentSlide.items.length > 0 && currentSlide.targets.length > 0) {
                    const firstItem = page.getByText(currentSlide.items[0].text, { exact: true }).first();
                    const firstTarget = page.locator('div').filter({ hasText: new RegExp(`^${currentSlide.targets[0].title}$`) }).last();
                     if (await firstItem.isVisible() && await firstTarget.isVisible()) {
                        await firstItem.dragTo(firstTarget);
                    }
                }
                await dndCheckButton.click();
                await page.waitForTimeout(200); // for feedback
            }
        }
        const continueButton = page.getByRole('button', { name: /Continue/i });
        await expect(continueButton).toBeVisible();
        await continueButton.click();
        await page.waitForTimeout(200); // for slide transition
    }

    // Last click should be "Start Quiz"
    const startQuizButton = page.getByRole('button', { name: /Start Quiz/i });
    await expect(startQuizButton).toBeVisible();
    await startQuizButton.click();

    // Verify navigation to quiz page
    await expect(page).toHaveURL(`/quiz?standard=1&chapter=1`);
    // Verify a quiz page element is visible
    await expect(page.getByText('Question 1/', { exact: false })).toBeVisible();
  });

});
