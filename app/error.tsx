"use client";

import { useEffect } from "react";
import { Suspense } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </Suspense>
  );
}
