"use client";
import * as React from "react";
import { useState } from "react";
import type { FormType, IncidentFormData } from '../page';
// Move all the incident report form logic and UI here 

interface IncidentReportProps {
  formData: IncidentFormData;
  setFormData: (data: IncidentFormData) => void;
  onSwitchForm: (form: FormType) => void;
}

export default function IncidentReport({ formData, setFormData, onSwitchForm }: IncidentReportProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const generateBBCode = () => {
    return `[divbox=#FFFFFF]
[img]https://i.imgur.com/kWcSahD.png[/img]
[/divbox]
[divbox=#BF0000]
[b][size=200][color=#FFFFFF][centre]Incident Report[/centre][/color][/size][/b]
[/divbox]
[divbox=#FFFFFF]

[b]Employee Rank and Full Name:[/b] ${formData.employeeName}
[b]Patrol Unit:[/b] ${formData.patrolUnit}
[b]Date and Time of the Incident:[/b] ${formData.dateTime}
[b]Location of the Incident:[/b] ${formData.location}

[hr]

[b]Situation:[/b]
[${formData.situation === "Burglary" ? "x" : " "}] Burglary
[${formData.situation === "Vandalism" ? "x" : " "}] Vandalism
[${formData.situation === "Loitering" ? "x" : " "}] Loitering
[${formData.situation === "Robbery" ? "x" : " "}] Robbery
[${formData.situation === "Distress Call" ? "x" : " "}] Distress Call
[${formData.situation === "Trespassing" ? "x" : " "}] Trespassing
[${formData.situation === "Security Breach" ? "x" : " "}] Security Breach
[${formData.situation === "other" ? "x" : " "}] Other (specify): ${formData.situation === "other" ? formData.situationOther : ""}

[hr]

[b]Incident Report:[/b]
${formData.incidentReport}

[b]Photo Evidence (If applicable):[/b] ${formData.photoEvidence}

[hr]

[b]Actions Taken:[/b] 
[${formData.ownerOnScene ? "x" : " "}] Owner On Scene
[${formData.ownerNotified ? "x" : " "}] Owner Notified via SMS/Call
[${formData.lawEnforcementNotified ? "x" : " "}] Law Enforcement Notified
[${formData.lawEnforcementOnScene ? "x" : " "}] Law Enforcement On Scene

[hr]

[b]Non-Lethal Deployed by ProTech Employee:[/b]
[${formData.nonLethalDeployed ? "x" : " "}] Yes (Fill [url=https://protech.gta.world/forum/viewtopic.php?t=924]Use of Force Report[/url] in a separate topic)
[${!formData.nonLethalDeployed ? "x" : " "}] No

[b]Lethal Deployed by ProTech Employee:[/b]
[${formData.lethalDeployed ? "x" : " "}] Yes (Fill [url=https://protech.gta.world/forum/viewtopic.php?t=924]Use of Force Report[/url] in a separate topic)
[${!formData.lethalDeployed ? "x" : " "}] No

[b]Signature:[/b]
${formData.signature}
[/divbox]`;
  };

  const generateTopicTitle = () => {
    if (!formData.location || !formData.dateTime || !formData.patrolUnit) return "";
    
    const address = formData.location.split(',')[0].trim();
    
    // Format the date from the datetime-local input
    const date = new Date(formData.dateTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-GB', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    const time = date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const formattedDateTime = `${day}/${month}/${year}, ${time}`;

    return `${address} [${formattedDateTime}, ${formData.patrolUnit}]`;
  };

  const inputClass = "w-full px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-colors";

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
        <h2 className="text-2xl font-semibold text-white mb-2">Incident Report Form</h2>
        <p className="text-sm text-zinc-400 mb-4">
          As a security officer, incident reports are crucial. They're our go-to tool for documenting security-related incidents. These reports tell us what went down, who was involved, and the actions we took. When we fill them out with care, we make sure we've got the right information, which is a big help when we need to investigate, deal with legal matters, or make insurance claims.
        </p>
      </div>

      <form className="p-8 space-y-10">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Basic Information</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">This section includes your basic information, the location of the incident, and the date & time of when the incident occurred. </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              placeholder="Employee Rank and Full Name"
              className={inputClass}
            />
            <input
              type="text"
              name="patrolUnit"
              value={formData.patrolUnit}
              onChange={handleChange}
              placeholder="Patrol Unit / Callsign"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className={`${inputClass} ${!formData.dateTime && 'text-zinc-500'}`}
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location of the Incident"
              className={inputClass}
            />
          </div>
        </div>

        {/* Situation Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
              <h3>Situation Details</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">Select the type of incident that occurred from the pre-defined list of incidents, then provide a brief narrative of what happened.</p>
          </div>
          <div className="relative">
            <select
              name="situation"
              value={formData.situation}
              onChange={handleChange}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled>Select a situation</option>
              <option value="Burglary" className="bg-zinc-800 text-white">Burglary</option>
              <option value="Vandalism" className="bg-zinc-800 text-white">Vandalism</option>
              <option value="Loitering" className="bg-zinc-800 text-white">Loitering</option>
              <option value="Robbery" className="bg-zinc-800 text-white">Robbery</option>
              <option value="Distress Call" className="bg-zinc-800 text-white">Distress Call</option>
              <option value="Trespassing" className="bg-zinc-800 text-white">Trespassing</option>
              <option value="Security Breach" className="bg-zinc-800 text-white">Security Breach</option>
              <option value="other" className="bg-zinc-800 text-white">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {formData.situation === 'other' && (
            <input
              type="text"
              name="situationOther"
              value={formData.situationOther}
              onChange={handleChange}
              placeholder="Specify other situation"
              className={inputClass}
            />
          )}

          <textarea
            name="incidentReport"
            value={formData.incidentReport}
            onChange={handleChange}
            placeholder="Incident Report Narrative"
            rows={4}
            className={`${inputClass} resize-none`}
          />

          <input
            type="text"
            name="photoEvidence"
            value={formData.photoEvidence}
            onChange={handleChange}
            placeholder="Photo Evidence if Applicable (Imgur Link)"
            className={inputClass}
          />
        </div>

        {/* Actions Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
              <h3>Actions Taken</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">Indicate what notifications you made during the incident and if the owner was on scene of the incident.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex items-center space-x-3 group cursor-pointer">
              <input
                type="checkbox"
                name="ownerOnScene"
                checked={formData.ownerOnScene}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Owner On Scene</span>
            </label>
            <label className="flex items-center space-x-3 group cursor-pointer">
              <input
                type="checkbox"
                name="ownerNotified"
                checked={formData.ownerNotified}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Owner Notified via SMS/Call</span>
            </label>
            <label className="flex items-center space-x-3 group cursor-pointer">
              <input
                type="checkbox"
                name="lawEnforcementNotified"
                checked={formData.lawEnforcementNotified}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Law Enforcement Notified</span>
            </label>
            <label className="flex items-center space-x-3 group cursor-pointer">
              <input
                type="checkbox"
                name="lawEnforcementOnScene"
                checked={formData.lawEnforcementOnScene}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Law Enforcement On Scene</span>
            </label>
          </div>
        </div>

        {/* Force Used Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">4</span>
              <h3>Force Used</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">Specify if you used non-lethal or lethal force during the incident. If no force was used, leave this section blank.</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <label className="flex items-center space-x-3 group cursor-pointer">
              <input
                type="checkbox"
                name="nonLethalDeployed"
                checked={formData.nonLethalDeployed}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Non-Lethal Force Used</span>
            </label>
            <label className="flex items-center space-x-3 group cursor-pointer">
              <input
                type="checkbox"
                name="lethalDeployed"
                checked={formData.lethalDeployed}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Lethal Force Used</span>
            </label>

            {/* Alert Box - Shows when either force option is checked */}
            {(formData.nonLethalDeployed || formData.lethalDeployed) && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 animate-fadeIn">
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-400">Important Notice</p>
                  <p className="text-sm text-zinc-300 mt-1">
                    You must fill out a{' '}
                    <button 
                      onClick={() => onSwitchForm("uof")}
                      className="text-red-400 hover:text-red-300 transition-colors underline focus:outline-none font-medium"
                    >
                      Use of Force Report
                    </button>
                    {' '}in a separate topic!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">5</span>
              <h3>Signature</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">By signing your name, you hereby certify that the attached text is a true and complete explanation of the incident and the events that occurred during said incident. You also acknowledge that providing false statements may result in disciplinary action, which may include termination of employment.</p>
          </div>
          <input
            type="text"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            placeholder="Signature (Type Firstname Lastname)"
            className={inputClass}
          />
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Topic Title */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-zinc-400">Topic Title</p>
              <button 
                onClick={() => navigator.clipboard.writeText(generateTopicTitle())}
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
        </div>
      </form>
    </div>
  );
} 