"use client";
import * as React from "react";
import { useState } from "react";

interface TechnicianRequestData {
  location: string;
  clientName: string;
  phoneNumber: string;
  hasPatrols: "Yes" | "No" | "";
  clientType: "Residential" | "Commercial" | "Vehicle" | "Government" | "";
  availability: string;
  forumUsername: string;
  discordUsername: string;
  eomPoints: string;
  additionalInfo: string;
  alarmSubscription: "None" | "Existing Alarm Box Linkage" | "Red Package Wiwang Alarm Kit" | "Orange Package Tenshun Alarm Kit" | "Blue Package Toshi Alarm Kit" | "Green Package ThriftEX Alarm Kit" | "";
  equipment: Array<{
    name: string;
    quantity: number;
  }>;
}

const ALARM_PRICES = {
  "None": 0,
  "Existing Alarm Box Linkage": 6000,
  "Red Package Wiwang Alarm Kit": 6400,
  "Orange Package Tenshun Alarm Kit": 8000,
  "Blue Package Toshi Alarm Kit": 12000,
  "Green Package ThriftEX Alarm Kit": 16000
} as const;

const INSTALLATION_FEE = 3000;

const EQUIPMENT_LIST = {
  "Existing Alarm Box Linkage": 6000,
  "* ProTech 4K 360° Dome Interior CCTV Camera": 15000,
  "ProTech 4K Fixed Exterior CCTV Camera": 1000,
  "ProTech 1080p 360° Dome Exterior CCTV Camera": 1500,
  "* ProTech 4K 360° Dome Exterior CCTV Camera": 15000,
  "ProTech 1080p Dash Cam w/ 128GB Micro SD": 1000,
  "ProTech 4K Action Camera w/ 128GB Micro SD": 1500,
  "ProTech Digital Video Recorder w/ 12TB Storage": 500,
  "ProTech Property Alarm Button": 2000,
  "ProTech Property Alarm Remote": 3000,
  "ProTech Electronic Door Lock": 1000,
  "ProTech Handheld Metal Detector": 1500,
  "* ProTech Walkthrough Metal Detector": 20000,
  "* ProTech Advanced Front Door Lock": 17000,
  "* ProTech 9-Lock Advanced Safe": 28000
} as const;

type FormMode = 'request' | 'conclusion';

interface ConclusionData {
  technicianInfo: string;
  completionDateTime: string;
  technicianNotes: string;
  clientNotes: string;
}

export default function TechnicianRequest() {
  const [mode, setMode] = useState<FormMode>('request');
  const [formData, setFormData] = useState<TechnicianRequestData>({
    location: "",
    clientName: "",
    phoneNumber: "",
    hasPatrols: "",
    clientType: "",
    availability: "",
    forumUsername: "",
    discordUsername: "",
    eomPoints: "",
    additionalInfo: "",
    alarmSubscription: "",
    equipment: []
  });
  const [conclusionData, setConclusionData] = useState<ConclusionData>({
    technicianInfo: "",
    completionDateTime: "",
    technicianNotes: "",
    clientNotes: ""
  });

  const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent";

  const selectClass = `${inputClass} appearance-none bg-[#1a1a1a] cursor-pointer pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[calc(100%-8px)_center] bg-no-repeat`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'eomPoints') return;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getAlarmPrice = () => {
    if (!formData.alarmSubscription) return 0;

    return ALARM_PRICES[formData.alarmSubscription as keyof typeof ALARM_PRICES] || 0;
  };

  const getEquipmentTotal = () => {
    return formData.equipment.reduce((total, item) => {
      return total + (EQUIPMENT_LIST[item.name as keyof typeof EQUIPMENT_LIST] * item.quantity);
    }, 0);
  };

  const getTotalPrice = () => {
    return getAlarmPrice() + INSTALLATION_FEE + getEquipmentTotal();
  };

  const handleAddEquipment = () => {
    setFormData(prev => ({
      ...prev,
      equipment: [...prev.equipment, { name: "", quantity: 1 }]
    }));
  };

  const handleRemoveEquipment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  const handleEquipmentChange = (index: number, field: 'name' | 'quantity', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }

        return item;
      })
    }));
  };

  const generateBBCode = () => {
    const alarmPrice = getAlarmPrice();
    const bankTransferTotal = getEquipmentTotal() + INSTALLATION_FEE;

    return `[divbox=#000000]
[img]https://i.imgur.com/kWcSahD.png[/img]
[/divbox]
[divbox=#F1F1F1]


[centre][size=120]TECHNICAL SERVICES DEPARTMENT[/size][/centre]
[centre][size=200][b]INSTALLATION & SERVICE OVERVIEW[/b][/size][/centre]

[centre][img]https://i.imgur.com/uTQR5f6.png[/img][/centre]

[divbox=#ffffff]
[sup][size=100][color=#FF0000]To be completed by the request handling employee.[/color][/size][/sup]
[centre][b][u][size=150]A. Request field[/size][/u][/b][/centre]

[b][u]Client Information[/u][/b]
[indent]15[/indent][b]Location / Address:[/b] ${formData.location}
[indent]15[/indent][b]Full Name:[/b] ${formData.clientName}
[indent]15[/indent][b]Phone Number:[/b] ${formData.phoneNumber}
[indent]15[/indent][b]Patrols:[/b] ${formData.hasPatrols}
[indent]15[/indent][b]Client type:[/b] ${formData.clientType}
[indent]15[/indent][b]Availability:[/b] ${formData.availability}
[indent]15[/indent][b]((Forum username:))[/b] ${formData.forumUsername}
[indent]15[/indent][b]((Discord username:))[/b] ${formData.discordUsername}
[indent]15[/indent][b]Points Toward [url=https://protech.gta.world/forum/viewtopic.php?t=61]Employee of the Month:[/url][/b] 2
[hr]

[centre][b]Additional information:[/b][/centre]
[divbox=#F1F1F1]
[centre]${formData.additionalInfo}[/centre]
[/divbox]
[/divbox]

[divbox=#ffffff]
[sup][size=100][color=#FF0000]To be completed by the handling technician [u]only[/u].[/color][/size][/sup]
[sup][size=100][color=#FF0000]Find official equipment names and pricing [url=https://protech.gta.world/viewtopic.php?t=22]on this page[/url].[/color][/size][/sup]
[centre][b][u][size=150]B. Installation Field[/size][/u][/b][/centre]

[b][u]Alarm Subscription[/u][/b]
${formData.alarmSubscription || "None"} - $${alarmPrice.toLocaleString()}
[b]TOTAL:[/b] [b]$${alarmPrice.toLocaleString()}[/b]
[color=#0076B1][sup]⮩((This part is to be paid to the script via /secinstall command)).[/sup][/color]

[indent]2[/indent][b][u]Equipment & installation[/u][/b]
${formData.equipment.map(item => `[indent]2[/indent]${item.name} | ${item.quantity} | $${(EQUIPMENT_LIST[item.name as keyof typeof EQUIPMENT_LIST] * item.quantity).toLocaleString()}`).join('\n')}

[indent]2[/indent]Installation/service fee (hourly fee) | 1 | $${INSTALLATION_FEE.toLocaleString()}
[b]TOTAL:[/b] [b]$${bankTransferTotal.toLocaleString()}[/b] |
[color=#0076B1][sup]⮩This part is to be paid towards the company routing at 020082468 (banktransfer only).[/sup][/color]

[/divbox]`;
  };

  const generateTopicTitle = () => {
    if (!formData.clientName || !formData.location) return "Installation & Service Overview";

    return `${formData.location} - ${formData.clientName}`;
  };

  const generateConclusionBBCode = () => {
    return `[divbox=#BF0000]
[centre][size=160][color=#FFFFFF][b]Request Concluded[/b][/color][/size][/centre]
[/divbox]
[divbox=white]
[hr]
[b]Request Completed by:[/b] ${conclusionData.technicianInfo}
[b]Completion Date and Time:[/b] ${conclusionData.completionDateTime}
[b]Additional Notes by the Technician:[/b] ${conclusionData.technicianNotes || "N/A"}
[b]Additional Notes by the Client:[/b] ${conclusionData.clientNotes || "N/A"}
[hr]
[/divbox]`;
  };

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Technician Request Form</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('request')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'request'
                  ? 'bg-fuchsia-500 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              Request
            </button>
            <button
              type="button"
              onClick={() => setMode('conclusion')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'conclusion'
                  ? 'bg-fuchsia-500 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              Conclusion
            </button>
          </div>
        </div>
        <p className="text-sm text-zinc-400">
          {mode === 'request'
            ? 'Document installation and service requests for the Technical Services Department.'
            : 'Document the conclusion of a technical service request.'}
        </p>
      </div>

      <form className="p-8 space-y-10">
        {mode === 'request' ? (
          <>
            {/* Client Information */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
                  <h3>Client Information</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Basic information about the client and their requirements.</p>
              </div>

              <div className="space-y-4 ml-10">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location / Address"
                  className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Client Name"
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="hasPatrols"
                    value={formData.hasPatrols}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="" className="bg-[#1a1a1a] text-zinc-400">Has Security Patrols?</option>
                    <option value="Yes" className="bg-[#1a1a1a]">Yes</option>
                    <option value="No" className="bg-[#1a1a1a]">No</option>
                  </select>
                  <select
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="" className="bg-[#1a1a1a] text-zinc-400">Client Type</option>
                    <option value="Residential" className="bg-[#1a1a1a]">Residential</option>
                    <option value="Commercial" className="bg-[#1a1a1a]">Commercial</option>
                    <option value="Vehicle" className="bg-[#1a1a1a]">Vehicle</option>
                    <option value="Government" className="bg-[#1a1a1a]">Government</option>
                  </select>
                </div>
                <textarea
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="Enter availability (one time slot per line)&#10;Example:&#10;27/FEB/2025 12:00-20:00&#10;28/FEB/2025 20:00-23:50"
                  className={`${inputClass} min-h-[100px] whitespace-pre-wrap`}
                  rows={4}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
                  <h3>Additional Information</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Contact information and other details.</p>
              </div>

              <div className="space-y-4 ml-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="forumUsername"
                    value={formData.forumUsername}
                    onChange={handleChange}
                    placeholder="Forum Username"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="discordUsername"
                    value={formData.discordUsername}
                    onChange={handleChange}
                    placeholder="Discord Username"
                    className={inputClass}
                  />
                </div>
                <input
                  type="text"
                  name="eomPoints"
                  value="2"
                  disabled
                  className={`${inputClass} cursor-not-allowed opacity-70`}
                />
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Additional Information"
                  className={`${inputClass} min-h-[100px]`}
                />
              </div>
            </div>

            {/* Alarm Subscription */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
                  <h3>Alarm Subscription</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Select the alarm subscription package.</p>
              </div>

              <div className="space-y-4 ml-10">
                <select
                  name="alarmSubscription"
                  value={formData.alarmSubscription}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="" className="bg-[#1a1a1a] text-zinc-400">Select Alarm Subscription</option>
                  <option value="None" className="bg-[#1a1a1a]">None</option>
                  <option value="Red Package Wiwang Alarm Kit" className="bg-[#1a1a1a]">Red Package Wiwang Alarm Kit - $6,400</option>
                  <option value="Orange Package Tenshun Alarm Kit" className="bg-[#1a1a1a]">Orange Package Tenshun Alarm Kit - $8,000</option>
                  <option value="Blue Package Toshi Alarm Kit" className="bg-[#1a1a1a]">Blue Package Toshi Alarm Kit - $12,000</option>
                  <option value="Green Package ThriftEX Alarm Kit" className="bg-[#1a1a1a]">Green Package ThriftEX Alarm Kit - $16,000</option>
                </select>
              </div>
            </div>

            {/* Equipment Selection */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">4</span>
                  <h3>Equipment</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Select equipment to be installed. Equipment marked with an asterisk (*) is collected from the /pinv rather than creating items in the business. Refer to the <a href="https://protech.gta.world/forum/viewtopic.php?t=22">Services page</a> for more information.</p>
              </div>

              <div className="space-y-4 ml-10">
                {formData.equipment.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <select
                      value={item.name}
                      onChange={(e) => handleEquipmentChange(index, 'name', e.target.value)}
                      className={selectClass}
                    >
                      <option value="" className="bg-[#1a1a1a] text-zinc-400">Select Equipment</option>
                      {Object.entries(EQUIPMENT_LIST).map(([name, price]) => (
                        <option key={name} value={name} className="bg-[#1a1a1a]">
                          {name} - ${price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleEquipmentChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      className={`${inputClass} w-24`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveEquipment(index)}
                      className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddEquipment}
                  className="text-sm text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                >
                  + Add Equipment
                </button>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="space-y-4">
                    {/* Script Payment Section */}
                    <div>
                      <div className="text-sm text-zinc-400 mb-2">To be paid via /secinstall command:</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Alarm Subscription:</span>
                        <span className="text-white">${getAlarmPrice().toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Bank Transfer Section */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-sm text-zinc-400 mb-2">To be paid to routing #020082468 (bank transfer):</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Equipment Total:</span>
                        <span className="text-white">${getEquipmentTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-zinc-400">Installation Fee:</span>
                        <span className="text-white">${INSTALLATION_FEE.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2 pt-2 border-t border-white/10">
                        <span className="font-medium text-zinc-300">Bank Transfer Total:</span>
                        <span className="font-medium text-white">${(getEquipmentTotal() + INSTALLATION_FEE).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                name="technicianInfo"
                value={conclusionData.technicianInfo}
                onChange={(e) => setConclusionData(prev => ({ ...prev, technicianInfo: e.target.value }))}
                placeholder="Badge and Full Name"
                className={inputClass}
              />
              <input
                type="text"
                name="completionDateTime"
                value={conclusionData.completionDateTime}
                onChange={(e) => setConclusionData(prev => ({ ...prev, completionDateTime: e.target.value }))}
                placeholder="Completion Date and Time (DD/MMM/YYYY HH:MM)"
                className={inputClass}
              />
              <textarea
                name="technicianNotes"
                value={conclusionData.technicianNotes}
                onChange={(e) => setConclusionData(prev => ({ ...prev, technicianNotes: e.target.value }))}
                placeholder="Additional Notes by the Technician"
                className={`${inputClass} min-h-[100px]`}
              />
              <textarea
                name="clientNotes"
                value={conclusionData.clientNotes}
                onChange={(e) => setConclusionData(prev => ({ ...prev, clientNotes: e.target.value }))}
                placeholder="Additional Notes by the Client"
                className={`${inputClass} min-h-[100px]`}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Topic Title */}
          {mode === 'request' && (
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
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(mode === 'request' ? generateBBCode() : generateConclusionBBCode());
              }}
              className="group relative flex-1 px-4 py-3 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white rounded-lg transition-all hover:from-fuchsia-400 hover:to-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap"
            >
              <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
              Copy BBCode
            </button>

            <a
              href="https://protech.gta.world/forum/posting.php?mode=post&f=25"
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