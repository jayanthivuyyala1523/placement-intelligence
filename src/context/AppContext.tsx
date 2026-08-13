import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, PredictionResult, CohortStudent } from '../types';
import { DEMO_PROFILES, INITIAL_COHORT } from '../data/students';
import { calculatePrediction } from '../lib/predictionEngine';

interface AppContextType {
  role: 'student' | 'officer' | null;
  profile: StudentProfile;
  prediction: PredictionResult;
  theme: 'dark' | 'light';
  cohort: CohortStudent[];
  setRole: (role: 'student' | 'officer' | null) => void;
  selectDemoProfile: (key: 'high' | 'average' | 'risk') => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  resetProfile: () => void;
  toggleTheme: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_ROLE_KEY = 'placementscope_user_role';
const LOCAL_STORAGE_PROFILE_KEY = 'placementscope_user_profile';
const LOCAL_STORAGE_THEME_KEY = 'placementscope_theme';
const LOCAL_STORAGE_COHORT_KEY = 'placementscope_cohort_data';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Role state
  const [role, setRoleState] = useState<'student' | 'officer' | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);
    if (saved === 'student' || saved === 'officer') return saved;
    return 'student'; // Default role for demo
  });

  // Profile state
  const [profile, setProfileState] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved profile:', e);
      }
    }
    return DEMO_PROFILES.high; // Default high performer
  });

  // Cohort state for Officer dashboard
  const [cohort] = useState<CohortStudent[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_COHORT_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved cohort:', e);
      }
    }
    return INITIAL_COHORT;
  });

  // Calculate live prediction whenever profile changes
  const prediction = calculatePrediction(profile);

  // Sync theme with DOM document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  // Persist role
  const setRole = (newRole: 'student' | 'officer' | null) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, newRole);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY);
    }
  };

  // Select preset demo profile
  const selectDemoProfile = (key: 'high' | 'average' | 'risk') => {
    const newProfile = DEMO_PROFILES[key];
    setProfileState(newProfile);
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(newProfile));
    setRole('student');
  };

  // Custom profile update
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfileState((prev) => {
      const merged = { ...prev, ...updated, profileType: 'Custom' as const };
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(merged));
      return merged;
    });
  };

  // Reset profile to High Performer default
  const resetProfile = () => {
    setProfileState(DEMO_PROFILES.high);
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(DEMO_PROFILES.high));
  };

  // Toggle dark / light theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Logout clears role and redirects to login
  const logout = () => {
    setRole(null);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        profile,
        prediction,
        theme,
        cohort,
        setRole,
        selectDemoProfile,
        updateProfile,
        resetProfile,
        toggleTheme,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
