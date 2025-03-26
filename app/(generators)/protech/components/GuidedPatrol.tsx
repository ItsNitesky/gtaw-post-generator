"use client";
import * as React from "react";
import { useState } from "react";
import { XMarkIcon, PlusIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";

interface EvaluationRating {
  // Appearance
  generalAppearance: number | null;
  communicationSkills: number | null;
  // Attitude
  acceptanceFeedback: number | null;
  attitudeJob: number | null;
  // Knowledge
  departmentHandbooks: number | null;
  radioCodes: number | null;
  computerAidedDispatch: number | null;
  patrolTracking: number | null;
  // Performance
  drivingSkill: number | null;
  reportWriting: number | null;
  propertyInspection: number | null;
  // Relationships
  withColleagues: number | null;
  withCitizens: number | null;
  // Roleplay Quality
  characterPortrayal: number | null;
  oocDemeanor: number | null;
  roleplayQuality: number | null;
}

interface Incident {
  time: string;
  description: string;
}

interface GuidedPatrolData {
  traineeName: string;
  traineeBadge: string;
  instructorName: string;
  instructorBadge: string;
  incidents: Incident[];
  ratings: EvaluationRating;
  date: string;
}

const formatDateTime = (dateTimeString: string) => {
  if (!dateTimeString) return '';

  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default function GuidedPatrol() {
  const [formData, setFormData] = useState<GuidedPatrolData>({
    traineeName: "",
    traineeBadge: "",
    instructorName: "",
    instructorBadge: "",
    incidents: [
      { time: "", description: "" }
    ],
    ratings: {
      generalAppearance: null,
      communicationSkills: null,
      acceptanceFeedback: null,
      attitudeJob: null,
      departmentHandbooks: null,
      radioCodes: null,
      computerAidedDispatch: null,
      patrolTracking: null,
      drivingSkill: null,
      reportWriting: null,
      propertyInspection: null,
      withColleagues: null,
      withCitizens: null,
      characterPortrayal: null,
      oocDemeanor: null,
      roleplayQuality: null
    },
    date: ""
  });

  const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIncidentTimeChange = (index: number, time: string) => {
    setFormData(prev => ({
      ...prev,
      incidents: prev.incidents.map((incident, i) =>
        i === index ? { ...incident, time } : incident
      )
    }));
  };

  const handleIncidentChange = (index: number, description: string) => {
    setFormData(prev => ({
      ...prev,
      incidents: prev.incidents.map((incident, i) =>
        i === index ? { ...incident, description } : incident
      )
    }));
  };

  const handleRatingChange = (field: keyof EvaluationRating, value: number | null) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [field]: value
      }
    }));
  };

  const addIncident = () => {
    setFormData(prev => ({
      ...prev,
      incidents: [...prev.incidents, { time: "", description: "" }]
    }));
  };

  const removeIncident = (index: number) => {
    setFormData(prev => ({
      ...prev,
      incidents: prev.incidents.filter((_, i) => i !== index)
    }));
  };

  const generateBBCode = () => {
    const getRatingSymbol = (value: number | null) => {
      return `[td]${value === 1 ? '[cbc][/cbc]' : '[cb][/cb]'}[/td]` +
             `[td]${value === 2 ? '[cbc][/cbc]' : '[cb][/cb]'}[/td]` +
             `[td]${value === 3 ? '[cbc][/cbc]' : '[cb][/cb]'}[/td]` +
             `[td]${value === 4 ? '[cbc][/cbc]' : '[cb][/cb]'}[/td]` +
             `[td]${value === null ? '[cbc][/cbc]' : '[cb][/cb]'}[/td]`;
    };

    return `[divbox=white]
[img]https://i.imgur.com/kWcSahD.png[/img]
[hr]
[b][size=150][centre]TRAINEES GUIDED PATROL PROGRAM[/centre][/size][/b]
[centre][b][color=#BF0000][sup][b]INTRODUCTORY AND ORIENTATION REPORT[/b][/sup][/centre]

[centre][table]
[tr]
[td][color=#000000][b]TRAINEE SECURITY OFFICER[/b][/color]
[td][color=#000000][b]BADGE NO.[/b][/color]
[td][b]FIELD TRAINING INSTRUCTOR[/b]
[td] [b]BADGE NO.[/b]
[/tr]

[tr]
[td] ${formData.traineeName}
[td] ${formData.traineeBadge}
[td] ${formData.instructorName}
[td] ${formData.instructorBadge}
[/tr]
[/table][/centre]
[space]ss[/space]

[centre][divbox=#BF0000][b][color=#FFFFFF]INCIDENTS/TASKS[/color][/b][/divbox][/centre]

${formData.incidents.map(incident => incident.time || incident.description ? `[list]At ${incident.time} - ${incident.description}[/list]` : '').join('\n')}

[centre][divbox=#BF0000][b][color=#FFFFFF]PATROL EVALUATION[/color][/b][/divbox][/centre]

[b] [color=red](!)[/color] Use the following scale to rate the trainee's performance, starting from (1) BELOW STANDARD, (2) NEEDS IMPROVEMENT, (3) STANDARD, or (4) ABOVE STANDARD. Check NOT OBSERVED (N/O) if the behavior was not observed.[/b]
[space]

[table]
[tr]
[td][b][font=Arial]APPEARANCE[/font][/b] [color=white]---------------------------------------------------------------------------------------------[/color]
[td][b]1[/b][/td][td][b]2[/b][/td][td][b]3[/b][/td][td][b]4[/b][/td][td][b]N/O[/b][/td]
[/tr]
[tr]
[td]1. General Appearance[/td]${getRatingSymbol(formData.ratings.generalAppearance)}
[/tr]
[tr]
[td]2. Communication Skills[/td]${getRatingSymbol(formData.ratings.communicationSkills)}
[/tr]

[tr]
[td][b][font=Arial]ATTITUDE[/font][/b]
[td][b]1[/b][/td][td][b]2[/b][/td][td][b]3[/b][/td][td][b]4[/b][/td][td][b]N/O[/b][/td]
[/tr]
[tr]
[td]3. Acceptance of Feedback[/td]${getRatingSymbol(formData.ratings.acceptanceFeedback)}
[/tr]
[tr]
[td]4. Attitude towards the Job[/td]${getRatingSymbol(formData.ratings.attitudeJob)}
[/tr]

[tr]
[td][b][font=Arial]KNOWLEDGE[/font][/b]
[td][b]1[/b][/td][td][b]2[/b][/td][td][b]3[/b][/td][td][b]4[/b][/td][td][b]N/O[/b][/td]
[/tr]
[tr]
[td]5. Department Handbooks & Policies[/td]${getRatingSymbol(formData.ratings.departmentHandbooks)}
[/tr]
[tr]
[td]6. Department Radio Codes[/td]${getRatingSymbol(formData.ratings.radioCodes)}
[/tr]
[tr]
[td]7. Computer Aided Dispatch Utilization[/td]${getRatingSymbol(formData.ratings.computerAidedDispatch)}
[/tr]
[tr]
[td]8. Patrol Tracking System[/td]${getRatingSymbol(formData.ratings.patrolTracking)}
[/tr]

[tr]
[td][b][font=Arial]PERFORMANCE[/font][/b]
[td][b]1[/b][/td][td][b]2[/b][/td][td][b]3[/b][/td][td][b]4[/b][/td][td][b]N/O[/b][/td]
[/tr]
[tr]
[td]9. Driving Skill[/td]${getRatingSymbol(formData.ratings.drivingSkill)}
[/tr]
[tr]
[td]10. Report Writing[/td]${getRatingSymbol(formData.ratings.reportWriting)}
[/tr]
[tr]
[td]11. Property Inspection[/td]${getRatingSymbol(formData.ratings.propertyInspection)}
[/tr]

[tr]
[td][b][font=Arial]RELATIONSHIPS[/font][/b]
[td][b]1[/b][/td][td][b]2[/b][/td][td][b]3[/b][/td][td][b]4[/b][/td][td][b]N/O[/b][/td]
[/tr]
[tr]
[td]12. With Colleagues[/td]${getRatingSymbol(formData.ratings.withColleagues)}
[/tr]
[tr]
[td]13. With Citizens[/td]${getRatingSymbol(formData.ratings.withCitizens)}
[/tr]

[tr]
[td](([b][font=Arial]ROLEPLAY QUALITY[/font][/b]))
[td][b]1[/b][/td][td][b]2[/b][/td][td][b]3[/b][/td][td][b]4[/b][/td][td][b]N/O[/b][/td]
[/tr]
[tr]
[td]14. Character Portrayal[/td]${getRatingSymbol(formData.ratings.characterPortrayal)}
[/tr]
[tr]
[td]15. Out-of-Character Demeanor[/td]${getRatingSymbol(formData.ratings.oocDemeanor)}
[/tr]
[tr]
[td]16. Roleplay Quality[/td]${getRatingSymbol(formData.ratings.roleplayQuality)}
[/tr]
[/table]

[divbox=#BF0000]
[centre][color=white][b][size=120]TRAINING INSTRUCTOR ACKNOWLEDGMENT[/size][/b][/color][/centre]
[/divbox]

[legend=#BF0000, Training Instructor Signature]
[size=110]I, ${formData.instructorName}, have completed a Guided Patrol with Trainee Security Officer ${formData.traineeName} on ${formatDateTime(formData.date)}.
I hereby affirm that the aforementioned evaluation scale accurately reflects the performance of the trainee security officer.[/size]
[/legend]
[/divbox]`;
  };

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Guided Patrol Report</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Document trainee performance during guided patrols.
        </p>
      </div>

      <form className="p-8 space-y-10">
        {/* Personnel Information */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Personnel Information</h3>
            </div>
            <p className="text-sm text-zinc-500 ml-10">Details of the trainee and instructor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="traineeName"
              value={formData.traineeName}
              onChange={handleChange}
              placeholder="Trainee Name"
              className={inputClass}
            />
            <input
              type="text"
              name="traineeBadge"
              value={formData.traineeBadge}
              onChange={handleChange}
              placeholder="Trainee Badge #"
              className={inputClass}
            />
            <input
              type="text"
              name="instructorName"
              value={formData.instructorName}
              onChange={handleChange}
              placeholder="Instructor Name"
              className={inputClass}
            />
            <input
              type="text"
              name="instructorBadge"
              value={formData.instructorBadge}
              onChange={handleChange}
              placeholder="Instructor Badge #"
              className={inputClass}
            />
          </div>
        </div>

        {/* Incidents/Tasks */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
              <h3>Incidents/Tasks</h3>
            </div>
            <p className="text-sm text-zinc-500 ml-10">Record of incidents and tasks during the patrol.</p>
          </div>

          <div className="space-y-4">
            {formData.incidents.map((incident, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-24">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-zinc-400">At</span>
                    <input
                      type="text"
                      value={incident.time}
                      onChange={(e) => handleIncidentTimeChange(index, e.target.value)}
                      placeholder="00:00"
                      className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white text-sm text-center placeholder:text-zinc-500"
                    />
                  </div>
                </div>
                <textarea
                  value={incident.description}
                  onChange={(e) => handleIncidentChange(index, e.target.value)}
                  placeholder="Type here what happened, what did the trainee do, and how everything was concluded."
                  className={`${inputClass} min-h-[80px]`}
                />
                <button
                  type="button"
                  onClick={() => removeIncident(index)}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-red-400"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIncident}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/10 rounded-lg text-white/60 hover:text-white/80 hover:border-white/20 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Incident
            </button>
          </div>
        </div>

        {/* Evaluation */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
              <h3>Patrol Evaluation</h3>
            </div>
            <p className="text-sm text-zinc-500 ml-10">Rate the trainee's performance in various areas.</p>
          </div>

          {/* Rating Scale Info */}
          <div className="p-6 bg-gradient-to-b from-white/5 to-white/[0.02] rounded-lg border border-white/10 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <ShieldExclamationIcon className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-sm text-white/80">
                Use the following scale to rate the trainee's performance:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg min-w-[160px] flex-1 basis-[160px]">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-fuchsia-500/10 rounded text-fuchsia-400 font-medium text-sm">1</span>
                <span className="text-xs text-white/70">BELOW STANDARD</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg min-w-[160px] flex-1 basis-[160px]">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-fuchsia-500/10 rounded text-fuchsia-400 font-medium text-sm">2</span>
                <span className="text-xs text-white/70">NEEDS IMPROVEMENT</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg min-w-[160px] flex-1 basis-[160px]">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-fuchsia-500/10 rounded text-fuchsia-400 font-medium text-sm">3</span>
                <span className="text-xs text-white/70">STANDARD</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg min-w-[160px] flex-1 basis-[160px]">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-fuchsia-500/10 rounded text-fuchsia-400 font-medium text-sm">4</span>
                <span className="text-xs text-white/70">ABOVE STANDARD</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg min-w-[160px] flex-1 basis-[160px]">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-fuchsia-500/10 rounded text-fuchsia-400 font-medium text-sm">N/O</span>
                <span className="text-xs text-white/70">NOT OBSERVED</span>
              </div>
            </div>
          </div>

          {/* Rating Tables */}
          <div className="space-y-8">
            {/* Appearance */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Appearance</h4>
              <div className="grid gap-4">
                <RatingRow
                  label="General Appearance"
                  field="generalAppearance"
                  value={formData.ratings.generalAppearance}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Communication Skills"
                  field="communicationSkills"
                  value={formData.ratings.communicationSkills}
                  onChange={handleRatingChange}
                />
              </div>
            </div>

            {/* Attitude */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Attitude</h4>
              <div className="grid gap-4">
                <RatingRow
                  label="Acceptance of Feedback"
                  field="acceptanceFeedback"
                  value={formData.ratings.acceptanceFeedback}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Attitude towards the Job"
                  field="attitudeJob"
                  value={formData.ratings.attitudeJob}
                  onChange={handleRatingChange}
                />
              </div>
            </div>

            {/* Knowledge */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Knowledge</h4>
              <div className="grid gap-4">
                <RatingRow
                  label="Department Handbooks & Policies"
                  field="departmentHandbooks"
                  value={formData.ratings.departmentHandbooks}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Department Radio Codes"
                  field="radioCodes"
                  value={formData.ratings.radioCodes}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Computer Aided Dispatch Utilization"
                  field="computerAidedDispatch"
                  value={formData.ratings.computerAidedDispatch}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Patrol Tracking System"
                  field="patrolTracking"
                  value={formData.ratings.patrolTracking}
                  onChange={handleRatingChange}
                />
              </div>
            </div>

            {/* Performance */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Performance</h4>
              <div className="grid gap-4">
                <RatingRow
                  label="Driving Skill"
                  field="drivingSkill"
                  value={formData.ratings.drivingSkill}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Report Writing"
                  field="reportWriting"
                  value={formData.ratings.reportWriting}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Property Inspection"
                  field="propertyInspection"
                  value={formData.ratings.propertyInspection}
                  onChange={handleRatingChange}
                />
              </div>
            </div>

            {/* Relationships */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Relationships</h4>
              <div className="grid gap-4">
                <RatingRow
                  label="With Colleagues"
                  field="withColleagues"
                  value={formData.ratings.withColleagues}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="With Citizens"
                  field="withCitizens"
                  value={formData.ratings.withCitizens}
                  onChange={handleRatingChange}
                />
              </div>
            </div>

            {/* Roleplay Quality */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">(( Roleplay Quality ))</h4>
              <div className="grid gap-4">
                <RatingRow
                  label="Character Portrayal"
                  field="characterPortrayal"
                  value={formData.ratings.characterPortrayal}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Out-of-Character Demeanor"
                  field="oocDemeanor"
                  value={formData.ratings.oocDemeanor}
                  onChange={handleRatingChange}
                />
                <RatingRow
                  label="Roleplay Quality"
                  field="roleplayQuality"
                  value={formData.ratings.roleplayQuality}
                  onChange={handleRatingChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Acknowledgment */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">4</span>
              <h3>Instructor Acknowledgment</h3>
            </div>
          </div>

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
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
            href="https://protech.gta.world/forum/viewforum.php?f=91"
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

// Add this helper component for rating rows
function RatingRow({
  label,
  field,
  value,
  onChange
}: {
  label: string;
  field: keyof EvaluationRating;
  value: number | null;
  onChange: (field: keyof EvaluationRating, value: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
      <div className="text-sm text-white/70">{label}</div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, null].map((rating) => (
          <button
            key={rating === null ? 'NO' : rating}
            type="button"
            onClick={() => onChange(field, rating)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              value === rating
                ? 'bg-fuchsia-500 border-transparent text-white'
                : 'border-white/10 hover:border-white/20 text-white/60 hover:text-white/80'
            }`}
          >
            {rating === null ? 'N/O' : rating}
          </button>
        ))}
      </div>
    </div>
  );
}
