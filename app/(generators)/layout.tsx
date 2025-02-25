import * as React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Background image */}
      <div className="fixed inset-0">
        <Image
          src="/images/resized.jpg"
          alt="Background"
          fill
          quality={50}
          priority={false}
          loading="lazy"
          className="object-cover will-change-transform"
          style={{ opacity: 0.7 }}
          sizes="100vw"
        />
      </div>

      {/* Animated overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-violet-500/10 animate-float" 
        />
      </div>

      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-zinc-50/70 to-white/70 dark:from-background/95 dark:to-background/75" />
      
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] -top-40 -right-20 bg-violet-500/20 dark:bg-violet-500/30 rounded-full blur-[100px] opacity-20" />
        <div className="absolute w-[1000px] h-[1000px] -bottom-40 -left-20 bg-fuchsia-500/20 dark:bg-fuchsia-500/30 rounded-full blur-[100px] opacity-20" />
      </div>

      {/* Back Button */}
      <Link 
        href="/"
        className="fixed top-6 left-6 z-20 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>

      {/* Content */}
      {children}
    </div>
  );
} 