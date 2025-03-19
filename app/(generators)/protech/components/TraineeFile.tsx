"use client";
import * as React from "react";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TraineeFileData {
  employeeId: string;
  employeeName: string;
  dateOfHire: string;
  // Induction details
  guidingOfficer: string;
  inductionDate: string;
  hasIdCard: boolean;
  hasEquipment: boolean;
  hasTour: boolean;
  // Guided Patrols
  guidedPatrols: Array<{
    date: string;
    duration: string;
    officer: string;
  }>;
  // Completed Assignments
  assignments: Array<{
    date: string;
    location: string;
    seniorOnScene: string;
  }>;
  // Licenses
  hasPfLicense: boolean;
  hasGuardCard: boolean;
  hasCcwLicense: boolean;
  // Evaluation
  writtenTestDate: string;
  writtenTestPoints: string;
  writtenTestInstructor: string;
  writtenTestPassed: boolean;
  patrolEvalDate: string;
  patrolEvalInstructor: string;
  patrolEvalPassed: boolean;
}

const formatDateTime = (dateTimeString: string) => {
  if (!dateTimeString) return '';

  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function TraineeFile() {
  const [formData, setFormData] = useState<TraineeFileData>({
    employeeId: "",
    employeeName: "",
    dateOfHire: "",
    guidingOfficer: "",
    inductionDate: "",
    hasIdCard: false,
    hasEquipment: false,
    hasTour: false,
    guidedPatrols: [
      { date: "", duration: "", officer: "" },
      { date: "", duration: "", officer: "" }
    ],
    assignments: [
      { date: "", location: "", seniorOnScene: "" },
      { date: "", location: "", seniorOnScene: "" }
    ],
    hasPfLicense: false,
    hasGuardCard: false,
    hasCcwLicense: false,
    writtenTestDate: "",
    writtenTestPoints: "",
    writtenTestInstructor: "",
    writtenTestPassed: false,
    patrolEvalDate: "",
    patrolEvalInstructor: "",
    patrolEvalPassed: false
  });

  const [showPatrols, setShowPatrols] = useState(true);
  const [showAssignments, setShowAssignments] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [section, index, field] = name.split('.');

      if (section === 'guidedPatrols' || section === 'assignments') {
        setFormData(prev => ({
          ...prev,
          [section]: prev[section].map((item, i) =>
            i === parseInt(index) ? { ...item, [field]: value } : item
          )
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    return;
  };

  const generateBBCode = () => {
    return `[divbox=#FFFFFF]
[img]https://i.imgur.com/kWcSahD.png[/img]

[divbox=#BF0000]
[centre][size=140][color=#FFFFFF][b]Trainee File - #${formData.employeeId} - ${formData.employeeName}[/b][/color][/size][/centre]
[/divbox]

[divboxl=transparent][size=90]In order to progress past the training stage in Protech Security Solutions, a trainee has to complete at least two satisfactory guided patrols with different non-probationary Security Officers or a Supervisor and above and complete at least two assignments with satisfactory results.
Once the trainee has completed their guided patrols they may request their patrol evaluation. In order for a trainee to request their written exam they must complete the two sections below including the passing of their patrol evaluation.
[/size][/divboxl]

[legend=#BF0000, Employee Details]
[size=115][b]Name[/b]: ${formData.employeeName}
[b]Employee ID[/b]: #${formData.employeeId}
[b]Date of Hire[/b]: ${formatDateTime(formData.dateOfHire)}
[/size][/legend]

[legend=#BF0000, Training Progress]
[size=115][b]Induction[/b] completed by ${formData.guidingOfficer} on ${formatDateTime(formData.inductionDate)}
[list]
[*] The trainee received an ID card/badge for access: [${formData.hasIdCard ? 'cbc' : 'cb'}]
[*] The trainee received the necessary equipment: [${formData.hasEquipment ? 'cbc' : 'cb'}]
[*] The trainee was given a tour around HQ: [${formData.hasTour ? 'cbc' : 'cb'}]
[/list]
[b]Guided Patrols[/b]:
[list]
${formData.guidedPatrols.map(patrol =>
  `[*] ${formatDateTime(patrol.date)} - Duration: ${patrol.duration} - ${patrol.officer}`
).join('\n')}
[/list]
[b]Completed Assignments[/b]:
[list]
${formData.assignments.map(assignment =>
  `[*] ${formatDateTime(assignment.date)} - ${assignment.location} - ${assignment.seniorOnScene}`
).join('\n')}
[/list]
[b]Attained Licenses[/b]:
[size=85][i]Mark applicable licenses with [cbc].[/i][/size]
[list]
[*] [${formData.hasPfLicense ? 'cbc' : 'cb'}] PF License
[*] [${formData.hasGuardCard ? 'cbc' : 'cb'}] Guard Card
[*] [${formData.hasCcwLicense ? 'cbc' : 'cb'}] CCW License
[/list][/size]
[/legend]

[legend=#BF0000, Trainee Evaluation]
[size=115]
[b]Written Test:[/b] [${formData.writtenTestPassed ? 'cbc' : 'cb'}] [b][color=#408000]Completed[/color][/b] / [${!formData.writtenTestPassed ? 'cbc' : 'cb'}] [b][color=#BF0000]Failed[/color][/b] on ${formatDateTime(formData.writtenTestDate)}
Points Scored: ${formData.writtenTestPoints}
Handling Instructor: ${formData.writtenTestInstructor}

[b]Patrol Evaluation:[/b] [${formData.patrolEvalPassed ? 'cbc' : 'cb'}] [b][color=#408000]Completed[/color][/b] / [${!formData.patrolEvalPassed ? 'cbc' : 'cb'}] [b][color=#BF0000]Failed[/color][/b] on ${formatDateTime(formData.patrolEvalDate)}
Handling Instructor: ${formData.patrolEvalInstructor}


[/size]
[/legend]

[/divbox]`;
  };

  const generateTopicTitle = () => {
    return `${formData.employeeName} #${formData.employeeId}`;
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

  const addGuidedPatrol = () => {
    setFormData(prev => ({
      ...prev,
      guidedPatrols: [...prev.guidedPatrols, { date: "", duration: "", officer: "" }]
    }));
  };

  const removeGuidedPatrol = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guidedPatrols: prev.guidedPatrols.filter((_, i) => i !== index)
    }));
  };

  const addAssignment = () => {
    setFormData(prev => ({
      ...prev,
      assignments: [...prev.assignments, { date: "", location: "", seniorOnScene: "" }]
    }));
  };

  const removeAssignment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      assignments: prev.assignments.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Trainee File</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Create and manage trainee documentation.
        </p>
      </div>

      <form className="p-8 space-y-10">
        {/* Employee Details */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Employee Details</h3>
            </div>
            <p className="text-sm text-zinc-500 ml-10">Basic information about the trainee.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Employee ID"
              className={inputClass}
            />
          </div>
          <input
            type="datetime-local"
            name="dateOfHire"
            value={formData.dateOfHire}
            onChange={handleChange}
            className={`${inputClass} ${!formData.dateOfHire && 'text-zinc-500'}`}
          />
        </div>

        {/* Induction Details */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
              <h3>Induction Details</h3>
            </div>
            <p className="text-sm text-zinc-500 ml-10">Information about the trainee's induction process.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="guidingOfficer"
              value={formData.guidingOfficer}
              onChange={handleChange}
              placeholder="Guiding Officer"
              className={inputClass}
            />
            <input
              type="datetime-local"
              name="inductionDate"
              value={formData.inductionDate}
              onChange={handleChange}
              className={`${inputClass} ${!formData.inductionDate && 'text-zinc-500'}`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <label className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                name="hasIdCard"
                checked={formData.hasIdCard}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                ID card/badge received
              </span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                name="hasEquipment"
                checked={formData.hasEquipment}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                Equipment received
              </span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                name="hasTour"
                checked={formData.hasTour}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                HQ tour completed
              </span>
            </label>
          </div>
        </div>

        {/* Guided Patrols */}
        <div className="space-y-6 relative">
          <button
            type="button"
            onClick={() => setShowPatrols(!showPatrols)}
            className="w-full flex items-center justify-between text-lg font-medium text-white/80 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
              <h3>Guided Patrols</h3>
              {showPatrols ? (
                <ChevronUpIcon className="w-5 h-5 ml-2" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              )}
            </div>
            <span className="text-sm text-fuchsia-400">{formData.guidedPatrols.length} patrols</span>
          </button>

          <div className={`space-y-6 ${showPatrols ? 'block' : 'hidden'}`}>
            <p className="mt-1 text-sm text-zinc-500 ml-10">Record of guided patrols completed by the trainee.</p>
            <div className="space-y-4">
              {formData.guidedPatrols.length === 0 ? (
                <p className="text-sm text-zinc-500 text-center py-4">No guided patrols recorded yet.</p>
              ) : (
                <div className="space-y-4 divide-y divide-white/10">
                  {formData.guidedPatrols.map((patrol, index) => (
                    <div key={index} className="relative grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 first:pt-0">
                      <button
                        type="button"
                        onClick={() => removeGuidedPatrol(index)}
                        className="absolute -right-2 -top-2 p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                      <div className="md:col-span-3 mb-2">
                        <span className="text-sm font-medium text-white/60">Patrol {index + 1}</span>
                      </div>
                      <input
                        type="datetime-local"
                        name={`guidedPatrols.${index}.date`}
                        value={patrol.date}
                        onChange={handleChange}
                        className={`${inputClass} ${!patrol.date && 'text-zinc-500'}`}
                      />
                      <input
                        type="text"
                        name={`guidedPatrols.${index}.duration`}
                        value={patrol.duration}
                        onChange={handleChange}
                        placeholder="Duration (H:MM)"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name={`guidedPatrols.${index}.officer`}
                        value={patrol.officer}
                        onChange={handleChange}
                        placeholder="Guiding Officer"
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addGuidedPatrol}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/10 rounded-lg text-white/60 hover:text-white/80 hover:border-white/20 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Add Patrol
              </button>
            </div>
          </div>
        </div>

        {/* Completed Assignments */}
        <div className="space-y-6 relative">
          <button
            type="button"
            onClick={() => setShowAssignments(!showAssignments)}
            className="w-full flex items-center justify-between text-lg font-medium text-white/80 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">4</span>
              <h3>Completed Assignments</h3>
              {showAssignments ? (
                <ChevronUpIcon className="w-5 h-5 ml-2" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              )}
            </div>
            <span className="text-sm text-fuchsia-400">{formData.assignments.length} assignments</span>
          </button>

          <div className={`space-y-6 ${showAssignments ? 'block' : 'hidden'}`}>
            <p className="mt-1 text-sm text-zinc-500 ml-10">Record of assignments completed by the trainee.</p>
            <div className="space-y-4">
              {formData.assignments.length === 0 ? (
                <p className="text-sm text-zinc-500 text-center py-4">No assignments completed yet.</p>
              ) : (
                <div className="space-y-4 divide-y divide-white/10">
                  {formData.assignments.map((assignment, index) => (
                    <div key={index} className="relative grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 first:pt-0">
                      <button
                        type="button"
                        onClick={() => removeAssignment(index)}
                        className="absolute -right-2 -top-2 p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                      <div className="md:col-span-3 mb-2">
                        <span className="text-sm font-medium text-white/60">Assignment {index + 1}</span>
                      </div>
                      <input
                        type="datetime-local"
                        name={`assignments.${index}.date`}
                        value={assignment.date}
                        onChange={handleChange}
                        className={`${inputClass} ${!assignment.date && 'text-zinc-500'}`}
                      />
                      <input
                        type="text"
                        name={`assignments.${index}.location`}
                        value={assignment.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name={`assignments.${index}.seniorOnScene`}
                        value={assignment.seniorOnScene}
                        onChange={handleChange}
                        placeholder="Senior on Scene"
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addAssignment}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/10 rounded-lg text-white/60 hover:text-white/80 hover:border-white/20 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Add Assignment
              </button>
            </div>
          </div>
        </div>

        {/* Licenses */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-medium text-white/80">
            <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">5</span>
            <h3>Licenses</h3>
          </div>
          <p className="mt-1 text-sm text-zinc-500 ml-10">Required and optional licenses for the trainee.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                name="hasPfLicense"
                checked={formData.hasPfLicense}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                PF License
              </span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                name="hasGuardCard"
                checked={formData.hasGuardCard}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                Guard Card
              </span>
            </label>
            <label className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                name="hasCcwLicense"
                checked={formData.hasCcwLicense}
                onChange={handleChange}
                className={checkboxClass}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                CCW License
              </span>
            </label>
          </div>
        </div>

        {/* Evaluation */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-medium text-white/80">
            <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">6</span>
            <h3>Evaluation</h3>
          </div>
          <p className="mt-1 text-sm text-zinc-500 ml-10">Results of written test and patrol evaluation.</p>

          {/* Written Test */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-white/60">Written Test</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="datetime-local"
                name="writtenTestDate"
                value={formData.writtenTestDate}
                onChange={handleChange}
                className={`${inputClass} ${!formData.writtenTestDate && 'text-zinc-500'}`}
              />
              <input
                type="text"
                name="writtenTestPoints"
                value={formData.writtenTestPoints}
                onChange={handleChange}
                placeholder="Points (x/24)"
                className={inputClass}
              />
              <input
                type="text"
                name="writtenTestInstructor"
                value={formData.writtenTestInstructor}
                onChange={handleChange}
                placeholder="Handling Instructor"
                className={inputClass}
              />
              <label className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  name="writtenTestPassed"
                  checked={formData.writtenTestPassed}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  Test Completed
                </span>
              </label>
            </div>
          </div>

          {/* Patrol Evaluation */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-white/60">Patrol Evaluation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="datetime-local"
                name="patrolEvalDate"
                value={formData.patrolEvalDate}
                onChange={handleChange}
                className={`${inputClass} ${!formData.patrolEvalDate && 'text-zinc-500'}`}
              />
              <input
                type="text"
                name="patrolEvalInstructor"
                value={formData.patrolEvalInstructor}
                onChange={handleChange}
                placeholder="Handling Instructor"
                className={inputClass}
              />
              <label className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  name="patrolEvalPassed"
                  checked={formData.patrolEvalPassed}
                  onChange={handleChange}
                  className={checkboxClass}
                />
                <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  Evaluation Completed
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Topic Title */}
        <div className="w-full p-4 bg-white/5 rounded-lg border border-white/10 mb-4">
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
            <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
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
      </form>
    </div>
  );
}