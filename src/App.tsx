import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Prediction } from './pages/Prediction';
import { Simulator } from './pages/Simulator';
import { Skills } from './pages/Skills';
import { Companies } from './pages/Companies';
import { AdminDashboard } from './pages/AdminDashboard';
import { Students } from './pages/Students';
import { RiskAnalysis } from './pages/RiskAnalysis';

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const showSidebar = !isLanding && !isLogin;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 relative">
        {/* Navigation Sidebar Drawer */}
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Content Viewport */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
            showSidebar ? 'lg:ml-64' : ''
          }`}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/risk" element={<RiskAnalysis />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
};

export default App;
