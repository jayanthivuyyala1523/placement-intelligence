import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEMO_PROFILES } from '../data/students';
import { UserCheck, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { selectDemoProfile, setRole } = useApp();
  const navigate = useNavigate();

  const handleSelectStudent = (key: 'high' | 'average' | 'risk') => {
    selectDemoProfile(key);
    navigate('/dashboard');
  };

  const handleSelectOfficer = () => {
    setRole('officer');
    navigate('/admin');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950">
      
      {/* Background orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full bg-gradient-to-r from-indigo-600/15 via-cyan-500/10 to-transparent blur-[100px]" />

      <div className="relative w-full max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>DEMO AUTHENTICATION PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Select Demo Experience Mode
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Choose a pre-configured student profile or sign in as a Placement Officer to explore complete analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Student Profile Selection Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Continue as Student</h3>
                  <p className="text-xs text-slate-400">Explore personal score prediction & What-If simulator</p>
                </div>
              </div>

              {/* Student Profiles List */}
              <div className="space-y-3">
                {/* High Performer */}
                <button
                  onClick={() => handleSelectStudent('high')}
                  className="w-full flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {DEMO_PROFILES.high.name}
                      </span>
                      <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold">
                        HIGH PERFORMER
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      CGPA: 9.1 • Aptitude: 88% • DSA: 88% • Backlogs: 0
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Average Performer */}
                <button
                  onClick={() => handleSelectStudent('average')}
                  className="w-full flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {DEMO_PROFILES.average.name}
                      </span>
                      <span className="rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-extrabold">
                        AVERAGE PERFORMER
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      CGPA: 7.4 • Aptitude: 68% • DSA: 62% • Backlogs: 0
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </button>

                {/* At Risk */}
                <button
                  onClick={() => handleSelectStudent('risk')}
                  className="w-full flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left hover:border-rose-500/50 hover:bg-slate-800/80 transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                        {DEMO_PROFILES.risk.name}
                      </span>
                      <span className="rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 text-[10px] font-extrabold">
                        AT RISK
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      CGPA: 5.9 • Aptitude: 48% • DSA: 40% • Backlogs: 2
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Selecting a student profile loads live score calculation & personalized company matches.
            </p>
          </div>

          {/* Placement Officer Selection Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Continue as Placement Officer</h3>
                  <p className="text-xs text-slate-400">Manage cohort metrics, student analytics & risk analysis</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 space-y-3 text-xs text-slate-300">
                <p className="font-semibold text-slate-200">Officer Dashboard Privileges:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Real-time overview of 150+ seeded student records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Distribution charts: CGPA vs Placement, Aptitude fit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Filter by department, risk severity, and backlogs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Searchable student directory & risk classification</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSelectOfficer}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-purple-600/20 hover:from-purple-500 hover:to-indigo-500 transition-all"
            >
              <span>Access Placement Officer Portal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
