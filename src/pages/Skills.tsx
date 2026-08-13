import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, AlertTriangle, AlertCircle, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Skills: React.FC = () => {
  const { profile } = useApp();

  // Target benchmarks for Tier-1 company cutoffs
  const targets = {
    dsa: 75,
    communication: 80,
    aptitude: 78,
    java: 70,
    sql: 75,
    python: 70,
    machineLearning: 65,
  };

  const skillsList = [
    { name: 'Data Structures & Algorithms (DSA)', current: profile.dsa, target: targets.dsa },
    { name: 'Professional Communication', current: profile.communication, target: targets.communication },
    { name: 'Quantitative Aptitude', current: profile.aptitude, target: targets.aptitude },
    { name: 'Java Programming', current: profile.java, target: targets.java },
    { name: 'SQL & Relational Databases', current: profile.sql, target: targets.sql },
    { name: 'Python Programming', current: profile.python, target: targets.python },
    { name: 'Machine Learning Basics', current: profile.machineLearning, target: targets.machineLearning },
  ].map((s) => {
    const gap = s.target - s.current;
    let status: 'Critical' | 'Needs Improvement' | 'Good' = 'Good';
    let statusStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

    if (gap >= 15) {
      status = 'Critical';
      statusStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    } else if (gap > 0) {
      status = 'Needs Improvement';
      statusStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }

    return {
      ...s,
      gap: gap > 0 ? `+${gap} pts` : '0 (Target Met)',
      gapValue: gap,
      status,
      statusStyle,
    };
  });

  const criticalCount = skillsList.filter((s) => s.status === 'Critical').length;
  const improvementCount = skillsList.filter((s) => s.status === 'Needs Improvement').length;
  const goodCount = skillsList.filter((s) => s.status === 'Good').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white">Dynamic Skill Gap Analysis</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated comparison of your current ratings against Tier-1 company recruitment benchmarks.
          </p>
        </div>

        <Link
          to="/simulator"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
        >
          <Sliders className="h-4 w-4" />
          <span>Simulate Skill Upgrades ⭐</span>
        </Link>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Critical Gap Skills</p>
            <p className="text-3xl font-black text-rose-400 mt-1">{criticalCount}</p>
            <p className="text-[11px] text-slate-400">Gap &gt;= 15 points</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Needs Improvement</p>
            <p className="text-3xl font-black text-amber-400 mt-1">{improvementCount}</p>
            <p className="text-[11px] text-slate-400">Gap 1 to 14 points</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Benchmark Met (Good)</p>
            <p className="text-3xl font-black text-emerald-400 mt-1">{goodCount}</p>
            <p className="text-[11px] text-slate-400">Current &gt;= Target</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Skill Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Competency Breakdown Table</h3>
          <span className="text-xs text-slate-400 font-mono">Calculated for {profile.name}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Skill Area</th>
                <th className="px-6 py-3.5">Current Score</th>
                <th className="px-6 py-3.5">Target Benchmark</th>
                <th className="px-6 py-3.5">Skill Gap</th>
                <th className="px-6 py-3.5">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {skillsList.map((skill, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{skill.name}</td>
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-indigo-400">{skill.current}%</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-400">{skill.target}%</td>
                  <td className="px-6 py-4 font-bold">
                    <span className={skill.gapValue > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                      {skill.gap}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-extrabold ${skill.statusStyle}`}>
                      {skill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
