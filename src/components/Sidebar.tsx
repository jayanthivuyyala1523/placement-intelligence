import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Sliders,
  Target,
  Building2,
  BarChart3,
  Users,
  ShieldAlert,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, profile } = useApp();

  interface NavLinkItem {
    to: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }

  const studentLinks: NavLinkItem[] = [
    { to: '/dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'My Profile', icon: User },
    { to: '/prediction', label: 'Placement Prediction', icon: Sparkles },
    { to: '/simulator', label: 'What-If Simulator ⭐', icon: Sliders, badge: 'Interactive' },
    { to: '/skills', label: 'Skill Gap Analysis', icon: Target },
    { to: '/companies', label: 'Company Matching', icon: Building2 },
  ];

  const officerLinks: NavLinkItem[] = [
    { to: '/admin', label: 'Officer Overview', icon: BarChart3 },
    { to: '/students', label: 'Student Analytics', icon: Users },
    { to: '/risk', label: 'Risk Analysis', icon: ShieldAlert },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 border-r border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between px-3 py-4">
          <div className="space-y-6">
            
            {/* Header role context */}
            <div className="mx-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow">
                  {role === 'officer' ? <Briefcase className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Active Workspace</p>
                  <p className="text-sm font-bold text-white truncate">
                    {role === 'officer' ? 'Placement Cell Admin' : profile.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <nav className="space-y-1">
              <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {role === 'officer' ? 'Placement Officer Portal' : 'Student Intelligence'}
              </p>

              {(role === 'officer' ? officerLinks : studentLinks).map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Footer Info */}
          <div className="mx-2 rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 text-center">
            <p className="text-[11px] font-semibold text-slate-400">PlacementScope Engine v1.0</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Deterministic RF Algorithm</p>
          </div>
        </div>
      </aside>
    </>
  );
};
