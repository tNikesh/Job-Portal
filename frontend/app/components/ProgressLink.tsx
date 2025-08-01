'use client';
import Link from 'next/link';
import { ReactNode, MouseEvent } from 'react';
import NProgress from 'nprogress';

interface ProgressLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export default function ProgressLink({ 
  href, 
  children, 
  onClick,
  ...props 
}: ProgressLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Start progress bar
    NProgress.start();
    
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}