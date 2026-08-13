import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BarChart2,
  Sliders,
  Building2,
  CheckCircle2,
  TrendingUp,
  Brain,
  Award
} from 'lucide-react';

export const Landing: React.FC = () => {
  const stats = [
    { value: '450+', label: 'Students Analyzed', icon: UsersIcon },
    { value: '93%', label: 'Model Accuracy', icon: ShieldCheck },
    { value: '0.91', label: 'F1 Score Benchmark', icon: Brain },
    { value: '12+', label: 'Placement Insights', icon: Sparkles },
  ];

  const features = [
    {
      title: 'Deterministic Prediction Engine',
      description: 'Calculates placement probabilities (0-99%) using multi-weight scoring across CGPA, DSA, aptitude, and communication.',
      icon: TrendingUp,
      color: 'from-indigo-500 to-cyan-400',
    },
    {
      title: 'What-If Score Simulator ⭐',
      description: 'Adjust CGPA, DSA, and soft skills sliders to instantly see simulated probability boosts (+14.4%) in real time.',
      icon: Sliders,
      color: 'from-cyan-400 to-emerald-400',
    },
    {
      title: 'Dynamic Skill Gap Analysis',
      description: 'Automatically compares student competencies against target benchmarks and flags Critical vs Good skill areas.',
      icon: BarChart2,
      color: 'from-amber-400 to-rose-400',
    },
    {
      title: 'Company Cutoff Matching',
      description: 'Matches student profiles with 12+ company criteria, providing clear pass/fail breakdown for tier-1 recruiters.',
      icon: Building2,
      color: 'from-violet-500 to-indigo-500',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Background Glowing Orbs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-cyan-500/10 to-transparent blur-[120px]" />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 backdrop-blur-md mb-8"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>AI-POWERED CAMPUS PLACEMENT INTELLIGENCE</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Placement<span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Scope</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl sm:text-2xl font-bold tracking-wide text-indigo-300"
          >
            Predict. Prepare. Get Placed.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            AI-powered placement intelligence that estimates student placement probability and identifies the skills needed to improve placement readiness.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-500/25 hover:scale-105 transition-all duration-200"
            >
              <span>Check My Placement Score</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-8 py-4 text-sm font-extrabold text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white transition-all duration-200"
            >
              <span>Explore Demo</span>
            </Link>
          </motion.div>

          {/* Animated Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 text-center hover:border-slate-700 transition-all">
                <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Visual Preview Section */}
      <section className="relative py-12 border-t border-slate-800/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Interactive Dashboard Preview</h2>
            <p className="text-sm text-slate-400 mt-2">Real-time placement likelihood gauge with dynamic skill breakdown</p>
          </div>

          <div className="glass-panel relative rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              
              {/* Score Circular Preview */}
              <div className="glass-card rounded-2xl p-6 text-center border border-indigo-500/20 bg-indigo-500/5">
                <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold mb-4">
                  HIGH READINESS
                </span>
                <div className="text-6xl font-black text-white">87.4%</div>
                <p className="text-xs text-slate-400 mt-2 font-semibold uppercase tracking-wider">Placement Probability</p>
                <div className="mt-4 flex justify-center gap-2 text-[11px] text-slate-300">
                  <span className="rounded bg-slate-900 px-2 py-1">CGPA: 9.1</span>
                  <span className="rounded bg-slate-900 px-2 py-1">DSA: 88%</span>
                  <span className="rounded bg-slate-900 px-2 py-1">Aptitude: 88%</span>
                </div>
              </div>

              {/* Strengths & Weaknesses Preview */}
              <div className="space-y-4 lg:col-span-2">
                <div className="glass-card rounded-2xl p-4 border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Strongest Factors
                  </h4>
                  <p className="text-xs text-slate-300">
                    High CGPA (9.1), Strong DSA Problem Solving (88%), Multiple Full-Stack Projects, Clean Academic Record (0 Backlogs).
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-4 border border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4" /> Company Eligibility Fit
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1">
                      Google — 94% Match
                    </span>
                    <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1">
                      Microsoft — 91% Match
                    </span>
                    <span className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1">
                      Amazon — 87% Match
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all duration-200">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${f.color} text-slate-950 shadow-md mb-5`}>
                    <Icon className="h-6 w-6 font-bold" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-400">
        <p>© 2026 PlacementScope AI Platform. Predict. Prepare. Get Placed.</p>
      </footer>

    </div>
  );
};

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
