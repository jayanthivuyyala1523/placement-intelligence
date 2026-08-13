export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  profileType: 'High Performer' | 'Average Performer' | 'At Risk' | 'Custom';
  
  // Academics
  cgpa: number;            // 0 - 10
  tenthPercentage: number;  // 0 - 100
  twelfthPercentage: number;// 0 - 100
  backlogs: number;         // count (0 - 10)
  attendance: number;       // 0 - 100
  
  // Aptitude
  aptitude: number;           // 0 - 100
  logicalReasoning: number;   // 0 - 100
  verbalAbility: number;      // 0 - 100
  technicalAptitude: number;  // 0 - 100
  
  // Technical Skills (0 - 100)
  dsa: number;
  java: number;
  python: number;
  sql: number;
  machineLearning: number;
  
  // Experience
  projectsCount: number;      // count
  internshipsCount: number;   // count
  certificationsCount: number;// count
  
  // Soft Skills (0 - 100)
  communication: number;
  interviewConfidence: number;
}

export interface FeatureImpact {
  name: string;
  score: number;
  weight: number;
  impactPercentage: number;
  status: 'positive' | 'negative' | 'neutral';
}

export interface CompanyMatchResult {
  companyId: string;
  companyName: string;
  role: string;
  packageLpa: number;
  matchScore: number; // 0 - 100%
  cgpaPassed: boolean;
  backlogsPassed: boolean;
  aptitudePassed: boolean;
  technicalPassed: boolean;
  communicationPassed: boolean;
  missingRequirements: string[];
  qualifyingReasons: string[];
}

export interface PredictionResult {
  probability: number;      // 0 - 99%
  readinessScore: number;   // 0 - 100
  riskLevel: RiskLevel;
  featureImportance: FeatureImpact[];
  positiveFactors: string[];
  negativeFactors: string[];
  strengths: string[];
  weaknesses: string[];
  companyMatches: CompanyMatchResult[];
}

export interface CompanyProfile {
  id: string;
  name: string;
  logoBg: string;
  role: string;
  packageLpa: number;
  location: string;
  tier: 'Dream' | 'Tier-1' | 'Tier-2' | 'Mass Recruiter';
  minCgpa: number;
  maxBacklogs: number;
  minAptitude: number;
  minTechnical: number;
  minCommunication: number;
  requiredSkills: string[];
  description: string;
}

export interface CohortStudent {
  id: string;
  name: string;
  email: string;
  department: 'Computer Science' | 'Information Technology' | 'Electronics' | 'Data Science' | 'Mechanical';
  cgpa: number;
  aptitude: number;
  technicalSkill: number;
  communication: number;
  projectsCount: number;
  internshipsCount: number;
  backlogs: number;
  probability: number;
  riskLevel: RiskLevel;
  placementStatus: 'Placed' | 'In Process' | 'Not Started' | 'Needs Assistance';
  targetCompany?: string;
  flaggedReasons?: string[];
}

export interface FilterOptions {
  department: string;
  riskLevel: string;
  minCgpa: number;
  placementStatus: string;
  searchQuery: string;
}
