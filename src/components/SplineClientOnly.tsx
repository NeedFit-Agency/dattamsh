'use client';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface SplineClientOnlyProps {
  scene?: string; // Keep for backward compatibility but make optional
}

export default function SplineClientOnly({ scene }: SplineClientOnlyProps) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DotLottieReact
        src="https://lottie.host/69da7b5e-d8bd-417f-a60a-62a7756c44b0/X3FZYhFXwX.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}