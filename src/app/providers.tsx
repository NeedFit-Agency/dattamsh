'use client';

import React from 'react';
import { InteractionTrackingProvider } from '../contexts/InteractionTrackingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <InteractionTrackingProvider>
      {children}
    </InteractionTrackingProvider>
  );
}