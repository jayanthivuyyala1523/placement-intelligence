import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANIES_DATA } from '../data/companies';
import { CompanyCard } from '../components/CompanyCard';
import { Building2, Search, Filter } from 'lucide-react';

export const Companies: React.FC = () => {
  const { prediction } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');

  const { companyMatches } = prediction;

  // Filter companies
  const filteredCompanies = COMPANIES_DATA.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = selectedTier === 'ALL' || company.tier === selectedTier;

    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white">Target Company Matching & Cutoffs</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time eligibility calculation matching your profile against 12+ corporate recruiter cutoffs.
          </p>
        </div>

        {/* Search & Tier Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Tier Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400 hidden sm:inline" />
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none font-semibold"
            >
              <option value="ALL">All Company Tiers</option>
              <option value="Dream">Dream (20+ LPA)</option>
              <option value="Tier-1">Tier-1 (7 - 12 LPA)</option>
              <option value="Tier-2">Tier-2 (5 - 7 LPA)</option>
              <option value="Mass Recruiter">Mass Recruiter (&lt; 5 LPA)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Company Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => {
          const matchResult = companyMatches.find((m) => m.companyId === company.id) || {
            companyId: company.id,
            companyName: company.name,
            role: company.role,
            packageLpa: company.packageLpa,
            matchScore: 50,
            cgpaPassed: false,
            backlogsPassed: true,
            aptitudePassed: false,
            technicalPassed: false,
            communicationPassed: false,
            missingRequirements: ['Profile requirements incomplete'],
            qualifyingReasons: []
          };

          return (
            <CompanyCard key={company.id} company={company} match={matchResult} />
          );
        })}
      </div>

    </div>
  );
};
