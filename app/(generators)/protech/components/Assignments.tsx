"use client";
import * as React from "react";
import { useState } from "react";

interface AssignmentsData {
  location: string;
  date: string;
  time: string;
  length: string;
  numOfficers: string;
  payPerHour: string;
  uniformStyle: string;
  eomPoints: string;
  clientNames: string;
  clientPhones: string;
  additionalInfo: string;
}

export default function Assignments() {
  const [formData, setFormData] = useState<AssignmentsData>({
    location: "",
    date: "",
    time: "",
    length: "",
    numOfficers: "",
    payPerHour: "",
    uniformStyle: "",
    eomPoints: "",
    clientNames: "",
    clientPhones: "",
    additionalInfo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateBBCode = () => {
    return `[divbox=#BF0000]

[centre][img]https://i.imgur.com/kWcSahD.png[/img]

[b][size=200][color=#000000]ASSIGNMENT[/color][/size][/b][/centre]
[hr]
[divbox=#FFFFFF]

[b]Location:[/b] ${formData.location}
[b]Date:[/b] ${formData.date}
[b]Time:[/b] ${formData.time}
[b]Length:[/b] ${formData.length}
[hr]
[b]Number of Officers/Guards:[/b] ${formData.numOfficers}
[b]Pay per Hour:[/b] ${formData.payPerHour}
[b]Uniform Style:[/b] ${formData.uniformStyle}
[b]Points Toward [url=https://protech.gta.world/forum/viewtopic.php?t=61]Employee of the Month:[/url][/b] ${formData.eomPoints}
[hr]
[b]Client Name(s):[/b] ${formData.clientNames}
[b]Client Phone(s):[/b] ${formData.clientPhones}
[hr]
[b]Additional Information:[/b]
${formData.additionalInfo}

[/divbox]

[hr]
[right][color=#000000][i][b]ProTech Security Solutions
Marathon Avenue, Del Perro, Los Santos[/b][/i][/color][/right]

[/divbox]

[code][divbox=#FFFFFF]I, FirstName LastName, would like to sign up and will be able to attend the assignment.[/divbox]`;
  };

  const generateTopicTitle = () => {
    if (!formData.location || !formData.date) return "";
    return `Assignment - ${formData.location} (${formData.date})`;
  };

  const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent";

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Assignment Form</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Create an assignment post for patrol officers to sign up for. Please ensure all details are accurate and complete.
        </p>
      </div>

      <form className="p-8 space-y-10">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Assignment Details</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">
              Basic information about the assignment including location, timing, and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
              className={inputClass}
            />
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time"
              className={inputClass}
            />
            <input
              type="text"
              name="length"
              value={formData.length}
              onChange={handleChange}
              placeholder="Length"
              className={inputClass}
            />
            <input
              type="text"
              name="numOfficers"
              value={formData.numOfficers}
              onChange={handleChange}
              placeholder="Number of Officers/Guards"
              className={inputClass}
            />
            <input
              type="text"
              name="payPerHour"
              value={formData.payPerHour}
              onChange={handleChange}
              placeholder="Pay per Hour (min $4,000)"
              className={inputClass}
            />
            <input
              type="text"
              name="uniformStyle"
              value={formData.uniformStyle}
              onChange={handleChange}
              placeholder="Uniform Style (Formal/Patrol/Smart Casual)"
              className={inputClass}
            />
            <input
              type="text"
              name="eomPoints"
              value={formData.eomPoints}
              onChange={handleChange}
              placeholder="Points Toward Employee of the Month"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
              <h3>Client Information</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <input
              type="text"
              name="clientNames"
              value={formData.clientNames}
              onChange={handleChange}
              placeholder="Client Name(s)"
              className={inputClass}
            />
            <input
              type="text"
              name="clientPhones"
              value={formData.clientPhones}
              onChange={handleChange}
              placeholder="Client Phone(s)"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
              <h3>Additional Information</h3>
            </div>
          </div>

          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Enter any additional information about the assignment..."
            className={`${inputClass} min-h-[100px]`}
          />
        </div>

        {/* Topic Title */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-zinc-400">Topic Title</p>
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(generateTopicTitle());
              }}
              className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
          <p className="text-sm text-white font-mono">{generateTopicTitle()}</p>
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
            href="https://protech.gta.world/forum/posting.php?mode=post&f=17"
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