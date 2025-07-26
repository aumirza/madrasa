'use client';

import { useEffect } from 'react';

export default function DebugConsole() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const VConsole = require('vconsole');
      new VConsole();
    }
  }, []);

  return null;
}
