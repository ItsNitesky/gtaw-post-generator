'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  changelog: string;
}

export function ChangelogModal({ isOpen, onClose, changelog }: ChangelogModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="relative w-full max-w-2xl bg-zinc-900 rounded-xl shadow-xl border border-white/10"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Release Notes</h2>
                <p className="text-xs text-zinc-500">Last updated February 25, 2025</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              ✕
            </button>
          </div>
          <div 
            className="prose prose-invert prose-sm overflow-y-auto pr-4 custom-scrollbar" 
            style={{ maxHeight: 'calc(100vh - 10rem)' }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-6">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <div className="flex items-center gap-3 mt-8 mb-4 group">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-fuchsia-500/50 group-hover:bg-fuchsia-500 transition-colors" />
                    <h2 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                      {children}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-medium text-fuchsia-400/90 hover:text-fuchsia-400 transition-colors mt-6 mb-3">
                    {children}
                  </h3>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 text-zinc-300 mb-6 pl-1">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2.5 text-sm group">
                    <span className="flex-shrink-0 text-[0.5rem] text-fuchsia-500/40 group-hover:text-fuchsia-500/60 transition-colors mt-1.5">
                      ◆
                    </span>
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