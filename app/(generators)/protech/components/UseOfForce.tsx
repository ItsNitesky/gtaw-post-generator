"use client";
import * as React from "react";
import { useState } from "react";

interface UseOfForceData {
  type: 'main' | 'supplemental';
  employeeName: string;
  badgeNumber: string;
  dateTime: string;
  location: string;
  leoPresent: boolean;
  leoDepartment: string;
  employeesInvolved: string[];
  witnesses: string[];
  narrative: string;
  evidence: string;
  signature: string;
}

export default function UseOfForce() {
  const [formData, setFormData] = useState<UseOfForceData>({
    type: 'main',
    employeeName: "",
    badgeNumber: "",
    dateTime: "",
    location: "",
    leoPresent: false,
    leoDepartment: "",
    employeesInvolved: [""],
    witnesses: [""],
    narrative: "",
    evidence: "",
    signature: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addListItem = (list: 'employeesInvolved' | 'witnesses') => {
    setFormData(prev => ({
      ...prev,
      [list]: [...prev[list], ""]
    }));
  };

  const updateListItem = (list: 'employeesInvolved' | 'witnesses', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [list]: prev[list].map((item, i) => i === index ? value : item)
    }));
  };

  const removeListItem = (list: 'employeesInvolved' | 'witnesses', index: number) => {
    setFormData(prev => ({
      ...prev,
      [list]: prev[list].filter((_, i) => i !== index)
    }));
  };

  const generateMainBBCode = () => {
    return `[divbox=white]
[img]https://i.imgur.com/kWcSahD.png[/img]
[/divbox]
[divbox=#BF0000]
[centre][size=150][color=#FFFFFF][b]USE OF FORCE REPORT[/b][/color][/size][/centre]
[/divbox]
[divbox=white]
[hr]
[centre][size=130][b]FILING INFORMATION[/b][/size][/centre]

[b]Full name:[/b] ${formData.employeeName}
[b]Badge number:[/b] ${formData.badgeNumber}
[b]Time and date of the incident:[/b] ${formData.dateTime}
[b]Location of the incident:[/b] ${formData.location}
[b]LEO's present:[/b] ${formData.leoPresent ? "Yes" : "No"}
${formData.leoPresent ? `[i]If [b]Yes[/b], state which department:[/i] ${formData.leoDepartment}` : ""}

[b]Employees Involved:[/b] (Only list employees who used Less-Than-Lethal or Lethal Force.)
[list]
${formData.employeesInvolved.map(emp => `[*] ${emp}`).join('\n')}
[/list]

[b]Witnesses:[/b]
[list]
${formData.witnesses.map(witness => `[*] ${witness}`).join('\n')}
[/list]

[hr]
[centre][size=130][b]SUMMARY OF THE INCIDENT[/b][/size][/centre]

[b]Narrative: [/b] ${formData.narrative}

[hr]
[centre][size=130][b]EVIDENCE[/b][/size][/centre]

[b]Evidence of Incident:[/b] ${formData.evidence}

[hr]

[b]Your signature:[/b] ${formData.signature}
[/divbox]`;
  };

  const generateSupplementalBBCode = () => {
    return `[divbox=white]
[img]https://i.imgur.com/kWcSahD.png[/img]
[/divbox]
[divbox=#BF0000]
[centre][size=150][color=#FFFFFF][b]SUPPLEMENTAL USE OF FORCE REPORT[/b][/color][/size][/centre]
[/divbox]
[divbox=white]
[hr]
[centre][size=130][b]FILING INFORMATION[/b][/size][/centre]

[b]Full name:[/b] ${formData.employeeName}
[b]Badge number:[/b] ${formData.badgeNumber}
[b]Time and date of the incident:[/b] ${formData.dateTime}
[b]Location of the incident:[/b] ${formData.location}

[hr]
[centre][size=130][b]SUMMARY OF THE INCIDENT[/b][/size][/centre]

[b]Narrative: [/b] ${formData.narrative}

[hr]

[b]Your signature:[/b] ${formData.signature}
[/divbox]`;
  };

  const generateBBCode = () => {
    return formData.type === 'main' 
      ? generateMainBBCode()
      : generateSupplementalBBCode();
  };

  const generateTopicTitle = () => {
    if (!formData.employeeName || !formData.dateTime) return "";
    return formData.type === 'main' 
      ? `Use of Force Report - ${formData.employeeName}`
      : `Supplemental Use of Force Report - ${formData.employeeName}`;
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
        <h2 className="text-2xl font-semibold text-white mb-2">Use of Force Report Form</h2>
        <p className="text-sm text-zinc-400 mb-4">
          When force is used during an incident, it's crucial to document it properly. This report helps establish the circumstances, justification, and outcome of the force used. Accurate documentation protects both the company and the employee while ensuring transparency and accountability.
        </p>
        
        <div className="flex items-center gap-4 mt-6 p-4 bg-black/20 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="main"
              checked={formData.type === 'main'}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'main' | 'supplemental' }))}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded-full border-2 border-white/20 peer-checked:border-fuchsia-500 peer-checked:bg-fuchsia-500"></div>
            <span className="text-sm text-white/70 peer-checked:text-white">Main Use of Force Report</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="supplemental"
              checked={formData.type === 'supplemental'}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'main' | 'supplemental' }))}
              className="sr-only peer"
            />
            <div className="w-4 h-4 rounded-full border-2 border-white/20 peer-checked:border-fuchsia-500 peer-checked:bg-fuchsia-500"></div>
            <span className="text-sm text-white/70 peer-checked:text-white">Supplemental Report</span>
          </label>
        </div>
      </div>

      <form className="p-8 space-y-10">
        {/* Filing Information - Always show */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Filing Information</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">
              This section includes your basic information, the location of the incident, and the date & time of when the incident occurred.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />
            <input
              type="text"
              name="badgeNumber"
              value={formData.badgeNumber}
              onChange={handleChange}
              placeholder="Badge Number"
              className={inputClass}
            />
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
              placeholder="Location of Incident"
              className={inputClass}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="leoPresent"
                checked={formData.leoPresent}
                onChange={handleChange}
                className={checkboxClass}
              />
              <label className="text-sm text-white/70 group-hover:text-white/90 transition-colors">LEO's Present</label>
            </div>
            
            {formData.leoPresent && (
              <input
                type="text"
                name="leoDepartment"
                value={formData.leoDepartment}
                onChange={handleChange}
                placeholder="Which Department?"
                className={inputClass}
              />
            )}
          </div>
        </div>

        {/* Only show these sections for main report */}
        {formData.type === 'main' && (
          <>
            {/* Involved Parties */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
                  <h3>Involved Parties</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 ml-10">
                  It is important that you provide all individuals involved in the use of force, even if they helped simply contain the scene. You must also list all witnesses to the use of force, as they are able to provide vital information to investigators should the need to reach out arise.
                </p>
              </div>

              {/* Employees Involved */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80">Employees Involved (Only list employees who used Less-Than-Lethal or Lethal Force)</label>
                {formData.employeesInvolved.map((emp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={emp}
                      onChange={(e) => updateListItem('employeesInvolved', index, e.target.value)}
                      placeholder="Employee Name"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem('employeesInvolved', index)}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem('employeesInvolved')}
                  className="text-fuchsia-400 hover:text-fuchsia-300 text-sm"
                >
                  + Add Employee
                </button>
              </div>

              {/* Witnesses */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80">Witnesses</label>
                {formData.witnesses.map((witness, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={witness}
                      onChange={(e) => updateListItem('witnesses', index, e.target.value)}
                      placeholder="Witness Name"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem('witnesses', index)}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem('witnesses')}
                  className="text-fuchsia-400 hover:text-fuchsia-300 text-sm"
                >
                  + Add Witness
                </button>
              </div>
            </div>

            {/* Evidence */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
                  <h3>Evidence</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 ml-10">
                  Evidence can be considered roleplay lines of what Dashcam or CCTV would realistically see, screenshots of your game as if they're still images of CCTV/Dashcam footage, or an uploaded clip to either YouTube or Streamable. Remember, Evidence is considered In Character, so you must realistically have the evidence provided in order for it to be included in this report.
                </p>
              </div>
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleChange}
                placeholder="Attach the dashcam footage, CCTV footage, or photos taken during the incident here..."
                className={`${inputClass} min-h-[100px]`}
              />
            </div>
          </>
        )}

        {/* Narrative - Always show but with different labels */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">
                {formData.type === 'main' ? '4' : '2'}
              </span>
              <h3>Summary of the Incident</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">
              {formData.type === 'main' 
                ? "Please provide a detailed narrative of the incident, including the actions taken by the involved parties and any relevant details. This will be used to help investigators understand the incident and the events that occurred during said incident."
                : "Please provide a supplemental detailed narrative of the incident, including the actions taken by the involved parties and any relevant details. This will be used to help investigators understand the incident and the events that occurred during said incident."}
            </p>
          </div>
          <textarea
            name="narrative"
            value={formData.narrative}
            onChange={handleChange}
            placeholder="Write the narrative of the report here in chronological order..."
            className={`${inputClass} min-h-[200px]`}
          />
        </div>

        {/* Signature */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">
                {formData.type === 'main' ? '5' : '3'}
              </span>
              <h3>Signature</h3>
            </div>
            <p className="mt-1 text-sm text-zinc-500 ml-10">
              By signing your name, you hereby certify that the attached text is a true and complete explanation of the incident and the events that occurred during said incident. You also acknowledge that providing false statements may result in disciplinary action, which may include termination of employment.
            </p>
          </div>
          <input
            type="text"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            placeholder="Your Signature"
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
        </div>
      </form>
    </div>
  );
} 