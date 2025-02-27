'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  changelog: string;
}

export function ChangelogModal({ isOpen, onClose, changelog }: ChangelogModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-gradient-to-b from-zinc-900 to-black rounded-xl shadow-2xl border border-white/10"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl blur-xl opacity-50" />
                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-white/10">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  What's New
                </h2>
                <p className="text-sm text-zinc-400">Last updated February 25, 2025</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
            >
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div 
            className="prose prose-invert prose-sm overflow-y-auto pr-6 custom-scrollbar" 
            style={{ maxHeight: 'calc(100vh - 12rem)' }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedVersion(children?.toString() || null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h1 className="text-3xl font-bold text-white mb-6 py-4 px-6 rounded-lg">
                      {children}
                      <div className="h-px w-full bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 mt-4" />
                    </h1>
                  </div>
                ),
                h2: ({ children }) => (
                  <div
                    className="flex items-center gap-4 mt-8 mb-6 group"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                      {children}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-fuchsia-400/90 hover:text-fuchsia-400 transition-colors mt-6 mb-4">
                    {children}
                  </h3>
                ),
                ul: ({ children }) => (
                  <ul
                    className="space-y-3 text-zinc-300 mb-6 pl-1"
                  >
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li
                    className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-colors mt-2" />
                    <span className="text-zinc-300/90 group-hover:text-zinc-200 transition-colors">
                      {children}
                    </span>
                  </li>
                ),
              }}
            >
              {changelog}
            </ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 