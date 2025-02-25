import { Suspense } from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </Suspense>
  );
} 