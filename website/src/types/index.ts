// Core Types for SNU Connectome Fellows Program Website
// Based on Python models from src/core/fellow/models.py

export enum Department {
  MEDICINE = '의과대학',
  EE = '전기정보공학부',
  PSYCHOLOGY = '심리학과',
  LIBERAL_STUDIES = '자유전공학부',
  BRAIN_COGNITIVE = '뇌인지과학과',
  CS = '컴퓨터공학부',
  OTHER = '기타',
}

export enum FellowStatus {
  APPLICANT = 'applicant',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  ACTIVE = 'active',
  ON_LEAVE = 'on_leave',
  GRADUATED = 'graduated',
  WITHDRAWN = 'withdrawn',
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export interface TechnicalSkill {
  name: string;
  level: SkillLevel;
  yearsExperience: number;
}

export interface ResearchInterest {
  area: string;
  description: string;
  priority: number; // 1-5, 1 = highest
}

export interface FellowApplication {
  // Personal Info
  nameKorean: string;
  nameEnglish: string;
  studentId: string;
  email: string;
  phone: string;
  department: Department;
  year: number;

  // Academic Info
  gpaOverall: number;
  gpaMajor: number;
  relevantCourses: Array<{
    name: string;
    grade: string;
    credits: number;
  }>;

  // Skills
  programmingSkills: TechnicalSkill[];
  mlSkills: TechnicalSkill[];
  neuroTools: TechnicalSkill[];

  // Research
  researchInterests: ResearchInterest[];
  previousResearch?: string;
  publications: string[];

  // Essays
  motivationStatement: string;
  researchProposal: string;
  longTermVision: string;

  // References
  references: Array<{
    name: string;
    position: string;
    institution: string;
    email: string;
    relationship: string;
  }>;

  // Portfolio
  githubUrl?: string;
  portfolioUrl?: string;

  // Language
  englishScore?: string;

  // Metadata
  submittedAt: string;
}

export interface FellowEvaluation {
  fellowId: string;
  evaluationPeriod: string;
  evaluator: string;
  evaluatedAt: string;

  // Scores (0-100)
  researchProgress: number;
  publicationScore: number;
  participationScore: number;
  collaborationScore: number;
  initiativeScore: number;

  // Qualitative
  strengths: string[];
  areasForImprovement: string[];
  mentorFeedback: string;
  goalsForNextPeriod: string[];

  totalScore: number;
  stipendRecommendation: 'excellence' | 'standard' | 'probation' | 'review_required';
}

export interface Fellow {
  id: string;
  application: FellowApplication;
  status: FellowStatus;

  // Program Info
  cohort: number;
  startDate: string;
  expectedGraduation: string;

  // Mentor Assignment
  primaryMentor?: string;
  secondaryMentor?: string;

  // Research
  researchProject?: string;
  researchArea?: string;

  // Support
  monthlyStipend: number;
  aiBudgetUsd: number;

  // Progress
  evaluations: FellowEvaluation[];
  publications: string[];
  presentations: string[];
  conferencesAttended: string[];
  overseasVisits: Array<{
    institution: string;
    duration: string;
    purpose: string;
    dates: string;
  }>;

  // Compute
  dgxSparkAssigned: boolean;
  cloudCreditsUsd: number;
}

export interface Mentor {
  id: string;
  nameEnglish: string;
  nameKorean?: string;
  affiliation: string;
  position: string;
  email: string;

  // Expertise
  expertise: string[];
  researchAreas: string[];

  // Availability
  maxFellows: number;
  currentFellows: number;

  // Profile
  bio: string;
  profileImageUrl?: string;
  websiteUrl?: string;
  googleScholarUrl?: string;

  // Program
  annualFeeUsd?: number;
  preferredCommunicationMethod: 'email' | 'video_call' | 'in_person';
  timeZone: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  fellowId: string;
  mentorIds: string[];

  // Timeline
  startDate: string;
  expectedEndDate: string;
  status: 'planning' | 'active' | 'paused' | 'completed';

  // Deliverables
  expectedOutcomes: string[];
  milestones: Array<{
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'in_progress' | 'completed';
  }>;

  // Resources
  datasets: string[];
  computeResources: string[];
  fundingAmount?: number;

  // Progress
  progressPercentage: number;
  lastUpdated: string;
}

export interface ProgramStats {
  totalFellows: number;
  activeFellows: number;
  graduatedFellows: number;
  totalMentors: number;
  activeMentors: number;
  totalProjects: number;
  completedProjects: number;
  totalPublications: number;
  budgetUtilization: number;
}

// UI/UX Types
export interface NavigationItem {
  name: string;
  nameKorean: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

export interface PageMeta {
  title: string;
  titleKorean: string;
  description: string;
  descriptionKorean: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    image?: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form Types
export type FormField = {
  id: string;
  label: string;
  labelKorean: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'multiselect' | 'file';
  placeholder?: string;
  placeholderKorean?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
  };
  options?: Array<{
    value: string;
    label: string;
    labelKorean: string;
  }>;
};