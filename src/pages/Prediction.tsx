import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PredictionCard } from '../components/PredictionCard';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Link } from 'react-router-dom';

export const Prediction: React.FC = () => {
  const { prediction } = useApp();
  const [isSimulating, setIsSimulating] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const simulationSteps = [
    'Analyzing academic performance & CGPA metrics...',
    'Evaluating aptitude, logical & verbal reasoning scores...',
    'Testing technical DSA, Java, SQL & ML coding proficiency...',
    'Simulating Random Forest ensemble decision classification...',
    'Generating final placement readiness & company match fit...',
  ];

  useEffect(() => {
    setIsSimulating(true);
    setStepIndex(0);

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= simulationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsSimulating(false), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const handleRerun = () => {
    setIsSimulating(true);
    setStepIndex(0);
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= simulationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsSimulating(false), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 350);
  };

  const featureChartData = prediction.featureImportance.map((f) => ({
    name: f.name,
    score: Math.max(0, f.impactPercentage),
    status: f.status,
  }));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Simulation Scanning Loader */}
      {isSimulating ? (
        <div className="glass-panel min-h-[400px] flex flex-col items-center justify-center rounded-3xl p-8 text-center border border-indigo-500/30 space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500" />
            <Sparkles className="absolute h-8 w-8 text-indigo-400 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-bold text-white">AI Prediction Engine Running</h3>
            <p className="text-xs text-indigo-300 font-mono transition-all">
              {simulationSteps[stepIndex]}
            </p>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full max-w-xs bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((stepIndex + 1) / simulationSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h1 className="text-2xl font-bold text-white">Placement Prediction Result</h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Deterministic ML scoring algorithm evaluation complete.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRerun}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all"
              >
                <RefreshCw className="h-4 w-4" /> Re-run Simulation
              </button>

              <Link
                to="/simulator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
              >
                <span>What-If Simulator ⭐</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Main SVG Gauge Card */}
          <PredictionCard prediction={prediction} />

          {/* Positive vs Negative Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Positive Contributing Factors */}
            <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-emerald-500/5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-400">Positive Factors (+)</h3>
                  <p className="text-[11px] text-slate-400">Key metrics boosting your score</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs">
                {prediction.positiveFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-center gap-2 rounded-xl bg-slate-900/60 p-3 border border-slate-800 text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Negative Contributing Factors */}
            <div className="glass-card rounded-2xl p-6 border border-amber-500/20 bg-amber-500/5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                  <AlertTriangle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-400">Areas Hindering Score (-)</h3>
                  <p className="text-[11px] text-slate-400">Factors holding back higher probability</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs">
                {prediction.negativeFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-center gap-2 rounded-xl bg-slate-900/60 p-3 border border-slate-800 text-slate-200">
                    <span className="text-amber-400 font-bold">!</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Feature Importance Bar Chart */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-indigo-400" /> Feature Importance Impact Breakdown
                </h3>
                <p className="text-xs text-slate-400">Weighted contribution of profile parameters</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureChartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-15} textAnchor="end" />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="score" name="Feature Score %" radius={[6, 6, 0, 0]}>
                    {featureChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.status === 'positive' ? '#10b981' : entry.status === 'negative' ? '#f43f5e' : '#6366f1'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
};
