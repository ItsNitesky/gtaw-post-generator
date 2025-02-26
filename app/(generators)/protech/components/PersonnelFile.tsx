"use client";
import * as React from "react";
import { useState } from "react";

interface PersonnelFileData {
  // Personal Information
  photoUrl: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  address: string;
  phoneNumber: string;
  routingNumber: string;

  // Licenses and Certifications
  licenses: {
    personalFirearm: boolean;
    guardCard: boolean;
    ccw: boolean;
    leoCcw: boolean;
    firstAid: boolean;
    other: boolean;
    otherSpecify: string;
  };

  // Employment
  dateJoined: string;
  rank: string;
  badgeNumber: string;

  // Departments
  departments: {
    patrolOperations: boolean;
    trainingRecruitment: boolean;
    customerServices: boolean;
    internalAffairs: boolean;
    specialServices: boolean;
    technicalServices: boolean;
    informationTechnology: boolean;
    administrativeOperations: boolean;
    other: boolean;
    otherSpecify: string;
  };

  // Divisions
  divisions: {
    liveSupportTeam: boolean;
    recruitmentOfficer: boolean;
    fieldTrainingInstructor: boolean;
    cashInTransit: boolean;
    towServices: boolean;
    personalProtection: boolean;
    privateInvestigations: boolean;
    canineSecurity: boolean;
    other: boolean;
    otherSpecify: string;
  };

  // Other Information
  introduction: string;
  hobbies: string;
  futureGoals: string;
}

const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-block">
    <button
      type="button"
      className="text-zinc-500 hover:text-zinc-400 transition-colors ml-2"
      aria-label="Help"
    >
      ⓘ
    </button>
    <div className="hidden group-hover:block absolute bottom-full right-0 mb-2 w-80 p-2 text-sm text-white bg-black/90 rounded-lg">
      {text}
      <div className="absolute -bottom-1 right-4 w-2 h-2 rotate-45 bg-black/90" />
    </div>
  </div>
);

export default function PersonnelFile() {
  const [formData, setFormData] = useState<PersonnelFileData>({
    photoUrl: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    address: "",
    phoneNumber: "",
    routingNumber: "",
    
    licenses: {
      personalFirearm: false,
      guardCard: false,
      ccw: false,
      leoCcw: false,
      firstAid: false,
      other: false,
      otherSpecify: "",
    },

    dateJoined: "",
    rank: "",
    badgeNumber: "",

    departments: {
      patrolOperations: false,
      trainingRecruitment: false,
      customerServices: false,
      internalAffairs: false,
      specialServices: false,
      technicalServices: false,
      informationTechnology: false,
      administrativeOperations: false,
      other: false,
      otherSpecify: "",
    },

    divisions: {
      liveSupportTeam: false,
      recruitmentOfficer: false,
      fieldTrainingInstructor: false,
      cashInTransit: false,
      towServices: false,
      personalProtection: false,
      privateInvestigations: false,
      canineSecurity: false,
      other: false,
      otherSpecify: "",
    },

    introduction: "",
    hobbies: "",
    futureGoals: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Special handling for phone number to only allow numbers
    if (name === 'phoneNumber' && !value.match(/^[0-9-]*$/)) {
      return;
    }
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof PersonnelFileData] as Record<string, any>),
          [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const generateBBCode = () => {
    return `[divbox=#ffffff]
[centre][img]https://i.imgur.com/kWcSahD.png[/img][/centre]
[hr][/hr][divbox=#BF0000][centre][b][u][size=150][color=#FFFFFF]EMPLOYEE PERSONNEL FILE[/color][/size][/u][/b] [/centre][/divbox]
[hr][/hr]
[legend=#BF0000, I. PERSONAL INFORMATION]

[hr][/hr]
[b]Photo:[/b] [url=${formData.photoUrl}]ACCESS[/url] (Must include your face)
[b]First Name:[/b] ${formData.firstName}
[b]Last Name:[/b] ${formData.lastName}
[b]Date of Birth:[/b] ${formData.dateOfBirth}
[b]Place of Birth:[/b] ${formData.placeOfBirth}
[b]Address:[/b] ${formData.address}
[b]Phone Number:[/b] ${formData.phoneNumber}
[b]Routing Number:[/b] ${formData.routingNumber}
[/legend]

[legend=#BF0000, II. LICENSES AND CERTIFICATIONS]
[hr][/hr]
[b]Current Firearm Licenses and Certifications:[/b]
[${formData.licenses.personalFirearm ? 'cbc' : 'cb'}]Personal Firearm (PF)
[${formData.licenses.guardCard ? 'cbc' : 'cb'}]Guard Card (GC)
[${formData.licenses.ccw ? 'cbc' : 'cb'}]Conceal Carry Weapon (CCW)
[${formData.licenses.leoCcw ? 'cbc' : 'cb'}]LEO Conceal Carry Weapon (LEOCCW)
[${formData.licenses.firstAid ? 'cbc' : 'cb'}]First-Aid
[${formData.licenses.other ? 'cbc' : 'cb'}]Other (specify): ${formData.licenses.otherSpecify}
[/legend]

[legend=#BF0000, III. EMPLOYMENT]
[hr][/hr]
[b]Date joined ProTech:[/b] ${formData.dateJoined}
[b]Rank:[/b] ${formData.rank}
[b]Badge Number:[/b] ${formData.badgeNumber}
[hr][/hr]
[b]Department(s):[/b]
[${formData.departments.patrolOperations ? 'cbc' : 'cb'}]Patrol Operations (Security Officer or Security Guard)
[${formData.departments.trainingRecruitment ? 'cbc' : 'cb'}]Training and Recruitment
[${formData.departments.customerServices ? 'cbc' : 'cb'}]Customer Services
[${formData.departments.internalAffairs ? 'cbc' : 'cb'}]Internal Affairs
[${formData.departments.specialServices ? 'cbc' : 'cb'}]Special Services
[${formData.departments.technicalServices ? 'cbc' : 'cb'}]Technical Services / Tow Services
[${formData.departments.informationTechnology ? 'cbc' : 'cb'}]Information Technology
[${formData.departments.administrativeOperations ? 'cbc' : 'cb'}]Administrative Operations (Maintenance Worker/Firearms Instructor)
[${formData.departments.other ? 'cbc' : 'cb'}]Other (specify): ${formData.departments.otherSpecify}
[hr][/hr]
[b]Division(s):[/b]
[${formData.divisions.liveSupportTeam ? 'cbc' : 'cb'}]Live Support Team
[${formData.divisions.recruitmentOfficer ? 'cbc' : 'cb'}]Recruitment Officer
[${formData.divisions.fieldTrainingInstructor ? 'cbc' : 'cb'}]Field Training Instructor
[${formData.divisions.cashInTransit ? 'cbc' : 'cb'}]Cash-in-Transit
[${formData.divisions.towServices ? 'cbc' : 'cb'}]Tow Services
[${formData.divisions.personalProtection ? 'cbc' : 'cb'}]Personal Protection
[${formData.divisions.privateInvestigations ? 'cbc' : 'cb'}]Private Investigations
[${formData.divisions.canineSecurity ? 'cbc' : 'cb'}]Canine Security
[${formData.divisions.other ? 'cbc' : 'cb'}]Other (specify): ${formData.divisions.otherSpecify}
[/legend]

[legend=#BF0000, IV. OTHER INFORMATION]
[hr][/hr]
[b]Introduce yourself in your own words:[/b]
${formData.introduction}
[hr][/hr]
[b]What are your hobbies?[/b] 
${formData.hobbies}
[hr][/hr]
[b]What are your future goals in and outside the company?[/b] 
${formData.futureGoals}
[hr][/hr]
[/legend]

[legend=#BF0000, V. INTERNAL CERTIFICATIONS AND RIBBONS]
[b]Management use only. Do not edit.[/b]
[/legend]

[hr][/hr]
[/divbox]`;
  };

  const generateTopicTitle = () => {
    if (!formData.firstName || !formData.lastName || !formData.badgeNumber) return "";
    return `${formData.firstName} ${formData.lastName} #${formData.badgeNumber}`;
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
        <h2 className="text-2xl font-semibold text-white mb-2">Personnel File Form</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Welcome to ProTech Security Solutions! Please use this form to create your personnel file. This document contains your personal information, qualifications, and other important details about your employment. Please be sure to read the instructions provided in each section entirely, and hover over the information icon next to certain fields for more information and instructions.
        </p>
      </div>

      <form className="p-8 space-y-10">
        <div className="divide-y divide-white/10">
          <div className="pb-8">
            {/* Personal Information section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
                  <h3>Personal Information</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 ml-10">
                  Basic personal information required for your employee file. Hover over the icon to the right of the input field on certain fields for instructtions on how to obtain this information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleChange}
                      placeholder="Photo URL"
                      className={inputClass}
                    />
                    <Tooltip text="Upload your photo to imgur.com and paste the link here. The photo must include your face." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  placeholder="Place of Birth"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={inputClass}
                />
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    placeholder="Routing Number"
                    className={inputClass}
                  />
                  <Tooltip text="You can find your routing number by visiting banking.gta.world or by typing /stats in-game." />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 pb-8">
            {/* Licenses and Certifications section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
                  <h3>Licenses and Certifications</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 ml-10">
                  Select all current licenses and certifications that you hold. Please only select licenses and certifications that you have obtained and that are currently valid. Inactive, Suspended, or Revoked licenses and certifications should not be selected.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="licenses.personalFirearm"
                    checked={formData.licenses.personalFirearm}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Personal Firearm (PF)</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="licenses.guardCard"
                    checked={formData.licenses.guardCard}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Guard Card (GC)</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="licenses.ccw"
                    checked={formData.licenses.ccw}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Conceal Carry Weapon (CCW)</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="licenses.leoCcw"
                    checked={formData.licenses.leoCcw}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">LEO Conceal Carry Weapon (LEOCCW)</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="licenses.firstAid"
                    checked={formData.licenses.firstAid}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">First-Aid</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="licenses.other"
                      checked={formData.licenses.other}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Other</span>
                  </label>
                  {formData.licenses.other && (
                    <input
                      type="text"
                      name="licenses.otherSpecify"
                      value={formData.licenses.otherSpecify}
                      onChange={handleChange}
                      placeholder="Specify"
                      className={inputClass}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 pb-8">
            {/* Employment section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
                  <h3>Employment</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 ml-10">
                  Your current employment details. Please provide the Date Joined in the format of DD/MMM/YYYY. If you are a Security Officer, please select "Patrol Operations" as your department. Maintenance Workers and Firearms Instructors should select "Administrative Operations".
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="dateJoined"
                  value={formData.dateJoined}
                  onChange={handleChange}
                  placeholder="Date Joined"
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
                  name="badgeNumber"
                  value={formData.badgeNumber}
                  onChange={handleChange}
                  placeholder="Badge Number"
                  className={inputClass}
                />
              </div>

              {/* Departments */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80">Departments</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.patrolOperations"
                      checked={formData.departments.patrolOperations}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-tight">
                      Patrol Operations
                    </span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.trainingRecruitment"
                      checked={formData.departments.trainingRecruitment}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Training and Recruitment</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.customerServices"
                      checked={formData.departments.customerServices}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Customer Services</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.internalAffairs"
                      checked={formData.departments.internalAffairs}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Internal Affairs</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.specialServices"
                      checked={formData.departments.specialServices}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Special Services</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.technicalServices"
                      checked={formData.departments.technicalServices}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Technical Services / Tow Services</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.informationTechnology"
                      checked={formData.departments.informationTechnology}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Information Technology</span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="departments.administrativeOperations"
                      checked={formData.departments.administrativeOperations}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Administrative Operations</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-3 group cursor-pointer">
                      <input
                        type="checkbox"
                        name="departments.other"
                        checked={formData.departments.other}
                        onChange={handleChange}
                        className={checkboxClass}
                      />
                      <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Other</span>
                    </label>
                    {formData.departments.other && (
                      <input
                        type="text"
                        name="departments.otherSpecify"
                        value={formData.departments.otherSpecify}
                        onChange={handleChange}
                        placeholder="Specify"
                        className={inputClass}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 pb-8">
            {/* Divisions section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">4</span>
                  <h3>Divisions</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 ml-10">
                  Please select any divisions you are currently a member of. If you are currently assigned to our Sandy Shores station, please select "Other" and specify "County Operations". <b>If you are a new hire, you will not select anything in this section currently. </b>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.liveSupportTeam"
                    checked={formData.divisions.liveSupportTeam}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Live Support Team</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.recruitmentOfficer"
                    checked={formData.divisions.recruitmentOfficer}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Recruitment Officer</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.fieldTrainingInstructor"
                    checked={formData.divisions.fieldTrainingInstructor}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Field Training Instructor</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.cashInTransit"
                    checked={formData.divisions.cashInTransit}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Cash-in-Transit</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.towServices"
                    checked={formData.divisions.towServices}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Tow Services</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.personalProtection"
                    checked={formData.divisions.personalProtection}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Personal Protection</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.privateInvestigations"
                    checked={formData.divisions.privateInvestigations}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Private Investigations</span>
                </label>
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="divisions.canineSecurity"
                    checked={formData.divisions.canineSecurity}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Canine Security</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      name="divisions.other"
                      checked={formData.divisions.other}
                      onChange={handleChange}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">Other</span>
                  </label>
                  {formData.divisions.other && (
                    <input
                      type="text"
                      name="divisions.otherSpecify"
                      value={formData.divisions.otherSpecify}
                      onChange={handleChange}
                      placeholder="Specify"
                      className={inputClass}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            {/* Other Information section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">5</span>
                  <h3>Other Information</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 ml-10">
                  Help us get to know you better by providing a short introduction about yourself, your background, and what brought you to ProTech.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">Introduction</label>
                  <textarea
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    placeholder="Tell us about yourself, your background, and what brought you to ProTech..."
                    className={`${inputClass} min-h-[100px]`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">Hobbies & Interests</label>
                  <textarea
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    placeholder="What do you enjoy doing in your free time? What interests do you have outside of work?"
                    className={`${inputClass} min-h-[100px]`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">Future Goals</label>
                  <textarea
                    name="futureGoals"
                    value={formData.futureGoals}
                    onChange={handleChange}
                    placeholder="What are your career aspirations within ProTech? What personal and professional goals would you like to achieve?"
                    className={`${inputClass} min-h-[100px]`}
                  />
                </div>
              </div>
            </div>
          </div>
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
              href="https://protech.gta.world/forum/posting.php?mode=post&f=76"
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