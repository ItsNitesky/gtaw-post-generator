"use client";
import * as React from "react";
import { useState } from "react";

interface PostInterviewData {
  candidateName: string;
  applicationUrl: string;
  backgroundCheckImage: string;
  interviewerNames: string;
  interviewDate: string;
  interviewLog: string;
  examineLink: string;
  observations: string;
  recommendation: "passed" | "denied" | "inconclusive" | null;
}

type FormMode = 'log' | 'review';

interface ReviewData {
  reviewerName: string;
  reviewerRank: string;
  reviewerNotes: string;
  verdict: 'passed' | 'denied' | null;
}

export default function PostInterviewLog() {
  const [mode, setMode] = useState<FormMode>('log');
  const [formData, setFormData] = useState<PostInterviewData>({
    candidateName: "",
    applicationUrl: "",
    backgroundCheckImage: "",
    interviewerNames: "",
    interviewDate: "",
    interviewLog: "",
    examineLink: "",
    observations: "",
    recommendation: null
  });
  
  const [reviewData, setReviewData] = useState<ReviewData>({
    reviewerName: '',
    reviewerRank: '',
    reviewerNotes: '',
    verdict: null
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
[img]https://i.imgur.com/kWcSahD.png[/img]

[divbox=#BF0000]
[centre][size=130][color=#FFFFFF][b]Training & Recruitment Department - Post Interview Log[/b][/color][/size][/centre]
[/divbox]
[divboxl=transparent][size=85]Protech's Training and Recruitment Department is dedicated to cultivating an elite security workforce. Through this form, the final decision to hire an individual shall be cast by at least two Recruitment personnel, with the reviewing party at least having attained the departmental rank of Senior Recruitment Officer. This "four-eyes-principle" exists to ensure a streamlined quality of recruitment and to prevent nepotism or favoritism during the recruitment process, along with creating a proper paper trail. If the recommendation and verdict contradict each other, the Recruitment Coordinator is to be informed of a final decision.[/size][/divboxl]
[legend=#BF0000, Candidate Information]
[size=85][i]- To be filled out by the interviewer -[/i][/size]
[b]Candidate Name:[/b] ${formData.candidateName}
[b][url=${formData.applicationUrl}]Application Link[/url][/b]
[b]Background Check Information:[/b]
[spoiler=lspdresource.jpg]
[img]${formData.backgroundCheckImage}[/img]
[/spoiler]
[/legend]
[legend=#BF0000, Interview Details]
[size=85][i]- To be filled out by the interviewer -[/i][/size]
[b]Handling Personnel:[/b] ${formData.interviewerNames}
[b]Interview Date:[/b] ${formData.interviewDate}
[b]Interview Log:[/b]
[spoiler=log.mp3]
${formData.interviewLog}
[/spoiler]
(( [b]Examine:[/b] ${formData.examineLink} ))
[b]Observations:[/b] ${formData.observations}
[b]Recommendation:[/b] ${formData.recommendation === "passed" ? "[cbc]" : "[cb]"}[color=#008000]Passed[/color] ${formData.recommendation === "denied" ? "[cbc]" : "[cb]"}[color=#BF0000]Denied[/color] ${formData.recommendation === "inconclusive" ? "[cbc]" : "[cb]"}[color=#FF8000]Inconclusive[/color]
[/legend]
[/divbox]`;
  };

  const generateReviewBBCode = () => {
    return `[divbox=#FFFFFF]
[img]https://i.imgur.com/kWcSahD.png[/img]

[divbox=#BF0000]
[centre][size=130][color=#FFFFFF][b]Training & Recruitment Department - Post Interview Review[/b][/color][/size][/centre]
[/divbox]
[divboxl=transparent][size=85]Protech's Training and Recruitment Department is dedicated to cultivating an elite security workforce. Through this form, the final decision to hire an individual shall be cast by at least two Recruitment personnel, with the reviewing party at least having attained the departmental rank of Senior Recruitment Officer. This "four-eyes-principle" exists to ensure a streamlined quality of recruitment and to prevent nepotism or favoritism during the recruitment process, along with creating a proper paper trail. If the recommendation and verdict contradict each other, the Recruitment Coordinator is to be informed of a final decision.[/size][/divboxl]
[legend=#BF0000, Review Verdict]
[size=85][i]- To be filled out by the reviewer -[/i][/size]
[b]Reviewer Name:[/b] ${reviewData.reviewerName}
[b]Reviewer Divisional Rank:[/b] ${reviewData.reviewerRank}
[b]Reviewer Notes:[/b] ${reviewData.reviewerNotes}
[b]Verdict:[/b] ${reviewData.verdict === "passed" ? "[cbc]" : "[cb]"}[color=#008000]Passed[/color] ${reviewData.verdict === "denied" ? "[cbc]" : "[cb]"}[color=#BF0000]Denied[/color]
[/legend]
[/divbox]`;
  };

  const generateTopicTitle = () => {
    if (!formData.candidateName) return 'PIL - [PENDING VERDICT]';
    return `PIL - ${formData.candidateName} [PENDING VERDICT]`;
  };

  return (
    <div className="w-full max-w-3xl bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl">
      <div className="bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-b border-white/10 p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">Post Interview {mode === 'review' ? 'Review' : 'Log'}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('log')}
              className={`px-4 py-2 rounded-lg transition-all ${
                mode === 'log'
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Log
            </button>
            <button
              onClick={() => setMode('review')}
              className={`px-4 py-2 rounded-lg transition-all ${
                mode === 'review'
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Review
            </button>
          </div>
        </div>
        <p className="text-sm text-zinc-400">
          {mode === 'review' ? 
            'Protech\'s Training and Recruitment Department is dedicated to cultivating an elite security workforce. Through this form, the final decision to hire an individual shall be cast by at least two Recruitment personnel, with the reviewing party at least having attained the departmental rank of Senior Recruitment Officer. This "four-eyes-principle" exists to ensure a streamlined quality of recruitment and to prevent nepotism or favoritism during the recruitment process, along with creating a proper paper trail. If the recommendation and verdict contradict each other, the Recruitment Coordinator is to be informed of a final decision.'
            : 
            'As a member of the Training and Recruitment Department, you are tasked with reviewing the interview results and providing a recommendation. Please be sure to fill out this form in its entirety, and be sure to provide complete logs of your interview with the candidate.'
          }
        </p>
      </div>

      <form className="p-8 space-y-10">
        {mode === 'log' ? (
          <>
            {/* Candidate Information */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
                  <h3>Candidate Information</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Basic information about the candidate.</p>
              </div>

              <div className="space-y-4 ml-10">
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                  placeholder="Candidate Name"
                  className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
                />
                <input
                  type="text"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  placeholder="Application URL"
                  className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
                />
                <div className="space-y-2">
                  <input
                    type="text"
                    name="backgroundCheckImage"
                    value={formData.backgroundCheckImage}
                    onChange={handleChange}
                    placeholder="Background Check Image URL"
                    className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
                  />
                  <p className="text-xs text-zinc-500 italic pl-1">Upload the background check image to Imgur and paste the link here.</p>
                </div>
              </div>
            </div>

            {/* Interview Details */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
                  <h3>Interview Details</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Document the interview process and observations.</p>
              </div>

              <div className="space-y-4 ml-10">
                <input
                  type="text"
                  name="interviewerNames"
                  value={formData.interviewerNames}
                  onChange={handleChange}
                  placeholder="Interviewer Name(s)"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleChange}
                  placeholder="Interview Date (DD/MMM/YYYY)"
                  className={inputClass}
                />
                <textarea
                  name="interviewLog"
                  value={formData.interviewLog}
                  onChange={handleChange}
                  placeholder="Interview Log"
                  className={`${inputClass} min-h-[100px]`}
                />
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500 italic pl-1">
                    Need help with logs? Check out our{' '}
                    <a 
                      href="https://protech.gta.world/forum/viewtopic.php?t=1105"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors underline"
                    >
                      guide on interview logging
                    </a>
                  </p>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="examineLink"
                    value={formData.examineLink}
                    onChange={handleChange}
                    placeholder="Examine Link"
                    className={inputClass}
                  />
                  <p className="text-xs text-zinc-500 italic">Insert the Imgur link of the applicant's /ex command and a picture of their character's appearance.</p>
                </div>
                <textarea
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Document your observations and notes here. Keep it short and precise."
                  className={`${inputClass} min-h-[100px]`}
                />
              </div>
            </div>

            {/* Recommendation */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">3</span>
                  <h3>Recommendation</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Your final recommendation for the candidate.</p>
              </div>

              <div className="flex gap-4 ml-10">
                {[
                  { value: "passed", label: "Passed", color: "text-green-500" },
                  { value: "denied", label: "Denied", color: "text-red-500" },
                  { value: "inconclusive", label: "Inconclusive", color: "text-orange-500" }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, recommendation: option.value as any }))}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      formData.recommendation === option.value
                        ? `bg-white/10 border-transparent ${option.color}`
                        : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">1</span>
                  <h3>Review Details</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Provide your review of the interview.</p>
              </div>

              <div className="space-y-4 ml-10">
                <input
                  type="text"
                  name="reviewerName"
                  value={reviewData.reviewerName}
                  onChange={(e) => setReviewData(prev => ({ ...prev, reviewerName: e.target.value }))}
                  placeholder="Reviewer Name"
                  className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
                />
                <input
                  type="text"
                  name="reviewerRank"
                  value={reviewData.reviewerRank}
                  onChange={(e) => setReviewData(prev => ({ ...prev, reviewerRank: e.target.value }))}
                  placeholder="Reviewer Divisional Rank"
                  className={`${inputClass} transition-all duration-200 focus:translate-x-1`}
                />
                <textarea
                  name="reviewerNotes"
                  value={reviewData.reviewerNotes}
                  onChange={(e) => setReviewData(prev => ({ ...prev, reviewerNotes: e.target.value }))}
                  placeholder="Reviewer Notes"
                  className={`${inputClass} min-h-[100px] transition-all duration-200 focus:translate-x-1`}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-lg font-medium text-white/80">
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">2</span>
                  <h3>Verdict</h3>
                </div>
                <p className="text-sm text-zinc-400 ml-10">Your final verdict on the candidate.</p>
              </div>

              <div className="flex gap-4 ml-10">
                {[
                  { value: "passed", label: "Passed", color: "text-green-500" },
                  { value: "denied", label: "Denied", color: "text-red-500" }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setReviewData(prev => ({ ...prev, verdict: option.value as any }))}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      reviewData.verdict === option.value
                        ? `bg-white/10 border-transparent ${option.color}`
                        : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

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
                navigator.clipboard.writeText(mode === 'review' ? generateReviewBBCode() : generateBBCode());
              }}
              className="group relative flex-1 px-4 py-3 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white rounded-lg transition-all hover:from-fuchsia-400 hover:to-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap"
            >
              <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer"></span>
              Copy BBCode
            </button>
            
            <a
              href="https://protech.gta.world/forum/posting.php?mode=post&f=39"
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