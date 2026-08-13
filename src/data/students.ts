import { StudentProfile, CohortStudent } from '../types';

export const DEMO_PROFILES: Record<'high' | 'average' | 'risk', StudentProfile> = {
  high: {
    id: 'demo-high-01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    department: 'Computer Science',
    profileType: 'High Performer',
    cgpa: 9.1,
    tenthPercentage: 94.5,
    twelfthPercentage: 92.0,
    backlogs: 0,
    attendance: 94,
    aptitude: 88,
    logicalReasoning: 90,
    verbalAbility: 85,
    technicalAptitude: 92,
    dsa: 88,
    java: 85,
    python: 90,
    sql: 84,
    machineLearning: 80,
    projectsCount: 4,
    internshipsCount: 2,
    certificationsCount: 3,
    communication: 86,
    interviewConfidence: 88,
  },
  average: {
    id: 'demo-avg-02',
    name: 'Riya Patel',
    email: 'riya.patel@campus.edu',
    department: 'Information Technology',
    profileType: 'Average Performer',
    cgpa: 7.4,
    tenthPercentage: 82.0,
    twelfthPercentage: 78.5,
    backlogs: 0,
    attendance: 82,
    aptitude: 68,
    logicalReasoning: 70,
    verbalAbility: 65,
    technicalAptitude: 72,
    dsa: 62,
    java: 74,
    python: 68,
    sql: 78,
    machineLearning: 55,
    projectsCount: 2,
    internshipsCount: 1,
    certificationsCount: 1,
    communication: 64,
    interviewConfidence: 62,
  },
  risk: {
    id: 'demo-risk-03',
    name: 'Rohan Verma',
    email: 'rohan.verma@campus.edu',
    department: 'Electronics',
    profileType: 'At Risk',
    cgpa: 5.9,
    tenthPercentage: 71.0,
    twelfthPercentage: 64.0,
    backlogs: 2,
    attendance: 68,
    aptitude: 48,
    logicalReasoning: 50,
    verbalAbility: 45,
    technicalAptitude: 52,
    dsa: 40,
    java: 52,
    python: 42,
    sql: 48,
    machineLearning: 30,
    projectsCount: 1,
    internshipsCount: 0,
    certificationsCount: 0,
    communication: 45,
    interviewConfidence: 40,
  },
};

const firstNames = [
  'Aditya', 'Ananya', 'Dev', 'Diya', 'Ishaan', 'Kavya', 'Manav', 'Neha', 'Pranav', 'Priya',
  'Rahul', 'Rhea', 'Sahil', 'Sanya', 'Tanmay', 'Urvi', 'Varun', 'Yash', 'Zoya', 'Karan',
  'Meera', 'Nikhil', 'Pooja', 'Siddharth', 'Tara', 'Vikram', 'Anish', 'Bhavna', 'Chetan', 'Divya'
];

const lastNames = [
  'Gupta', 'Kumar', 'Singh', 'Reddy', 'Joshi', 'Mehta', 'Nair', 'Rao', 'Shah', 'Kapoor',
  'Banerjee', 'Deshmukh', 'Iyer', 'Malhotra', 'Saxena', 'Chawla', 'Agarwal', 'Venkatesh', 'Kulkarni', 'Chopra'
];

const departments: CohortStudent['department'][] = [
  'Computer Science', 'Information Technology', 'Electronics', 'Data Science', 'Mechanical'
];

// Helper deterministic generator for 150 mock cohort students
export const generateCohortStudents = (): CohortStudent[] => {
  const students: CohortStudent[] = [];
  
  for (let i = 1; i <= 150; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const name = `${fn} ${ln}`;
    const dept = departments[i % departments.length];
    
    // Controlled distribution to simulate real college data
    let cgpa: number;
    let backlogs: number;
    let aptitude: number;
    let technicalSkill: number;
    let communication: number;
    let projectsCount: number;
    let internshipsCount: number;
    let placementStatus: CohortStudent['placementStatus'];

    if (i % 5 === 0) {
      // At Risk (~20%)
      cgpa = Number((5.2 + (i % 15) * 0.1).toFixed(1));
      backlogs = (i % 3) + 1;
      aptitude = 42 + (i % 20);
      technicalSkill = 38 + (i % 22);
      communication = 40 + (i % 25);
      projectsCount = i % 2;
      internshipsCount = 0;
      placementStatus = 'Needs Assistance';
    } else if (i % 3 === 0) {
      // High Performer (~33%)
      cgpa = Number((8.4 + (i % 14) * 0.1).toFixed(1));
      backlogs = 0;
      aptitude = 82 + (i % 16);
      technicalSkill = 80 + (i % 18);
      communication = 78 + (i % 20);
      projectsCount = 3 + (i % 2);
      internshipsCount = 1 + (i % 2);
      placementStatus = i % 2 === 0 ? 'Placed' : 'In Process';
    } else {
      // Average (~47%)
      cgpa = Number((6.8 + (i % 15) * 0.1).toFixed(1));
      backlogs = i % 4 === 0 ? 1 : 0;
      aptitude = 62 + (i % 18);
      technicalSkill = 60 + (i % 20);
      communication = 64 + (i % 18);
      projectsCount = 1 + (i % 2);
      internshipsCount = i % 2;
      placementStatus = i % 4 === 0 ? 'Placed' : i % 2 === 0 ? 'In Process' : 'Not Started';
    }

    // Weighted Probability formula
    const rawProb = (
      (cgpa / 10) * 30 +
      (aptitude / 100) * 20 +
      (technicalSkill / 100) * 25 +
      (communication / 100) * 15 +
      Math.min(projectsCount * 3, 6) +
      Math.min(internshipsCount * 4, 8) -
      (backlogs * 12)
    );
    
    const probability = Math.min(99, Math.max(5, Math.round(rawProb)));
    
    let riskLevel: CohortStudent['riskLevel'] = 'LOW';
    const flaggedReasons: string[] = [];

    if (probability < 55 || backlogs > 0 || cgpa < 6.5) {
      if (probability < 50) riskLevel = 'HIGH';
      else riskLevel = 'MEDIUM';

      if (cgpa < 6.5) flaggedReasons.push('Low CGPA (< 6.5)');
      if (backlogs > 0) flaggedReasons.push(`Active Backlogs (${backlogs})`);
      if (aptitude < 60) flaggedReasons.push('Low Aptitude Score (< 60%)');
      if (technicalSkill < 55) flaggedReasons.push('Weak Technical Skills');
      if (communication < 55) flaggedReasons.push('Low Communication Rating');
      if (projectsCount === 0) flaggedReasons.push('No Major Projects');
    }

    students.push({
      id: `STU-2026-${String(i).padStart(3, '0')}`,
      name,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@campus.edu`,
      department: dept,
      cgpa,
      aptitude,
      technicalSkill,
      communication,
      projectsCount,
      internshipsCount,
      backlogs,
      probability,
      riskLevel,
      placementStatus,
      targetCompany: probability > 85 ? 'Microsoft' : probability > 70 ? 'TCS Ninja' : 'Cognizant',
      flaggedReasons: flaggedReasons.length > 0 ? flaggedReasons : undefined,
    });
  }

  return students;
};

export const INITIAL_COHORT = generateCohortStudents();
