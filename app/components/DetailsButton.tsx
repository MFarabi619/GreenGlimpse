'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/router'; // Correct import
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export function DetailsButton({
  children,
  data
}: LayoutProps & { data?: string }) {
  return (
    <Link
      href={{ pathname: '/details', query: { data: data } }}
      className="w-full h-full"
    >
      {children}
    </Link>
  );
}

export default DetailsButton;
