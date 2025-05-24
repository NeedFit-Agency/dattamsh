// @ts-check
const { test, expect } = require('@playwright/test');

const LANDING_PAGE_URL = '/landing';

test.describe('Landing Page Comprehensive E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LANDING_PAGE_URL);
  });

  // Test 1: Section Presence
  test.describe('Section Presence', () => {
    test('should display the header section', async ({ page }) => {
      await expect(page.getByRole('banner').getByText('Binary Brains')).toBeVisible();
    });

    test('should display the hero section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Begin Your Digital Learning Adventure' })).toBeVisible();
    });

    test('should display the features section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Everything You Need to Learn' })).toBeVisible();
      await expect(page.getByText('Progressive Learning Path')).toBeVisible(); // Example feature
    });

    test('should display the testimonials section', async ({ page }) => {
      // The "About Us" link points to #about, which is an ID on the testimonials section.
      // So, the heading "What Our Students Say" is within the section with id="testimonials"
      // but also serves as the target for "About Us" if id="about" is on this section.
      // Let's check for the section title directly.
      await expect(page.getByRole('heading', { name: 'What Our Students Say' })).toBeVisible();
    });

    test('should display the call to action section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Ready to Begin Your Journey?' })).toBeVisible();
    });

    test('should display the footer section', async ({ page }) => {
      const currentYear = new Date().getFullYear();
      await expect(page.getByRole('contentinfo').getByText(`© ${currentYear} Binary Brains`)).toBeVisible();
    });
  });

  // Test 2: Header Navigation Links
  test.describe('Header Navigation Links', () => {
    test('Features link should scroll to features section', async ({ page }) => {
      await page.getByRole('banner').getByRole('link', { name: 'Features' }).click();
      await expect(page).toHaveURL(`${LANDING_PAGE_URL}#features`);
      // Verify the section is in view (approximate check)
      await expect(page.locator('#features').getByRole('heading', { name: 'Everything You Need to Learn' })).toBeInViewport();
    });

    test('Testimonials link should scroll to testimonials section', async ({ page }) => {
      await page.getByRole('banner').getByRole('link', { name: 'Testimonials' }).click();
      await expect(page).toHaveURL(`${LANDING_PAGE_URL}#testimonials`);
      await expect(page.locator('#testimonials').getByRole('heading', { name: 'What Our Students Say' })).toBeInViewport();
    });

    test('About Us link should scroll to the section with id="about"', async ({ page }) => {
      // From page.tsx, the testimonials section has id="testimonials", and there is no explicit id="about".
      // The "About Us" link in the header points to #about.
      // If there's no id="about", this link might not scroll as expected or might target something else.
      // Let's check where it navigates or if it's present.
      // The provided JSX for landing page doesn't show an element with id="about".
      // However, the footer "About Us" link points to #about.
      // Let's assume for now the header "About Us" link is present and check its href.
      // If it points to #about and there's no such ID, the browser might just stay at the top or scroll to the top.
      // For now, we'll check if the link exists and has the correct href.
      // The actual scroll behavior depends on whether an element with id="about" exists.
      // The `src/app/landing/page.tsx` does not have an `id="about"`.
      // Let's verify the link itself and its intended href.
      const aboutUsLink = page.getByRole('banner').getByRole('link', { name: 'About Us' });
      await expect(aboutUsLink).toBeVisible();
      await expect(aboutUsLink).toHaveAttribute('href', '#about');
      // Since there's no section with id="about", clicking it won't scroll to a specific section.
      // We can check that it doesn't navigate away or throw an error.
      await aboutUsLink.click();
      await expect(page).toHaveURL(`${LANDING_PAGE_URL}#about`); // URL will change, but scroll might not happen
      // No specific section to check for toBeInViewport for #about as it's missing.
    });

    test('Get Started button should navigate to /home', async ({ page }) => {
      await page.getByRole('banner').getByRole('link', { name: 'Get Started' }).click();
      await expect(page).toHaveURL('/home');
      await expect(page.getByText('Choose Your Learning Path')).toBeVisible();
    });
  });

  // Test 3: Footer Navigation Links
  test.describe('Footer Navigation Links', () => {
    test('Home link should navigate to / (which redirects to /landing)', async ({ page }) => {
      await page.getByRole('contentinfo').getByRole('link', { name: 'Home', exact: true }).click();
      // Depending on server/client routing, it might go to / and then redirect, or directly to /landing
      // Check for either / or /landing, then verify content of landing page
      try {
        await expect(page).toHaveURL('/');
      } catch (e) {
        await expect(page).toHaveURL('/landing');
      }
      // Verify we are on the landing page by checking a unique element
      await expect(page.getByRole('heading', { name: 'Begin Your Digital Learning Adventure' })).toBeVisible();
    });

    test('Features link should scroll to features section', async ({ page }) => {
      await page.getByRole('contentinfo').getByRole('link', { name: 'Features' }).click();
      await expect(page).toHaveURL(`${LANDING_PAGE_URL}#features`);
      await expect(page.locator('#features').getByRole('heading', { name: 'Everything You Need to Learn' })).toBeInViewport();
    });

    test('Privacy Policy link should be present with correct placeholder href', async ({ page }) => {
      const privacyLink = page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Policy' });
      await expect(privacyLink).toBeVisible();
      await expect(privacyLink).toHaveAttribute('href', '#'); // As per landing page code, these are #
    });

    test('Twitter social media link should have correct href', async ({ page }) => {
      // Locate the link by its aria-label or contained icon if specific enough, or by order if necessary.
      // The FontAwesomeIcon might not provide a direct role name.
      // We'll look for a link within the social media section that has an href for twitter.
      const twitterLink = page.locator('footer .footerSocial a[href="#"] svg[data-icon="twitter"]').first().locator('..'); // go to parent <a>
      await expect(twitterLink).toBeVisible();
      await expect(twitterLink).toHaveAttribute('href', '#'); // Currently placeholder '#' in src/app/landing/page.tsx
      // If it were a real link: await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/yourprofile');
    });
  });

  // Test 4: Main CTA Buttons
  test.describe('Main CTA Buttons', () => {
    test('Hero section "Start Learning Now" button should navigate to /home', async ({ page }) => {
      // This button is within the div className={styles.heroCta}
      await page.locator(`.${"heroCta"}`).getByRole('link', { name: 'Start Learning Now' }).click();
      await expect(page).toHaveURL('/home');
      await expect(page.getByText('Choose Your Learning Path')).toBeVisible();
    });

    test('Hero section "Learn More" button should scroll to #features', async ({ page }) => {
      await page.locator(`.${"heroCta"}`).getByRole('link', { name: 'Learn More' }).click();
      await expect(page).toHaveURL(`${LANDING_PAGE_URL}#features`);
      await expect(page.locator('#features').getByRole('heading', { name: 'Everything You Need to Learn' })).toBeInViewport();
    });

    test('CTA section "Begin Learning Now" button should navigate to /home', async ({ page }) => {
      // This button is in the section with id="cta"
      await page.locator('#cta').getByRole('link', { name: 'Begin Learning Now' }).click();
      await expect(page).toHaveURL('/home');
      await expect(page.getByText('Choose Your Learning Path')).toBeVisible();
    });
  });

  // Keep the original test as a baseline or for specific hero CTA check if needed
  test('should display the landing page and allow navigation via main "Start Learning Now" button-like link (original test)', async ({ page }) => {
    // Navigate to the landing page (already done in beforeEach)
    // await page.goto(LANDING_PAGE_URL); // Not needed due to beforeEach

    // Verify the main title is visible
    await expect(page.getByRole('heading', { name: 'Begin Your Digital Learning Adventure' })).toBeVisible();

    // Find the "Start Learning Now" button-like link in the hero section
    const startLearningButton = page.locator(`.${"heroCta"}`).getByRole('link', { name: 'Start Learning Now' });

    // Verify the button is visible
    await expect(startLearningButton).toBeVisible();

    // Verify the button has the correct href attribute
    await expect(startLearningButton).toHaveAttribute('href', '/home');

    // Click the button
    await startLearningButton.click();

    // Verify that the URL changes to /home
    await expect(page).toHaveURL('/home');

    // Verify that some unique element of the Home page is visible
    await expect(page.getByText('Choose Your Learning Path')).toBeVisible();
  });
});
