"use client";

import dynamic from 'next/dynamic';
import * as React from "react";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { trackEvent } from '../../../utils/analytics';

// Dynamically import components with no SSR
const IncidentReport = dynamic(() => import("./components/IncidentReport"), { ssr: false });
const PatrolLog = dynamic(() => import("./components/PatrolLog"), { ssr: false });
const UseOfForce = dynamic(() => import("./components/UseOfForce"), { ssr: false });
const PersonnelFile = dynamic(() => import("./components/PersonnelFile"), { ssr: false });
const Assignments = dynamic(() => import("./components/Assignments"), { ssr: false });
const ChangelogModal = dynamic(() => import("./components/ChangelogModal").then(mod => mod.ChangelogModal), { ssr: false });

export type FormType = "incident" | "patrol" | "uof" | "personnel" | "assignments" | "evaluation" | "disciplinary" | "timeoff" | "equipment";

export type IncidentFormData = {
  employeeName: string;
  patrolUnit: string;
  dateTime: string;
  location: string;
  situation: string;
  situationOther: string;
  incidentReport: string;
  photoEvidence: string;
  ownerOnScene: boolean;
  ownerNotified: boolean;
  lawEnforcementNotified: boolean;
  lawEnforcementOnScene: boolean;
  nonLethalDeployed: boolean;
  lethalDeployed: boolean;
  signature: string;
};

export default function ProtechPage() {
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null);
  const [incidentFormData, setIncidentFormData] = useState<IncidentFormData>({
    employeeName: "",
    patrolUnit: "",
    dateTime: "",
    location: "",
    situation: "other",
    situationOther: "",
    incidentReport: "",
    photoEvidence: "",
    ownerOnScene: false,
    ownerNotified: false,
    lawEnforcementNotified: false,
    lawEnforcementOnScene: false,
    nonLethalDeployed: false,
    lethalDeployed: false,
    signature: ""
  });

  const [currentUTC, setCurrentUTC] = useState('');
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [changelog, setChangelog] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentUTC(now.toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).toUpperCase());
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('/protech/CHANGELOG.md')
      .then(res => res.text())
      .then(text => {
        // Remove any UTF-8 BOM and normalize line endings
        const cleanText = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
        setChangelog(cleanText);
      })
      .catch(err => {
        console.error('Error loading changelog:', err);
        setChangelog('# Changelog\n\nUnable to load changelog.');
      });
  }, []);

  const reports = [
    {
      category: "Essential Formats",
      items: [
        {
          id: 'incident',
          name: 'Incident Report',
          description: 'Document security-related incidents and actions taken',
          icon: '📝'
        },
        {
          id: 'uof',
          name: 'Use of Force',
          description: 'Document any use of force during an incident',
          icon: '⚠️'
        },
        {
          id: 'personnel',
          name: 'Personnel File',
          description: 'Required documentation for all ProTech employees',
          icon: '👤'
        }
      ]
    },
    {
      category: "Patrol Services Division",
      items: [
        {
          id: 'assignments',
          name: 'Assignments',
          description: 'Create and manage patrol assignments',
          icon: '📋'
        },
        {
          id: 'patrol_task',
          name: 'Patrol Task',
          description: 'Submit new patrol tasks for service',
          icon: '🎯'
        },
        {
          id: 'patrol_task_serviced',
          name: 'Patrol Task Serviced',
          description: 'Mark patrol tasks as completed',
          icon: '✅'
        }
      ]
    },
    {
      category: "Training and Recruitment Division",
      items: [
        {
          id: 'trainee_file',
          name: 'Trainee File',
          description: 'Create and manage trainee documentation',
          icon: '📋'
        },
        {
          id: 'guided_assignment',
          name: 'Guided Assignment Report',
          description: 'Document guided assignment progress',
          icon: '📊'
        },
        {
          id: 'guided_patrol',
          name: 'Guided Patrol Report',
          description: 'Record guided patrol evaluations',
          icon: '🎯'
        },
        {
          id: 'post_interview',
          name: 'Post Interview Log',
          description: 'Document post-interview feedback',
          icon: '💬'
        }
      ]
    },
    {
      category: "Technical Services Division",
      items: [
        {
          id: 'fleet_service',
          name: 'Fleet Service Requests',
          description: 'Submit vehicle maintenance requests',
          icon: '🚗'
        },
        {
          id: 'technician',
          name: 'Technician Requests',
          description: 'Request technical support or equipment',
          icon: '🔧'
        },
        {
          id: 'tow_contract',
          name: 'Tow Contract Log',
          description: 'Record towing service activities',
          icon: '🚛'
        }
      ]
    }
  ];

  const handleFormSelect = (formId: string) => {
    setSelectedForm(formId as FormType);
    trackEvent(
      'select_form',
      'forms',
      formId,
    );
  };

  return (
    <div className="relative z-10 container mx-auto flex-1 flex flex-col">
      <div className="flex flex-col items-center gap-8 py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 relative">
            <Image
              src="/images/protech-logo.png"
              alt="ProTech Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 animate-gradient">
                ProTech
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-400 dark:from-zinc-300 dark:to-zinc-400">
                {" "}Report Generator
              </span>
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Create incident reports, use of force reports, and more
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-mono text-zinc-400">
                  UTC: {currentUTC}
                </p>
              </div>
              <button
                onClick={() => setIsChangelogOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 hover:bg-white/10 transition-colors"
              >
                Version 1.0.0
              </button>
            </div>
          </div>
        </div>

        {!selectedForm ? (
          <div className="w-full max-w-4xl space-y-8">
            {reports.map((category) => (
              <div key={category.category} className="space-y-4">
                <h2 className="text-xl font-medium text-white/80">{category.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => handleFormSelect(report.id)}
                      className="group relative overflow-hidden rounded-xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">{report.icon}</div>
                      <h3 className="text-lg font-medium text-white mb-1">{report.name}</h3>
                      <p className="text-sm text-zinc-400">{report.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            <button
              onClick={() => setSelectedForm(null)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Reports
            </button>
            {selectedForm === "incident" && (
              <IncidentReport
                formData={incidentFormData}
                setFormData={setIncidentFormData}
                onSwitchForm={setSelectedForm}
              />
            )}
            {selectedForm === "patrol" && <PatrolLog />}
            {selectedForm === "uof" && <UseOfForce />}
            {selectedForm === "personnel" && <PersonnelFile />}
            {selectedForm === "assignments" && <Assignments />}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-6 mt-auto">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Made with{" "}
          <span className="text-[#ff0000] dark:text-[#ff3333] text-base font-bold animate-heart-pulse inline-block">❤</span>
          {" "}by <a href="https://forum.gta.world/en/profile/50132-brant/" target="_blank" className="hover:text-fuchsia-400 transition-colors">Brant</a> for the GTA World Community
        </p>
      </div>

      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
        changelog={changelog}
      />
    </div>
  );
} 