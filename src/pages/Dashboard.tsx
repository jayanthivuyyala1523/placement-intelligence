import React from 'react';
import { useApp } from '../context/AppContext';
import { PredictionCard } from '../components/PredictionCard';
import { StatCard } from '../components/StatCard';
import {
  TrendingUp,
  Award,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { profile, prediction } = useApp();

  const { probability, readinessScore, riskLevel, strengths, weaknesses, companyMatches } = prediction;

  const eligibleCompaniesCount = companyMatches.filter((c) => c.matchScore >= 70).length;

  // Placement Trend line chart mock data based on CGPA trajectory
  const trendData = [
    { sem: 'Sem 1', probability: Math.max(30, probability - 22) },
    { sem: 'Sem 2', probability: Math.max(35, probability - 18) },
    { sem: 'Sem 3', probability: Math.max(40, probability - 12) },
    { sem: 'Sem 4', probability: Math.max(50, probability - 8) },
    { sem: 'Sem 5', probability: Math.max(60, probability - 4) },
    { sem: 'Sem 6 (Current)', probability: probability },
  ];

  // Skill radar chart data
  const skillData = [
    { subject: 'DSA', score: profile.dsa, fullMark: 100 },
    { subject: 'Java', score: profile.java, fullMark: 100 },
    { subject: 'Python', score: profile.python, fullMark: 100 },
    { subject: 'SQL', score: profile.sql, fullMark: 100 },
    { subject: 'Aptitude', score: profile.aptitude, fullMark: 100 },
    { subject: 'Communication', score: profile.communication, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Welcome back, {profile.name} 👋</h1>
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              {profile.profileType}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Department of {profile.department} • CGPA {profile.cgpa} • {profile.backlogs} Backlogs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/simulator"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            <Sliders className="h-4 w-4" />
            <span>What-If Simulator ⭐</span>
          </Link>
          <Link
            to="/prediction"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-all"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Run AI Prediction</span>
          </Link>
        </div>
      </div>

      {/* Main Placement Probability Circular Gauge */}
      <PredictionCard prediction={prediction} />

      {/* Four Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Placement Probability"
          value={`${probability}%`}
          subtitle="Estimated campus selection probability"
          badgeText={probability >= 75 ? 'Top Tier Candidate' : probability >= 55 ? 'Average Fit' : 'Requires Effort'}
          badgeVariant={probability >= 75 ? 'success' : probability >= 55 ? 'warning' : 'danger'}
          icon={TrendingUp}
          iconBg="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
        />

        <StatCard
          title="Readiness Score"
          value={`${readinessScore} / 100`}
          subtitle="Overall interview preparedness index"
          badgeText={readinessScore >= 80 ? 'Placement Ready' : 'In Progress'}
          badgeVariant={readinessScore >= 80 ? 'success' : 'warning'}
          icon={Award}
          iconBg="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        />

        <StatCard
          title="Company Matches"
          value={`${eligibleCompaniesCount} Companies`}
          subtitle="Matching >= 70% requirements"
          badgeText={`${companyMatches.length} Total Evaluated`}
          badgeVariant="info"
          icon={Building2}
          iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />

        <StatCard
          title="Risk Classification"
          value={`${riskLevel} RISK`}
          subtitle="Academic & skill risk factor level"
          badgeText={riskLevel === 'LOW' ? 'Low Risk' : riskLevel === 'MEDIUM' ? 'Moderate Risk' : 'High Risk'}
          badgeVariant={riskLevel === 'LOW' ? 'success' : riskLevel === 'MEDIUM' ? 'warning' : 'danger'}
          icon={ShieldCheck}
          iconBg={riskLevel === 'LOW' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}
        />
      </div>

      {/* Interactive Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Placement Trend Line Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Placement Trend Trajectory</h3>
            <p className="text-xs text-slate-400">Historical prediction progression across semesters</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="sem" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Line
                  type="monotone"
                  dataKey="probability"
                  name="Probability %"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Performance Radar Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Skill Performance Profile</h3>
            <p className="text-xs text-slate-400">Technical competency rating vs benchmark</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
                <Radar name="Student Skill" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Strengths & Weaknesses Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-emerald-500/5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-400">Primary Strengths</h3>
              <p className="text-[11px] text-slate-400">Areas positively boosting your readiness score</p>
            </div>
          </div>

          <ul className="space-y-2 text-xs">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 rounded-xl bg-slate-900/60 p-3 border border-slate-800 text-slate-200">
                <span className="mt-0.5 text-emerald-400 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvement Areas */}
        <div className="glass-card rounded-2xl p-6 border border-amber-500/20 bg-amber-500/5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-400">Improvement Areas</h3>
              <p className="text-[11px] text-slate-400">Target metrics to focus on before recruitment season</p>
            </div>
          </div>

          <ul className="space-y-2 text-xs">
            {weaknesses.map((weak, idx) => (
              <li key={idx} className="flex items-start gap-2 rounded-xl bg-slate-900/60 p-3 border border-slate-800 text-slate-200">
                <span className="mt-0.5 text-amber-400 font-bold">!</span>
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
