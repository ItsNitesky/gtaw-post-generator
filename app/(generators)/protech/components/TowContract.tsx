"use client";
import * as React from "react";
import { useState } from "react";

interface TowContractData {
  employeeInfo: string;
  dateTime: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleLocation: string;
  serviceTypes: {
    towing: boolean;
    impound: boolean;
    roadsideAssistance: boolean;
    accidentRecovery: boolean;
  };
  requestedBy: "LSSD" | "Private" | "";
  authorizedBy: string;
  clientInfo: string;
  evidence: string;
  fee: string;
}

export default function TowContract() {
  const [formData, setFormData] = useState<TowContractData>({
    employeeInfo: "",
    dateTime: "",
    vehicleModel: "",
    vehiclePlate: "",
    vehicleLocation: "",
    serviceTypes: {
      towing: false,
      impound: false,
      roadsideAssistance: false,
      accidentRecovery: false
    },
    requestedBy: "",
    authorizedBy: "",
    clientInfo: "",
    evidence: "",
    fee: ""
  });

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

  const radioClass = `
    ${checkboxClass}
    rounded-full
    after:content-['•']
    after:text-lg
  `;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceTypeChange = (type: keyof TowContractData['serviceTypes']) => {
    setFormData(prev => ({
      ...prev,
      serviceTypes: {
        ...prev.serviceTypes,
        [type]: !prev.serviceTypes[type]
      }
    }));
  };

  const generateBBCode = () => {
    const serviceTypes = Object.entries(formData.serviceTypes)
      .filter(([_, checked]) => checked)
      .map(([type]) => {
        const formatted = type.replace(/([A-Z])/g, ' $1').toLowerCase();
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
      })
      .join('\n');

    return `[divbox=#FFFFFF]
[img]https://i.imgur.com/kWcSahD.png[/img]
[/divbox]
[divbox=#BF0000]
[size=200][color=#FFFFFF][b][size=150][centre]TOW CONTRACT LOG[/centre][/size][/b][/color][/size]
[/divbox]
[divbox=#FFFFFF]
[size=150][b]Personal Information:[/b][/size]
[hr]
[b]Full Name and Badge:[/b] ${formData.employeeInfo}
[b]Date and Time:[/b] ${formData.dateTime}
[hr]
[size=150][b]Vehicle Details:[/b][/size]
[hr]
[b]Model/Plate:[/b] ${formData.vehicleModel} - ${formData.vehiclePlate}
[b]Location of the Vehicle:[/b] ${formData.vehicleLocation}
[hr]
[size=150][b]Service Details:[/b][/size]
[hr]
[b]Type(s):[/b]
${serviceTypes}

[b]Requested by:[/b]
${formData.requestedBy}
[hr]
[size=150][b]Client Information:[/b][/size]
[hr]
[b][i](If LSSD)[/i] Authorizing Employee:[/b] ${formData.authorizedBy}
[b][i](If Private)[/i] Client Full Name and Phone:[/b] ${formData.clientInfo}
[b]Evidence:[/b] ${formData.evidence}
[b]Fee:[/b] ${formData.fee}
[/divbox]`;
  };

  const generateTopicTitle = () => {
    if (!formData.vehicleLocation || !formData.vehicleModel || !formData.vehiclePlate) {
      return "Impound Log";
    }
    return `Impound Log - ${formData.vehicleLocation} - ${formData.vehicleModel} - ${formData.vehiclePlate}`;
  };

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="relative bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer"></div>
        <div className="relative">
          <h2 className="text-2xl font-semibold text-white mb-2">Tow Contract Log</h2>
          <p className="text-sm text-zinc-400">Document towing services, impounds, and roadside assistance operations.</p>
        </div>
      </div>

      <form className="p-8 space-y-10">
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
              <h3>Personal Information</h3>
            </div>
          </div>

          <div className="space-y-4 ml-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="employeeInfo"
                value={formData.employeeInfo}
                onChange={handleChange}
                placeholder="Full Name and Badge"
                className={inputClass}
              />
              <input
                type="text"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                placeholder="Date and Time"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
              <h3>Vehicle Details</h3>
            </div>
          </div>

          <div className="space-y-4 ml-10">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                placeholder="Vehicle Model"
                className={inputClass}
              />
              <input
                type="text"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                placeholder="License Plate"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="vehicleLocation"
              value={formData.vehicleLocation}
              onChange={handleChange}
              placeholder="Location of the Vehicle"
              className={inputClass}
            />
          </div>
        </div>

        {/* Service Details */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
              <h3>Service Details</h3>
            </div>
          </div>

          <div className="space-y-4 ml-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-400">Service Type(s)</p>
                <div className="space-y-3 bg-white/5 p-4 rounded-lg border border-white/10">
                  {Object.entries(formData.serviceTypes).map(([type, checked]) => (
                    <label key={type} className="flex items-center gap-3 text-white cursor-pointer hover:text-fuchsia-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleServiceTypeChange(type as keyof TowContractData['serviceTypes'])}
                        className={checkboxClass}
                      />
                      {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-400">Requested By</p>
                <div className="space-y-3 bg-white/5 p-4 rounded-lg border border-white/10">
                  <label className="flex items-center gap-3 text-white cursor-pointer hover:text-fuchsia-300 transition-colors">
                    <input
                      type="radio"
                      name="requestedBy"
                      value="LSSD"
                      checked={formData.requestedBy === "LSSD"}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    Los Santos County Sheriff's Department
                  </label>
                  <label className="flex items-center gap-3 text-white cursor-pointer hover:text-fuchsia-300 transition-colors">
                    <input
                      type="radio"
                      name="requestedBy"
                      value="Private"
                      checked={formData.requestedBy === "Private"}
                      onChange={handleChange}
                      className={radioClass}
                    />
                    Private
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-lg font-medium text-white/80">
              <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">4</span>
              <h3>Client Information</h3>
            </div>
          </div>

          <div className="space-y-4 ml-10">
            {formData.requestedBy === "LSSD" && (
              <input
                type="text"
                name="authorizedBy"
                value={formData.authorizedBy}
                onChange={handleChange}
                placeholder="Authorizing Deputy's Name"
                className={`${inputClass} transition-all duration-200`}
              />
            )}
            {formData.requestedBy === "Private" && (
              <>
                <input
                  type="text"
                  name="clientInfo"
                  value={formData.clientInfo}
                  onChange={handleChange}
                  placeholder="Client Full Name and Phone Number"
                  className={`${inputClass} transition-all duration-200`}
                />
                <input
                  type="text"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="Fee"
                  className={`${inputClass} transition-all duration-200`}
                />
              </>
            )}
            <input
              type="text"
              name="evidence"
              value={formData.evidence}
              onChange={handleChange}
              placeholder="Evidence (Imgur Link featuring photo of vehicle)"
              className={`${inputClass} transition-all duration-200`}
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