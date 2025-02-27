"use client";
import * as React from "react";
import { useState } from "react";

interface PatrolTaskData {
  content: string;
}

export default function PatrolTask() {
  const [formData, setFormData] = useState<PatrolTaskData>({
    content: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateBBCode = () => {
    return `[divbox=white]
[img]https://i.imgur.com/kWcSahD.png[/img]
[/divbox]

[divbox=#BF0000]
[size=200][color=#FFFFFF][centre][b]PATROL TASK[/b][/centre][/color][/size]
[/divbox]
[divbox=white]
[hr]
${formData.content}
[hr]
[/divbox]`;
  };

  const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent";

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Patrol Task</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Create a patrol task for patrol units to service while conducting their duties.
        </p>
      </div>

      <form className="p-8 space-y-10">
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter the patrol task content..."
          className={`${inputClass} min-h-[200px]`}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(generateBBCode());
            }}
            className="group relative flex-1 px-4 py-3 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white rounded-lg transition-all hover:from-fuchsia-400 hover:to-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer"></span>
            Copy BBCode
          </button>
          
          <a
            href="https://protech.gta.world/forum/posting.php?mode=post&f=19"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Create Post
          </a>
        </div>
      </form>
    </div>
  );
}