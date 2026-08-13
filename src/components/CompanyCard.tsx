import React, { useState } from 'react';
import { CompanyProfile, CompanyMatchResult } from '../types';
import { Building2, CheckCircle2, XCircle, ChevronRight, Award, MapPin } from 'lucide-react';

interface CompanyCardProps {
  company: CompanyProfile;
  match: CompanyMatchResult;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, match }) => {
  const [showModal, setShowModal] = useState(false);

  const matchColor =
    match.matchScore >= 80
      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      : match.matchScore >= 60
      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
      : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

  return (
    <>
      <div className="glass-card relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 border border-slate-800 hover:border-indigo-500/40 transition-all duration-200 hover:shadow-lg group">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border font-bold text-base shadow-sm ${company.logoBg}`}>
                {company.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {company.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium">{company.role}</p>
              </div>
            </div>

            {/* Match Score Badge */}
            <div className={`flex flex-col items-end rounded-xl border px-3 py-1 text-center ${matchColor}`}>
              <span className="text-base font-extrabold leading-none">{match.matchScore}%</span>
              <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">MATCH</span>
            </div>
          </div>

          {/* Package & Tier */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-y border-slate-800/80 py-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-1 font-semibold text-emerald-400">
              <Award className="h-3.5 w-3.5" />
              <span>₹{company.packageLpa} LPA</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
              <span>{company.location.split('/')[0]}</span>
            </div>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
              {company.tier}
            </span>
          </div>

          {/* Key Requirement Badges */}
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Required CGPA:</span>
              <span className="font-semibold text-slate-200">{company.minCgpa}+</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Required Aptitude:</span>
              <span className="font-semibold text-slate-200">{company.minAptitude}%</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Max Backlogs:</span>
              <span className="font-semibold text-slate-200">{company.maxBacklogs}</span>
            </div>
          </div>

          {/* Skill Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {company.requiredSkills.map((skill) => (
              <span key={skill} className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 py-2.5 text-xs font-semibold text-slate-200 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white transition-all"
        >
          <span>View Detailed Eligibility</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Criteria Breakdown Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border text-lg font-extrabold ${company.logoBg}`}>
                  {company.name.slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{company.name} Eligibility Analysis</h3>
                  <p className="text-xs text-slate-400">{company.role} • ₹{company.packageLpa} LPA</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Overall Fit Summary */}
            <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4 border border-slate-800">
              <div>
                <p className="text-xs text-slate-400">Match Fit Assessment</p>
                <p className="text-sm font-bold text-slate-200 mt-0.5">
                  {match.matchScore >= 80
                    ? 'High Probability of Selection'
                    : match.matchScore >= 60
                    ? 'Moderate Fit — Skills Action Required'
                    : 'Low Match — High Gap to Cutoff'}
                </p>
              </div>
              <span className={`text-xl font-extrabold rounded-xl px-3 py-1 border ${matchColor}`}>
                {match.matchScore}%
              </span>
            </div>

            {/* Criteria Checklist */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Criteria Checklist Breakdown</h5>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-300 font-medium">Academic CGPA (Cutoff: {company.minCgpa})</span>
                  {match.cgpaPassed ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Met
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-rose-400">
                      <XCircle className="h-4 w-4" /> Below Cutoff
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-300 font-medium">Backlogs (Max allowed: {company.maxBacklogs})</span>
                  {match.backlogsPassed ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Eligible
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-rose-400">
                      <XCircle className="h-4 w-4" /> Exceeded Limit
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-300 font-medium">Aptitude & Logical (Min: {company.minAptitude}%)</span>
                  {match.aptitudePassed ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Qualified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-rose-400">
                      <XCircle className="h-4 w-4" /> Needs Practice
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-300 font-medium">Technical Skill (Min: {company.minTechnical}%)</span>
                  {match.technicalPassed ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Competent
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-rose-400">
                      <XCircle className="h-4 w-4" /> Skill Gap
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-300 font-medium">Communication (Min: {company.minCommunication}%)</span>
                  {match.communicationPassed ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Satisfactory
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-rose-400">
                      <XCircle className="h-4 w-4" /> Below Bar
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Explanations */}
            {match.missingRequirements.length > 0 && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs">
                <p className="font-bold text-rose-300 mb-1">Gap Breakdown to Address:</p>
                <ul className="list-disc list-inside space-y-1 text-rose-200/90">
                  {match.missingRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </>
  );
};
