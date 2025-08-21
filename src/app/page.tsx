'use client';

import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect to the landing page
  redirect('/landing');
}