"use client";
import * as React from "react";
import { useState } from "react";

interface PatrolTaskServicedData {
  isAssignment: boolean;
  fullName: string;
  rank: string;
  unit: string;
  otherMembers: string;
  time: string;
  date: string;
  report: string;
  evidence: string;
}

export default function PatrolTaskServiced() {
  const [formData, setFormData] = useState<PatrolTaskServicedData>({
    isAssignment: false,
    fullName: "",
    rank: "",
    unit: "",
    otherMembers: "",
    time: "",
    date: "",
    report: "",
    evidence: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateBBCode = () => {
    return `[divbox=#BF0000]
[size=200][color=#FFFFFF][centre][b]PATROL TASK SERVICED BY[/b][/centre][/color][/size]
[/divbox]
[divbox=white]
[hr]
Is this report related to an assignment?
[${formData.isAssignment ? 'cbc' : 'cb'}]Yes
[${!formData.isAssignment ? 'cbc' : 'cb'}]No
[hr]
[b]Full Name:[/b] ${formData.fullName}
[b]Rank:[/b] ${formData.rank}
[b]Unit:[/b] ${formData.unit}
[b]Other Unit Members:[/b] ${formData.otherMembers}
[hr]
[b]Time:[/b] ${formData.time}
[b]Date:[/b] ${formData.date}
[hr]
[b]Report:[/b] ${formData.report}

[b]Evidence:[/b] ${formData.evidence}
[hr]
[/divbox]`;
  };

  const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent";
  const checkboxClass = `
    appearance-none
    w-5 h-5 
    rounded 
    border-2 border-white/20 
    bg-white/5 
    checked:bg-gradient-to-r checked:from-fuchsia-500 checked:to-fuchsia-600
    checked:border-transparent
    hover:border-fuchsia-400
    focus:outline-none
    focus:ring-2 
    focus:ring-fuchsia-500/50 
    focus:ring-offset-0 
    transition-all
    cursor-pointer
    relative
    after:content-['✓']
    after:absolute
    after:text-white
    after:text-sm
    after:font-bold
    after:left-1/2
    after:top-1/2
    after:-translate-x-1/2
    after:-translate-y-1/2
    after:opacity-0
    checked:after:opacity-100
    after:transition-opacity
  `;

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Service Report</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Submit a service report for a completed patrol task.
        </p>
      </div>

      <form className="p-8 space-y-10">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Assignment Status</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">Indicate if this patrol task was part of an assignment.</p>
          </div>

          <label className="flex items-center gap-3 group cursor-pointer">
            <input
              type="checkbox"
              name="isAssignment"
              checked={formData.isAssignment}
              onChange={handleChange}
              className={checkboxClass}
            />
            <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
              This report is related to an assignment
            </span>
          </label>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
              <h3>Officer Information</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />
            <input
              type="text"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              placeholder="Rank"
              className={inputClass}
            />
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Unit"
              className={inputClass}
            />
            <input
              type="text"
              name="otherMembers"
              value={formData.otherMembers}
              onChange={handleChange}
              placeholder="Other Unit Members"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
              <h3>Date and Time</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time (HH:MM)"
              className={inputClass}
            />
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date (DD/MMM/YYYY)"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">4</span>
              <h3>Report Details</h3>
            </div>
          </div>

          <textarea
            name="report"
            value={formData.report}
            onChange={handleChange}
            placeholder="Enter your report details..."
            className={`${inputClass} min-h-[200px]`}
          />

          <input
            type="text"
            name="evidence"
            value={formData.evidence}
            onChange={handleChange}
            placeholder="Evidence (add pictures if needed)"
            className={inputClass}
          />
        </div>

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
            href="https://protech.gta.world/forum/viewforum.php?f=19"
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