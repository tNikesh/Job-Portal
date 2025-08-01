'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// Import NProgress CSS - you'll add this to globals.css instead
// import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.3,
});

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Complete progress when route changes
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Start progress on page unload (when navigating away)
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Listen for route changes
    window.addEventListener('beforeunload', handleStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      handleComplete();
    };
  }, []);

  return null; // This component doesn't render anything
}