import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PredictionResult } from '../types';

interface PredictionCardProps {
  prediction: PredictionResult;
  title?: string;
  showDetails?: boolean;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction,
  title = 'Placement Probability',
  showDetails = true,
}) => {
  const { probability, riskLevel, positiveFactors, negativeFactors } = prediction;

  // Gauge Parameters
  const radius = 68;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (probability / 100) * circumference;

  let colorClass = 'stroke-indigo-500 text-indigo-400';
  let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  let readinessText = 'HIGH READINESS';

  if (probability < 50 || riskLevel === 'HIGH') {
    colorClass = 'stroke-rose-500 text-rose-400';
    badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    readinessText = 'AT RISK — NEEDS IMPROVEMENT';
  } else if (probability < 75 || riskLevel === 'MEDIUM') {
    colorClass = 'stroke-amber-500 text-amber-400';
    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    readinessText = 'MODERATE READINESS';
  }

  return (
    <div className="glass-card relative overflow-hidden rounded-2xl p-6 shadow-xl border border-slate-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Circular SVG Gauge */}
        <div className="relative flex items-center justify-center">
          <svg className="h-44 w-44 -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background Track Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              strokeWidth={strokeWidth}
              className="stroke-slate-800/80 fill-none"
            />
            {/* Gradient stroke line */}
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              strokeWidth={strokeWidth}
              className={`fill-none ${colorClass}`}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>

          {/* Central Score Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-white tracking-tight">{probability}%</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">SCORE</span>
          </div>
        </div>

        {/* Info & Status Details */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wider mb-2 ${badgeColor}">
              {riskLevel === 'HIGH' ? (
                <AlertTriangle className="h-3.5 w-3.5" />
              ) : (
                <ShieldCheck className="h-3.5 w-3.5" />
              )}
              <span>{readinessText}</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            <p className="text-xs text-slate-400 mt-1">
              Calculated using student academic background, aptitude scores, technical ratings, and interview metrics.
            </p>
          </div>

          {showDetails && (
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800">
                <span className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Key Drivers (+):
                </span>
                <span className="text-slate-300 line-clamp-2">
                  {positiveFactors.slice(0, 2).join(' • ') || 'Good foundational metrics'}
                </span>
              </div>

              <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800">
                <span className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                  <Sparkles className="h-3.5 w-3.5" /> Areas to Boost:
                </span>
                <span className="text-slate-300 line-clamp-2">
                  {negativeFactors.slice(0, 2).join(' • ') || 'Maintain current trajectory'}
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
