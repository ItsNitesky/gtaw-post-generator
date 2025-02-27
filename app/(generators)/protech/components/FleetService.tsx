"use client";
import * as React from "react";
import { useState } from "react";

interface FleetServiceData {
  employeeName: string;
  employeeRank: string;
  employeeBadge: string;
  unit: string;
  vehiclePlate: string;
  submissionDate: string;
  requestInfo: string;
}

export default function FleetService() {
  const [formData, setFormData] = useState<FleetServiceData>({
    employeeName: "",
    employeeRank: "",
    employeeBadge: "",
    unit: "",
    vehiclePlate: "",
    submissionDate: "",
    requestInfo: ""
  });

  const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateBBCode = () => {
    return `[divbox=#FFFFFF]
[centre][img]https://i.imgur.com/jeU6qK7.png[/img][/centre]
[size=175][b][centre][color=#31073a]TECHNICAL SERVICES DIVISION[/color][/centre][/b][/size]
[centre][sup][size=140][b][color=#31073a][font=Garton]FLEET SERVICES[/font][/color][/b][/size][/sup][/centre]
[hr]

[b]Employee Name:[/b] ${formData.employeeName}
[b]Employee Rank:[/b] ${formData.employeeRank}
[b]Employee Badge: [/b]${formData.employeeBadge}

[b]Vehicle(s) Plate: [/b]${formData.vehiclePlate}
[b]Date of Submission:[/b] ${formData.submissionDate}


[b]Nature of Request:[/b]
[quote]
${formData.requestInfo}
[/quote]

[/divbox]`;
  };

  const generateTopicTitle = () => {
    if (!formData.vehiclePlate || !formData.submissionDate) return "[FLEET SERVICE REQUEST]";
    
    return `[FLEET SERVICE REQUEST] ${formData.vehiclePlate} - ${formData.submissionDate} - ${formData.unit}`;
  };

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Fleet Service Request</h2>
        <p className="text-sm text-zinc-400">
          Submit a request for vehicle maintenance, repairs, or modifications. The Technical Services Division will review and process your request accordingly.
        </p>
      </div>

      <form className="p-8 space-y-10">
        {/* Employee Information */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Employee Information</h3>
            </div>
            <p className="text-sm text-zinc-400 ml-10">Your basic information for the service request.</p>
          </div>

          <div className="space-y-4 ml-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                placeholder="Employee Name"
                className={`${inputClass} transition-all duration-200 focus:translate-x-1 md:col-span-2`}
              />
              <input
                type="text"
                name="employeeRank"
                value={formData.employeeRank}
                onChange={handleChange}
                placeholder="Employee Rank"
                className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
              />
              <input
                type="text"
                name="employeeBadge"
                value={formData.employeeBadge}
                onChange={handleChange}
                placeholder="Badge #"
                className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
              />
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unit (e.g. PT20)"
                className={`${inputClass} transition-all duration-200 focus:translate-x-1 md:col-span-4`}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
              <h3>Vehicle Information</h3>
            </div>
            <p className="text-sm text-zinc-400 ml-10">Provide the vehicle plate number and date of submission.</p>
          </div>

          <div className="space-y-4 ml-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                placeholder="Vehicle Plate Number"
                className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
              />
              <input
                type="text"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={handleChange}
                placeholder="Date (DD/MMM/YYYY)"
                className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
              />
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
              <h3>Request Details</h3>
            </div>
            <p className="text-sm text-zinc-400 ml-10">Provide a detailed description of the service needed. Include any relevant information that might help the Technical Services Division process your request.</p>
          </div>

          <div className="space-y-4 ml-10">
            <textarea
              name="requestInfo"
              value={formData.requestInfo}
              onChange={handleChange}
              placeholder="Describe the nature of your service request. Include any specific issues, maintenance needs, or modifications required."
              className={`${inputClass} min-h-[150px]`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
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
              className="group relative flex-1 px-4 py-3 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white rounded-lg transition-all hover:from-fuchsia-400 hover:to-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap"
            >
              <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer"></span>
              Copy BBCode
            </button>
            
            <a
              href="https://protech.gta.world/forum/posting.php?mode=post&f=91"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Create Post
            </a>
          </div>
        </div>
      </form>
    </div>
  );
} 