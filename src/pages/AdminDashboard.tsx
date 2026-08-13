import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  Award,
  Filter,
  BarChart3,
  TrendingUp,
  Brain
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { cohort } = useApp();

  // Filters State
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [minCgpaFilter, setMinCgpaFilter] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Filtered Cohort Data
  const filteredCohort = cohort.filter((student) => {
    const matchesDept = selectedDept === 'ALL' || student.department === selectedDept;
    const matchesRisk = selectedRisk === 'ALL' || student.riskLevel === selectedRisk;
    const matchesCgpa = student.cgpa >= minCgpaFilter;
    const matchesStatus = selectedStatus === 'ALL' || student.placementStatus === selectedStatus;

    return matchesDept && matchesRisk && matchesCgpa && matchesStatus;
  });

  // Calculate Officer Overview Metrics
  const totalStudents = filteredCohort.length;
  const highReadiness = filteredCohort.filter((s) => s.probability >= 75).length;
  const mediumReadiness = filteredCohort.filter((s) => s.probability >= 50 && s.probability < 75).length;
  const atRiskStudents = filteredCohort.filter((s) => s.riskLevel === 'HIGH').length;
  const placedCount = filteredCohort.filter((s) => s.placementStatus === 'Placed').length;

  // Chart 1: Placement Probability Distribution
  const probDist = [
    { range: '0-40%', count: filteredCohort.filter((s) => s.probability < 40).length },
    { range: '40-60%', count: filteredCohort.filter((s) => s.probability >= 40 && s.probability < 60).length },
    { range: '60-80%', count: filteredCohort.filter((s) => s.probability >= 60 && s.probability < 80).length },
    { range: '80-100%', count: filteredCohort.filter((s) => s.probability >= 80).length },
  ];

  // Chart 2: Readiness Pie Breakdown
  const readinessPieData = [
    { name: 'High Readiness (>=75%)', value: highReadiness, color: '#10b981' },
    { name: 'Medium Readiness (50-74%)', value: mediumReadiness, color: '#f59e0b' },
    { name: 'High Risk (<50%)', value: atRiskStudents, color: '#f43f5e' },
  ];

  // Chart 3: CGPA vs Placement Probability Scatter/Points
  const scatterData = filteredCohort.map((s) => ({
    cgpa: s.cgpa,
    probability: s.probability,
    name: s.name,
  }));

  // Chart 4: Department Performance Averages
  const depts = ['Computer Science', 'Information Technology', 'Electronics', 'Data Science', 'Mechanical'];
  const deptAvgData = depts.map((dept) => {
    const deptStudents = filteredCohort.filter((s) => s.department === dept);
    const avgProb =
      deptStudents.length > 0
        ? Math.round(deptStudents.reduce((acc, curr) => acc + curr.probability, 0) / deptStudents.length)
        : 0;

    return {
      department: dept.replace('Computer Science', 'CSE').replace('Information Technology', 'IT'),
      avgProbability: avgProb,
    };
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header & Filter Controls Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              <h1 className="text-2xl font-bold text-white">Placement Officer Command Dashboard</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time analytics and predictive ML cohort monitoring across campus departments.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1">
              Showing {filteredCohort.length} / {cohort.length} Students
            </span>
          </div>
        </div>

        {/* Interactive Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-xs">
          
          {/* Department Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Data Science">Data Science</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1">Risk Level</label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>
          </div>

          {/* Min CGPA Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1">Minimum CGPA ({minCgpaFilter}+)</label>
            <select
              value={minCgpaFilter}
              onChange={(e) => setMinCgpaFilter(parseFloat(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value={0}>All CGPA Ranges</option>
              <option value={6.0}>CGPA &gt;= 6.0</option>
              <option value={7.0}>CGPA &gt;= 7.0</option>
              <option value={8.0}>CGPA &gt;= 8.0</option>
            </select>
          </div>

          {/* Placement Status Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1">Placement Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Placed">Placed</option>
              <option value="In Process">In Process</option>
              <option value="Not Started">Not Started</option>
              <option value="Needs Assistance">Needs Assistance</option>
            </select>
          </div>

        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Cohort"
          value={totalStudents}
          subtitle="Filtered student records"
          icon={Users}
          iconBg="bg-indigo-500/10 text-indigo-400"
        />

        <StatCard
          title="High Readiness"
          value={highReadiness}
          subtitle="Prob >= 75%"
          badgeText={`${Math.round((highReadiness / (totalStudents || 1)) * 100)}% of cohort`}
          badgeVariant="success"
          icon={ShieldCheck}
          iconBg="bg-emerald-500/10 text-emerald-400"
        />

        <StatCard
          title="Medium Readiness"
          value={mediumReadiness}
          subtitle="Prob 50-74%"
          badgeVariant="warning"
          icon={Brain}
          iconBg="bg-amber-500/10 text-amber-400"
        />

        <StatCard
          title="At Risk Students"
          value={atRiskStudents}
          subtitle="Action required"
          badgeText="High Priority"
          badgeVariant="danger"
          icon={AlertTriangle}
          iconBg="bg-rose-500/10 text-rose-400"
        />

        <StatCard
          title="Already Placed"
          value={placedCount}
          subtitle="Offers confirmed"
          badgeText={`${Math.round((placedCount / (totalStudents || 1)) * 100)}% rate`}
          badgeVariant="success"
          icon={Award}
          iconBg="bg-cyan-500/10 text-cyan-400"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Placement Probability Distribution */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Placement Probability Distribution</h3>
            <p className="text-xs text-slate-400">Histogram of cohort predicted probabilities</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={probDist} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Student Count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Readiness Pie Breakdown */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Cohort Readiness Breakdown</h3>
            <p className="text-xs text-slate-400">Proportion of high, medium, and risk students</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={readinessPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {readinessPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: CGPA vs Placement Probability Scatter */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">CGPA vs Placement Probability Correlation</h3>
            <p className="text-xs text-slate-400">Academic CGPA mapping against probability score</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="cgpa" name="CGPA" stroke="#94a3b8" fontSize={11} domain={[4, 10]} />
                <YAxis dataKey="probability" name="Probability %" stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Scatter name="Students" data={scatterData} fill="#06b6d4" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Department Average Performance */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Department Average Readiness</h3>
            <p className="text-xs text-slate-400">Mean probability rating per branch</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptAvgData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="department" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="avgProbability" name="Avg Probability %" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
