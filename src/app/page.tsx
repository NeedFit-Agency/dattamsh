import { redirect } from 'next/navigation';

/**
 * Root page component.
 * Immediately redirects the user to the main learning path.
 */
export default function HomePage() {
  // Redirect to the main learning interface page
  redirect('/learn');

  // This part will never be reached because of the redirect,
  // but you could optionally return null or a loading indicator.
  // return null;
}