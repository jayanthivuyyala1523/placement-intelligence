import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculatePrediction } from '../lib/predictionEngine';
import { Sliders, TrendingUp, RefreshCw, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export const Simulator: React.FC = () => {
  const { profile, prediction: currentPrediction, updateProfile } = useApp();

  // Simulated state initially set to current profile values
  const [simValues, setSimValues] = useState({
    cgpa: profile.cgpa,
    aptitude: profile.aptitude,
    dsa: profile.dsa,
    communication: profile.communication,
    projectsCount: profile.projectsCount,
    internshipsCount: profile.internshipsCount,
  });

  const [applySuccess, setApplySuccess] = useState(false);

  // Compute live simulated prediction
  const simulatedProfile = {
    ...profile,
    ...simValues,
  };

  const simulatedPrediction = calculatePrediction(simulatedProfile);

  const currentProb = currentPrediction.probability;
  const simProb = simulatedPrediction.probability;
  const delta = Number((simProb - currentProb).toFixed(1));

  // Individual feature delta calculations
  const cgpaDelta = Number(
    (calculatePrediction({ ...profile, cgpa: simValues.cgpa }).probability - currentProb).toFixed(1)
  );
  const aptitudeDelta = Number(
    (calculatePrediction({ ...profile, aptitude: simValues.aptitude }).probability - currentProb).toFixed(1)
  );
  const dsaDelta = Number(
    (calculatePrediction({ ...profile, dsa: simValues.dsa }).probability - currentProb).toFixed(1)
  );
  const commDelta = Number(
    (calculatePrediction({ ...profile, communication: simValues.communication }).probability - currentProb).toFixed(1)
  );
  const projectDelta = Number(
    (calculatePrediction({ ...profile, projectsCount: simValues.projectsCount }).probability - currentProb).toFixed(1)
  );
  const internshipDelta = Number(
    (calculatePrediction({ ...profile, internshipsCount: simValues.internshipsCount }).probability - currentProb).toFixed(1)
  );

  const impacts = [
    { label: 'CGPA', delta: cgpaDelta, val: simValues.cgpa },
    { label: 'Quantitative Aptitude', delta: aptitudeDelta, val: `${simValues.aptitude}%` },
    { label: 'DSA Coding Rating', delta: dsaDelta, val: `${simValues.dsa}%` },
    { label: 'Communication', delta: commDelta, val: `${simValues.communication}%` },
    { label: 'Projects Portfolio', delta: projectDelta, val: `${simValues.projectsCount} projects` },
    { label: 'Internships', delta: internshipDelta, val: `${simValues.internshipsCount} internships` },
  ];

  const handleSliderChange = (field: keyof typeof simValues, value: number) => {
    setSimValues((prev) => ({ ...prev, [field]: value }));
    setApplySuccess(false);
  };

  const handleReset = () => {
    setSimValues({
      cgpa: profile.cgpa,
      aptitude: profile.aptitude,
      dsa: profile.dsa,
      communication: profile.communication,
      projectsCount: profile.projectsCount,
      internshipsCount: profile.internshipsCount,
    });
    setApplySuccess(false);
  };

  const handleApplyChanges = () => {
    updateProfile(simValues);
    setApplySuccess(true);
    setTimeout(() => setApplySuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">What-If Score Simulator ⭐</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactively adjust your academic & skill parameters to see real-time placement probability boosts.
          </p>
        </div>

        {applySuccess && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Applied to Profile!
          </div>
        )}
      </div>

      {/* Comparison Gauge Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/30 bg-indigo-500/5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
          
          {/* Current Probability */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">CURRENT PROBABILITY</p>
            <p className="text-4xl font-extrabold text-slate-300">{currentProb}%</p>
            <span className="inline-block text-[11px] font-semibold text-slate-400">Baseline Score</span>
          </div>

          {/* Arrow & Delta */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <ArrowRight className="h-6 w-6" />
            </div>
            
            <div className="flex items-center gap-1.5 font-extrabold text-sm">
              <span>Potential Impact:</span>
              <span className={`rounded-full px-3 py-1 text-xs border ${
                delta > 0
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : delta < 0
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {delta > 0 ? `+${delta}%` : `${delta}%`}
              </span>
            </div>
          </div>

          {/* Simulated Probability */}
          <div className="glass-card rounded-2xl p-5 border border-indigo-500/40 bg-indigo-500/10 space-y-1">
            <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">SIMULATED PROBABILITY</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              {simProb}%
            </p>
            <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
              simProb >= 75 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {simulatedPrediction.riskLevel} RISK FIT
            </span>
          </div>

        </div>
      </div>

      {/* Main Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interactive Sliders */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="h-4.5 w-4.5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Adjust Skill & Score Sliders</h3>
          </div>

          <div className="space-y-5 text-xs">
            {/* CGPA */}
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-slate-300">Target CGPA (4.0 - 10.0)</span>
                <span className="text-indigo-400 font-extrabold">{simValues.cgpa}</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="10.0"
                step="0.1"
                value={simValues.cgpa}
                onChange={(e) => handleSliderChange('cgpa', parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Aptitude */}
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-slate-300">Quantitative Aptitude (0 - 100%)</span>
                <span className="text-cyan-400 font-extrabold">{simValues.aptitude}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simValues.aptitude}
                onChange={(e) => handleSliderChange('aptitude', parseInt(e.target.value))}
                className="w-full accent-cyan-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* DSA */}
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-slate-300">Data Structures & Algorithms (0 - 100%)</span>
                <span className="text-purple-400 font-extrabold">{simValues.dsa}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simValues.dsa}
                onChange={(e) => handleSliderChange('dsa', parseInt(e.target.value))}
                className="w-full accent-purple-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Communication */}
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-slate-300">Communication Skills (0 - 100%)</span>
                <span className="text-emerald-400 font-extrabold">{simValues.communication}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simValues.communication}
                onChange={(e) => handleSliderChange('communication', parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Projects */}
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-slate-300">Major Projects Portfolio (0 - 10)</span>
                <span className="text-amber-400 font-extrabold">{simValues.projectsCount}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={simValues.projectsCount}
                onChange={(e) => handleSliderChange('projectsCount', parseInt(e.target.value))}
                className="w-full accent-amber-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Internships */}
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-slate-300">Industry Internships (0 - 5)</span>
                <span className="text-rose-400 font-extrabold">{simValues.internshipsCount}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={simValues.internshipsCount}
                onChange={(e) => handleSliderChange('internshipsCount', parseInt(e.target.value))}
                className="w-full accent-rose-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Impact Breakdown Table */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Zap className="h-4.5 w-4.5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Individual Parameter Impact Breakdown</h3>
            </div>

            <div className="space-y-2.5">
              {impacts.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl bg-slate-900/60 p-3 border border-slate-800/80 text-xs">
                  <div>
                    <span className="font-semibold text-slate-200">{item.label}</span>
                    <span className="text-[11px] text-slate-400 ml-2">({item.val})</span>
                  </div>
                  
                  <span className={`font-extrabold rounded-lg px-2.5 py-1 text-xs ${
                    item.delta > 0
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : item.delta < 0
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.delta > 0 ? `+${item.delta}%` : `${item.delta}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/80">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all"
            >
              <RefreshCw className="h-4 w-4" /> Reset Sliders
            </button>

            <button
              onClick={handleApplyChanges}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
            >
              <TrendingUp className="h-4 w-4" /> Apply Changes to Profile
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
