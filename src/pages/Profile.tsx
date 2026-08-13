import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';
import { Save, RefreshCw, Sparkles, BookOpen, Brain, Code2, Briefcase, MessageSquare, CheckCircle2 } from 'lucide-react';

export const Profile: React.FC = () => {
  const { profile, updateProfile, resetProfile } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof StudentProfile, value: number | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    resetProfile();
    setFormData(profile);
  };

  const handleRunPrediction = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/prediction');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-2xl p-6 border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Academic & Skill Profile</h1>
          <p className="text-xs text-slate-400 mt-1">
            Update your scores to recalculate placement probability and target company cutoffs.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Profile Saved Successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Personal & Academics */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Academic Records</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {/* Student Name */}
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-100 focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Department</label>
              <select
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-100 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
                <option value="Data Science">Data Science</option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </div>

            {/* CGPA */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">CGPA (0 - 10)</label>
                <span className="font-bold text-indigo-400">{formData.cgpa}</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="10.0"
                step="0.1"
                value={formData.cgpa}
                onChange={(e) => handleChange('cgpa', parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* 10th % */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">10th Percentage</label>
                <span className="font-bold text-indigo-400">{formData.tenthPercentage}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={formData.tenthPercentage}
                onChange={(e) => handleChange('tenthPercentage', parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* 12th % */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">12th Percentage</label>
                <span className="font-bold text-indigo-400">{formData.twelfthPercentage}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={formData.twelfthPercentage}
                onChange={(e) => handleChange('twelfthPercentage', parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Backlogs */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Active Backlogs</label>
                <span className={`font-bold ${formData.backlogs > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {formData.backlogs}
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.backlogs}
                onChange={(e) => handleChange('backlogs', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Aptitude Scores */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600/20 text-cyan-400">
              <Brain className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Aptitude & Reasoning Scores</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {/* Aptitude */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Quantitative Aptitude</label>
                <span className="font-bold text-cyan-400">{formData.aptitude}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.aptitude}
                onChange={(e) => handleChange('aptitude', parseInt(e.target.value))}
                className="w-full accent-cyan-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Logical Reasoning */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Logical Reasoning</label>
                <span className="font-bold text-cyan-400">{formData.logicalReasoning}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.logicalReasoning}
                onChange={(e) => handleChange('logicalReasoning', parseInt(e.target.value))}
                className="w-full accent-cyan-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Verbal Ability */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Verbal Ability</label>
                <span className="font-bold text-cyan-400">{formData.verbalAbility}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.verbalAbility}
                onChange={(e) => handleChange('verbalAbility', parseInt(e.target.value))}
                className="w-full accent-cyan-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Technical Aptitude */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Technical MCQ Aptitude</label>
                <span className="font-bold text-cyan-400">{formData.technicalAptitude}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.technicalAptitude}
                onChange={(e) => handleChange('technicalAptitude', parseInt(e.target.value))}
                className="w-full accent-cyan-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Technical Skills */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
              <Code2 className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Technical Coding Ratings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {/* DSA */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Data Structures & Algorithms</label>
                <span className="font-bold text-purple-400">{formData.dsa}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.dsa}
                onChange={(e) => handleChange('dsa', parseInt(e.target.value))}
                className="w-full accent-purple-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Java */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Java Programming</label>
                <span className="font-bold text-purple-400">{formData.java}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.java}
                onChange={(e) => handleChange('java', parseInt(e.target.value))}
                className="w-full accent-purple-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Python */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Python Programming</label>
                <span className="font-bold text-purple-400">{formData.python}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.python}
                onChange={(e) => handleChange('python', parseInt(e.target.value))}
                className="w-full accent-purple-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* SQL */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">SQL & Databases</label>
                <span className="font-bold text-purple-400">{formData.sql}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.sql}
                onChange={(e) => handleChange('sql', parseInt(e.target.value))}
                className="w-full accent-purple-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Machine Learning */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Machine Learning Basics</label>
                <span className="font-bold text-purple-400">{formData.machineLearning}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.machineLearning}
                onChange={(e) => handleChange('machineLearning', parseInt(e.target.value))}
                className="w-full accent-purple-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Projects & Experience */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400">
              <Briefcase className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white">Experience & Soft Skills</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            {/* Projects */}
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Major Projects Count</label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.projectsCount}
                onChange={(e) => handleChange('projectsCount', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Internships */}
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Internships Completed</label>
              <input
                type="number"
                min="0"
                max="5"
                value={formData.internshipsCount}
                onChange={(e) => handleChange('internshipsCount', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Certifications</label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.certificationsCount}
                onChange={(e) => handleChange('certificationsCount', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Communication */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Communication Skills</label>
                <span className="font-bold text-emerald-400">{formData.communication}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.communication}
                onChange={(e) => handleChange('communication', parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>

            {/* Interview Confidence */}
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <label className="text-slate-400">Interview Confidence</label>
                <span className="font-bold text-emerald-400">{formData.interviewConfidence}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.interviewConfidence}
                onChange={(e) => handleChange('interviewConfidence', parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 rounded-lg bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-3 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <RefreshCw className="h-4 w-4" /> Reset
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-bold text-white hover:bg-slate-700 transition-all"
          >
            <Save className="h-4 w-4" /> Save Profile
          </button>

          <button
            type="button"
            onClick={handleRunPrediction}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-7 py-3 text-xs font-extrabold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            <Sparkles className="h-4 w-4" /> Run Prediction
          </button>
        </div>

      </form>
    </div>
  );
};
