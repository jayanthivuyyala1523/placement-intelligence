import { StudentProfile, PredictionResult, FeatureImpact, CompanyMatchResult } from '../types';
import { COMPANIES_DATA } from '../data/companies';

export function calculatePrediction(profile: StudentProfile): PredictionResult {
  // 1. Feature Weights & Component Scores
  const cgpaScore = (profile.cgpa / 10) * 28; // Max 28 pts
  
  const avgAptitude = (profile.aptitude * 0.4 + profile.logicalReasoning * 0.3 + profile.verbalAbility * 0.3);
  const aptitudeScore = (avgAptitude / 100) * 20; // Max 20 pts

  const avgTechnical = (
    profile.dsa * 0.35 +
    profile.java * 0.20 +
    profile.python * 0.20 +
    profile.sql * 0.15 +
    profile.machineLearning * 0.10
  );
  const technicalScore = (avgTechnical / 100) * 22; // Max 22 pts

  const avgSoft = (profile.communication * 0.5 + profile.interviewConfidence * 0.5);
  const softScore = (avgSoft / 100) * 15; // Max 15 pts

  const projectScore = Math.min(profile.projectsCount * 3, 9); // Max 9 pts
  const internshipScore = Math.min(profile.internshipsCount * 3.5, 7); // Max 7 pts
  const expScore = projectScore + internshipScore; // Max 16 pts

  const backlogPenalty = profile.backlogs * 12;
  const attendanceModifier = profile.attendance < 75 ? -6 : profile.attendance >= 90 ? +2 : 0;

  // Raw Total Calculation
  const rawTotal = cgpaScore + aptitudeScore + technicalScore + softScore + expScore - backlogPenalty + attendanceModifier;

  // Clamp probability between 0% and 99%
  const probability = Math.min(99, Math.max(0, Math.round(rawTotal)));
  const readinessScore = Math.min(100, Math.max(0, Math.round((rawTotal + 5) * 0.95)));

  // 2. Risk Classification
  let riskLevel: PredictionResult['riskLevel'] = 'LOW';
  if (probability < 50 || profile.backlogs >= 2 || (profile.cgpa < 6.0 && avgTechnical < 50)) {
    riskLevel = 'HIGH';
  } else if (probability < 75 || profile.backlogs === 1 || profile.cgpa < 7.0) {
    riskLevel = 'MEDIUM';
  }

  // 3. Feature Importance & Drivers Breakdown
  const featureImportance: FeatureImpact[] = [
    {
      name: 'CGPA',
      score: profile.cgpa * 10,
      weight: 28,
      impactPercentage: Number(((cgpaScore / 28) * 100).toFixed(1)),
      status: profile.cgpa >= 7.5 ? 'positive' : profile.cgpa < 6.5 ? 'negative' : 'neutral'
    },
    {
      name: 'Aptitude & Reasoning',
      score: avgAptitude,
      weight: 20,
      impactPercentage: Number(avgAptitude.toFixed(1)),
      status: avgAptitude >= 75 ? 'positive' : avgAptitude < 60 ? 'negative' : 'neutral'
    },
    {
      name: 'DSA & Tech Skills',
      score: avgTechnical,
      weight: 22,
      impactPercentage: Number(avgTechnical.toFixed(1)),
      status: avgTechnical >= 75 ? 'positive' : avgTechnical < 60 ? 'negative' : 'neutral'
    },
    {
      name: 'Communication & Confidence',
      score: avgSoft,
      weight: 15,
      impactPercentage: Number(avgSoft.toFixed(1)),
      status: avgSoft >= 75 ? 'positive' : avgSoft < 60 ? 'negative' : 'neutral'
    },
    {
      name: 'Projects & Internships',
      score: Math.min(100, (expScore / 16) * 100),
      weight: 15,
      impactPercentage: Number(((expScore / 16) * 100).toFixed(1)),
      status: expScore >= 10 ? 'positive' : expScore < 6 ? 'negative' : 'neutral'
    },
    {
      name: 'Backlogs Impact',
      score: Math.max(0, 100 - backlogPenalty * 4),
      weight: -12,
      impactPercentage: backlogPenalty > 0 ? -backlogPenalty : 0,
      status: profile.backlogs === 0 ? 'positive' : 'negative'
    }
  ];

  // Positive & Negative Factors
  const positiveFactors: string[] = [];
  const negativeFactors: string[] = [];

  if (profile.cgpa >= 8.0) positiveFactors.push(`Strong CGPA (${profile.cgpa})`);
  else if (profile.cgpa < 6.5) negativeFactors.push(`Low CGPA (${profile.cgpa})`);

  if (profile.dsa >= 75) positiveFactors.push(`Solid Data Structures & Algorithms (${profile.dsa}%)`);
  else if (profile.dsa < 60) negativeFactors.push(`Weak DSA foundations (${profile.dsa}%)`);

  if (avgAptitude >= 75) positiveFactors.push(`High Aptitude Score (${Math.round(avgAptitude)}%)`);
  else if (avgAptitude < 60) negativeFactors.push(`Aptitude needs enhancement (${Math.round(avgAptitude)}%)`);

  if (profile.projectsCount >= 3) positiveFactors.push(`Multiple Technical Projects (${profile.projectsCount})`);
  else if (profile.projectsCount < 2) negativeFactors.push(`Limited Project Portfolio (${profile.projectsCount} project)`);

  if (profile.internshipsCount >= 1) positiveFactors.push(`Industry Internship Experience (${profile.internshipsCount})`);
  else negativeFactors.push('No Prior Internship Experience');

  if (profile.communication >= 75) positiveFactors.push(`Strong English & Interview Communication (${profile.communication}%)`);
  else if (profile.communication < 60) negativeFactors.push(`Interview Communication Needs Practice (${profile.communication}%)`);

  if (profile.backlogs === 0) positiveFactors.push('Clean Academic Record (0 Backlogs)');
  else negativeFactors.push(`Active Backlogs Detected (${profile.backlogs})`);

  // Strengths & Weaknesses Lists
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (profile.cgpa >= 8.0) strengths.push('Consistently strong academic performance');
  if (profile.dsa >= 70) strengths.push('Strong Data Structures & Algorithms problem solving');
  if (profile.sql >= 75) strengths.push('Proficient in SQL & Relational Databases');
  if (profile.projectsCount >= 3) strengths.push('Rich project portfolio demonstrating applied skills');
  if (profile.communication >= 75) strengths.push('Confident professional communication and interpersonal skills');
  if (profile.logicalReasoning >= 75) strengths.push('High logical analytical ability');

  if (profile.cgpa < 7.0) weaknesses.push('Academic CGPA is below top-tier company cutoffs');
  if (profile.dsa < 65) weaknesses.push('DSA skills require improvement for technical interview coding rounds');
  if (profile.communication < 65) weaknesses.push('Communication skills may hold back performance in HR/managerial rounds');
  if (profile.aptitude < 65) weaknesses.push('Quantitative Aptitude score is below tier-1 company benchmarks');
  if (profile.internshipsCount === 0) weaknesses.push('Lack of direct industry internship experience');
  if (profile.backlogs > 0) weaknesses.push('Active backlogs restrict eligibility for tier-1 recruitment drives');

  // Fallback defaults if arrays are empty
  if (strengths.length === 0) strengths.push('Basic technical course completions', 'Good class attendance record');
  if (weaknesses.length === 0) weaknesses.push('Minor scope for advanced system design concepts');

  // 4. Company Matching Logic
  const companyMatches: CompanyMatchResult[] = COMPANIES_DATA.map((company) => {
    const cgpaPassed = profile.cgpa >= company.minCgpa;
    const backlogsPassed = profile.backlogs <= company.maxBacklogs;
    const aptitudePassed = avgAptitude >= company.minAptitude;
    const technicalPassed = avgTechnical >= company.minTechnical;
    const communicationPassed = profile.communication >= company.minCommunication;

    const qualifyingReasons: string[] = [];
    const missingRequirements: string[] = [];

    if (cgpaPassed) qualifyingReasons.push(`CGPA ${profile.cgpa} meets cutoff (${company.minCgpa})`);
    else missingRequirements.push(`CGPA is ${profile.cgpa} (Min required: ${company.minCgpa})`);

    if (backlogsPassed) qualifyingReasons.push(`Backlogs count (${profile.backlogs}) within limit (Max: ${company.maxBacklogs})`);
    else missingRequirements.push(`Active backlogs (${profile.backlogs}) exceed company limit (Max: ${company.maxBacklogs})`);

    if (aptitudePassed) qualifyingReasons.push(`Aptitude ${Math.round(avgAptitude)}% meets required ${company.minAptitude}%`);
    else missingRequirements.push(`Aptitude is ${Math.round(avgAptitude)}% (Min required: ${company.minAptitude}%)`);

    if (technicalPassed) qualifyingReasons.push(`Technical rating ${Math.round(avgTechnical)}% meets benchmark (${company.minTechnical}%)`);
    else missingRequirements.push(`Technical skill is ${Math.round(avgTechnical)}% (Min required: ${company.minTechnical}%)`);

    if (communicationPassed) qualifyingReasons.push(`Communication ${profile.communication}% clears cut-off (${company.minCommunication}%)`);
    else missingRequirements.push(`Communication is ${profile.communication}% (Min required: ${company.minCommunication}%)`);

    // Dynamic match percentage calculation
    let matchPoints = 0;
    if (cgpaPassed) matchPoints += 25; else matchPoints += Math.max(0, (profile.cgpa / company.minCgpa) * 15);
    if (backlogsPassed) matchPoints += 20; else matchPoints += 0;
    if (aptitudePassed) matchPoints += 20; else matchPoints += Math.max(0, (avgAptitude / company.minAptitude) * 12);
    if (technicalPassed) matchPoints += 20; else matchPoints += Math.max(0, (avgTechnical / company.minTechnical) * 12);
    if (communicationPassed) matchPoints += 15; else matchPoints += Math.max(0, (profile.communication / company.minCommunication) * 8);

    const matchScore = Math.min(99, Math.max(15, Math.round(matchPoints)));

    return {
      companyId: company.id,
      companyName: company.name,
      role: company.role,
      packageLpa: company.packageLpa,
      matchScore,
      cgpaPassed,
      backlogsPassed,
      aptitudePassed,
      technicalPassed,
      communicationPassed,
      missingRequirements,
      qualifyingReasons
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return {
    probability,
    readinessScore,
    riskLevel,
    featureImportance,
    positiveFactors,
    negativeFactors,
    strengths,
    weaknesses,
    companyMatches
  };
}
