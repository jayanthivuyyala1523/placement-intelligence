import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CohortStudent } from '../types';
import { StudentDetailModal } from '../components/StudentDetailModal';
import { Users, Search, Filter, ArrowUpDown, ChevronRight } from 'lucide-react';

export const Students: React.FC = () => {
  const { cohort } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'probability' | 'cgpa' | 'aptitude' | 'name'>('probability');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [selectedStudent, setSelectedStudent] = useState<CohortStudent | null>(null);

  // Filter & Sort Logic
  const filteredStudents = cohort
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = riskFilter === 'ALL' || student.riskLevel === riskFilter;
      const matchesDept = deptFilter === 'ALL' || student.department === deptFilter;

      return matchesSearch && matchesRisk && matchesDept;
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }

      return sortOrder === 'asc'
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    });

  const toggleSort = (field: 'probability' | 'cgpa' | 'aptitude' | 'name') => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white">Student Directory & Analytics</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Searchable cohort records with real-time risk tagging and student profile detail views.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto text-xs">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3.5 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Dept Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none font-semibold"
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Data Science">Data Science</option>
            <option value="Mechanical">Mechanical</option>
          </select>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none font-semibold"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>
        </div>
      </div>

      {/* Main Student Directory Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Showing {filteredStudents.length} Students</span>
          <span>Click any student row to inspect detailed profile</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Student ID</th>
                <th
                  onClick={() => toggleSort('name')}
                  className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Name</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-5 py-3.5">Department</th>
                <th
                  onClick={() => toggleSort('cgpa')}
                  className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>CGPA</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('aptitude')}
                  className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Aptitude</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('probability')}
                  className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Probability</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-5 py-3.5">Risk Level</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredStudents.map((student) => {
                const riskBadge =
                  student.riskLevel === 'HIGH'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : student.riskLevel === 'MEDIUM'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

                return (
                  <tr
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="hover:bg-slate-900/60 cursor-pointer transition-colors group"
                  >
                    <td className="px-5 py-3.5 font-mono text-slate-400">{student.id}</td>
                    <td className="px-5 py-3.5 font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {student.name}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300">{student.department}</td>
                    <td className="px-5 py-3.5 font-extrabold text-indigo-400">{student.cgpa}</td>
                    <td className="px-5 py-3.5 text-slate-300">{student.aptitude}%</td>
                    <td className="px-5 py-3.5 font-black text-white">{student.probability}%</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${riskBadge}`}>
                        {student.riskLevel}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-300">{student.placementStatus}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="rounded-lg p-1.5 text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-800">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}

    </div>
  );
};
