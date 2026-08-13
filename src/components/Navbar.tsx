import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sparkles, Sun, Moon, LogOut, UserCheck, ShieldAlert, Menu, X } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { role, profile, theme, toggleTheme, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          {!isLanding && !isLogin && (
            <button
              onClick={onToggleSidebar}
              className="mr-1 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
              aria-label="Toggle Navigation Sidebar"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                Placement<span className="text-indigo-400">Scope</span>
              </span>
              <span className="hidden sm:inline-block ml-2 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                AI PREDICTOR
              </span>
            </div>
          </Link>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* User Status / Role Pill */}
          {role ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300">
                {role === 'officer' ? (
                  <>
                    <ShieldAlert className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="font-semibold text-indigo-300">Placement Officer</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="font-medium text-slate-200">{profile.name}</span>
                    <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] text-indigo-300 border border-indigo-500/30 font-semibold">
                      {profile.profileType}
                    </span>
                  </>
                )}
              </div>

              {/* Demo Login Button or Switch Role */}
              <Link
                to="/login"
                className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all"
              >
                Switch Role
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-indigo-400 transition-all"
            >
              Demo Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};
