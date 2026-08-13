import React from 'react';
import { CohortStudent } from '../types';
import { ShieldAlert, CheckCircle2, User, BookOpen, Brain, Briefcase, Award } from 'lucide-react';

interface StudentDetailModalProps {
  student: CohortStudent;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  const riskBadge =
    student.riskLevel === 'HIGH'
      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
      : student.riskLevel === 'MEDIUM'
      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <User className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{student.name}</h3>
                <span className="text-xs text-slate-400 font-mono">({student.id})</span>
              </div>
              <p className="text-xs text-slate-400">{student.email} • {student.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Prediction Summary Pill */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Placement Probability</p>
            <p className="text-xl font-extrabold text-white mt-1">{student.probability}%</p>
          </div>
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Risk Classification</p>
            <span className={`inline-block mt-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${riskBadge}`}>
              {student.riskLevel} RISK
            </span>
          </div>
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Academic CGPA</p>
            <p className="text-xl font-extrabold text-indigo-400 mt-1">{student.cgpa}</p>
          </div>
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Status</p>
            <p className="text-xs font-bold text-slate-200 mt-2">{student.placementStatus}</p>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-400 mb-2">
              <BookOpen className="h-4 w-4" /> Academic & Backlogs
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Cumulative CGPA:</span>
              <span className="font-bold">{student.cgpa} / 10.0</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Active Backlogs:</span>
              <span className={`font-bold ${student.backlogs > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {student.backlogs}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-cyan-400 mb-2">
              <Brain className="h-4 w-4" /> Aptitude & Technical
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Aptitude Score:</span>
              <span className="font-bold">{student.aptitude}%</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Technical Skills Rating:</span>
              <span className="font-bold">{student.technicalSkill}%</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Communication Rating:</span>
              <span className="font-bold">{student.communication}%</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400 mb-2">
              <Briefcase className="h-4 w-4" /> Projects & Experience
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Major Projects Count:</span>
              <span className="font-bold">{student.projectsCount}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Industry Internships:</span>
              <span className="font-bold">{student.internshipsCount}</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-2">
              <Award className="h-4 w-4" /> Target Placement Fit
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Target Tier Benchmark:</span>
              <span className="font-bold">{student.targetCompany || 'General Mass Recruiter'}</span>
            </div>
          </div>

        </div>

        {/* Flagged Reasons for High Risk */}
        {student.flaggedReasons && student.flaggedReasons.length > 0 && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-rose-300 mb-2">
              <ShieldAlert className="h-4 w-4" /> Primary Identified Risk Factors:
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc list-inside text-rose-200">
              {student.flaggedReasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
        >
          Close Detail View
        </button>

      </div>
    </div>
  );
};
