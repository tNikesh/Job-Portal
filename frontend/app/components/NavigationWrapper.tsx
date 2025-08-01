'use client';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

// Custom hook for navigation with progress
export function useProgressRouter() {
  const router = useRouter();

  const push = (url: string) => {
    NProgress.start();
    router.push(url);
  };

  const replace = (url: string) => {
    NProgress.start();
    router.replace(url);
  };

  const back = () => {
    NProgress.start();
    router.back();
  };

  const forward = () => {
    NProgress.start();
    router.forward();
  };

  return {
    push,
    replace,
    back,
    forward,
    refresh: router.refresh,
  };
}