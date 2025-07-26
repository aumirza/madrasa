'use client';

import { useEffect } from 'react';

export default function DebugConsole() {
  useEffect(() => {
    // Only show debug console in development mode
    if (
      process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined'
    ) {
      const VConsole = require('vconsole');
      new VConsole();
    }
  }, []);

  return null;
}
