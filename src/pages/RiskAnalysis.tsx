import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CohortStudent } from '../types';
import { StudentDetailModal } from '../components/StudentDetailModal';
import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight, UserX, Lightbulb } from 'lucide-react';

export const RiskAnalysis: React.FC = () => {
  const { cohort } = useApp();

  const [activeRiskTab, setActiveRiskTab] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [selectedStudent, setSelectedStudent] = useState<CohortStudent | null>(null);

  const highRisk = cohort.filter((s) => s.riskLevel === 'HIGH');
  const mediumRisk = cohort.filter((s) => s.riskLevel === 'MEDIUM');
  const lowRisk = cohort.filter((s) => s.riskLevel === 'LOW');

  const currentTabStudents =
    activeRiskTab === 'HIGH' ? highRisk : activeRiskTab === 'MEDIUM' ? mediumRisk : lowRisk;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            <h1 className="text-2xl font-bold text-white">Cohort Risk Analysis & Early Intervention</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predictive ML risk classification isolating students requiring immediate skill remediation or academic counseling.
          </p>
        </div>
      </div>

      {/* Risk Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* High Risk Tab */}
        <button
          onClick={() => setActiveRiskTab('HIGH')}
          className={`glass-card rounded-2xl p-5 border text-left transition-all ${
            activeRiskTab === 'HIGH'
              ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10'
              : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-rose-400 uppercase">HIGH RISK CANDIDATES</p>
            <AlertTriangle className="h-5 w-5 text-rose-400" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{highRisk.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Immediate intervention needed</p>
        </button>

        {/* Medium Risk Tab */}
        <button
          onClick={() => setActiveRiskTab('MEDIUM')}
          className={`glass-card rounded-2xl p-5 border text-left transition-all ${
            activeRiskTab === 'MEDIUM'
              ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
              : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-amber-400 uppercase">MODERATE RISK FIT</p>
            <AlertCircle className="h-5 w-5 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{mediumRisk.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Minor skill gaps present</p>
        </button>

        {/* Low Risk Tab */}
        <button
          onClick={() => setActiveRiskTab('LOW')}
          className={`glass-card rounded-2xl p-5 border text-left transition-all ${
            activeRiskTab === 'LOW'
              ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
              : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-400 uppercase">LOW RISK (PLACEMENT READY)</p>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{lowRisk.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Ready for tier-1 interviews</p>
        </button>

      </div>

      {/* Recommended Officer Actions Card */}
      {activeRiskTab === 'HIGH' && (
        <div className="glass-card rounded-2xl p-5 border border-rose-500/20 bg-rose-500/5 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-rose-300">
            <Lightbulb className="h-4 w-4" /> Recommended Officer Remediation Plan:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
            <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800">
              <span className="font-semibold text-rose-400">1. Remedial Aptitude Bootcamp</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Schedule mandatory quantitative & logical reasoning practice tests.</p>
            </div>
            <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800">
              <span className="font-semibold text-rose-400">2. Backlog Clearance Counseling</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Fast-track supplementary exam clearing to restore cutoff eligibility.</p>
            </div>
            <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800">
              <span className="font-semibold text-rose-400">3. Mock HR & Tech Interview</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Assign faculty mentors for 1-on-1 communication practice.</p>
            </div>
          </div>
        </div>
      )}

      {/* Flagged Student List */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-4">
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider">
            {activeRiskTab} RISK COHORT ({currentTabStudents.length} Students)
          </span>
          <span className="text-slate-400 font-mono">Click student to inspect risk breakdown</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {currentTabStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="p-4 sm:p-5 hover:bg-slate-900/60 cursor-pointer transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {student.name}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">({student.id})</span>
                  <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                    {student.department}
                  </span>
                </div>
                
                <p className="text-xs text-slate-400">
                  CGPA: <span className="text-slate-200 font-bold">{student.cgpa}</span> • Aptitude:{' '}
                  <span className="text-slate-200 font-bold">{student.aptitude}%</span> • Technical:{' '}
                  <span className="text-slate-200 font-bold">{student.technicalSkill}%</span> • Backlogs:{' '}
                  <span className={student.backlogs > 0 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                    {student.backlogs}
                  </span>
                </p>

                {/* Flagged Reasons Tags */}
                {student.flaggedReasons && student.flaggedReasons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {student.flaggedReasons.map((reason, i) => (
                      <span key={i} className="rounded-md bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Placement Probability</p>
                  <p className="text-xl font-extrabold text-white">{student.probability}%</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}

    </div>
  );
};
