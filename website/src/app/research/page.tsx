/**
 * Research Project Tracking System
 * ================================
 *
 * Comprehensive research management system for tracking projects,
 * publications, milestones, and collaboration analytics.
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  BeakerIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { AccessibleModal } from '@/components/ui/AccessibleModal';

// Mock research data
const mockProjects = [
  {
    id: 1,
    title: 'BrainLM: Foundation Models for Neural Signal Processing',
    titleKo: 'BrainLM: 신경 신호 처리를 위한 Foundation Model',
    status: 'active',
    phase: 'Data Collection',
    progress: 65,
    priority: 'high',
    startDate: '2024-09-01',
    endDate: '2025-12-31',
    budget: 50000000,
    spentBudget: 32500000,
    pi: {
      id: 1,
      name: '유신재',
      nameEn: 'Shin-Jae You',
      institution: 'Brookhaven National Laboratory'
    },
    collaborators: [
      { id: 2, name: '김지현', nameEn: 'Ji-Hyun Kim', role: 'Research Fellow' },
      { id: 3, name: '박민준', nameEn: 'Min-Jun Park', role: 'Research Fellow' }
    ],
    researchAreas: ['fMRI', 'Deep Learning', 'Foundation Models'],
    description: 'Development of large-scale foundation models for processing and analyzing neural signals from fMRI data.',
    milestones: [
      { id: 1, title: 'Data Collection Setup', status: 'completed', dueDate: '2024-10-31', completedDate: '2024-10-25' },
      { id: 2, title: 'Preprocessing Pipeline', status: 'completed', dueDate: '2024-12-15', completedDate: '2024-12-10' },
      { id: 3, title: 'Model Architecture Design', status: 'in_progress', dueDate: '2025-02-28', completedDate: null },
      { id: 4, title: 'Training Data Preparation', status: 'pending', dueDate: '2025-04-30', completedDate: null },
      { id: 5, title: 'Model Training', status: 'pending', dueDate: '2025-08-31', completedDate: null }
    ],
    publications: [
      {
        id: 1,
        title: 'Preprocessing Pipeline for Large-Scale fMRI Foundation Models',
        status: 'submitted',
        venue: 'NeuroImage',
        submissionDate: '2024-12-01'
      }
    ],
    resources: {
      datasets: ['HCP-1200', 'UK Biobank', 'ABCD Study'],
      computeHours: 15000,
      storage: '2.5TB'
    }
  },
  {
    id: 2,
    title: 'Brain-JEPA: Self-Supervised Learning for Neural Dynamics',
    titleKo: 'Brain-JEPA: 신경 역학을 위한 자기지도학습',
    status: 'active',
    phase: 'Model Development',
    progress: 45,
    priority: 'medium',
    startDate: '2024-08-15',
    endDate: '2025-08-14',
    budget: 35000000,
    spentBudget: 15750000,
    pi: {
      id: 2,
      name: 'Uri Hasson',
      nameEn: 'Uri Hasson',
      institution: 'Princeton University'
    },
    collaborators: [
      { id: 4, name: '이서영', nameEn: 'Seo-Young Lee', role: 'Research Fellow' }
    ],
    researchAreas: ['Self-Supervised Learning', 'Neural Dynamics', 'Temporal Modeling'],
    description: 'Developing self-supervised learning methods for understanding temporal dynamics in neural data.',
    milestones: [
      { id: 6, title: 'Literature Review', status: 'completed', dueDate: '2024-09-30', completedDate: '2024-09-28' },
      { id: 7, title: 'JEPA Architecture Adaptation', status: 'in_progress', dueDate: '2025-01-31', completedDate: null },
      { id: 8, title: 'Preliminary Experiments', status: 'pending', dueDate: '2025-03-31', completedDate: null }
    ],
    publications: [],
    resources: {
      datasets: ['Narrative fMRI', 'Movie Watching Data'],
      computeHours: 8000,
      storage: '1.2TB'
    }
  }
];

const mockPublications = [
  {
    id: 1,
    title: 'Preprocessing Pipeline for Large-Scale fMRI Foundation Models',
    authors: ['Shin-Jae You', 'Ji-Hyun Kim', 'Min-Jun Park'],
    venue: 'NeuroImage',
    status: 'submitted',
    submissionDate: '2024-12-01',
    expectedDecision: '2025-02-15',
    projectId: 1,
    impactFactor: 4.2,
    citationCount: 0,
    abstract: 'We present a comprehensive preprocessing pipeline for training foundation models on large-scale fMRI data...'
  },
  {
    id: 2,
    title: 'BrainLM: A Foundation Model for Neural Signal Processing',
    authors: ['Shin-Jae You', 'Ji-Hyun Kim'],
    venue: 'Nature Neuroscience',
    status: 'in_preparation',
    targetSubmission: '2025-06-01',
    projectId: 1,
    impactFactor: 25.8,
    citationCount: 0,
    abstract: 'BrainLM represents the first large-scale foundation model specifically designed for neural signal processing...'
  }
];

const RESEARCH_PHASES = [
  'Planning',
  'Literature Review',
  'Data Collection',
  'Model Development',
  'Experimentation',
  'Analysis',
  'Publication',
  'Completed'
];

const PRIORITY_LEVELS = ['low', 'medium', 'high', 'critical'];

export default function ResearchTrackingPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState(mockProjects);
  const [publications, setPublications] = useState(mockPublications);
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const statusMatch = filterStatus === 'all' || project.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || project.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Calculate analytics
  const analytics = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalPublications: publications.length,
    acceptedPublications: publications.filter(p => p.status === 'accepted').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    spentBudget: projects.reduce((sum, p) => sum + p.spentBudget, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  const handleViewProject = (project: typeof mockProjects[0]) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Research Tracking System
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                연구 프로젝트 추적 시스템 - Monitor and manage your research projects and publications
              </p>
            </div>
            <div className="flex space-x-3">
              <AccessibleButton
                variant="outline"
                onClick={() => setIsNewProjectModalOpen(true)}
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                New Project
              </AccessibleButton>
              <AccessibleButton
                variant="primary"
                onClick={() => {/* Navigate to analytics */ }}
              >
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Analytics
              </AccessibleButton>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <BeakerIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Projects
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {analytics.activeProjects}/{analytics.totalProjects}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <DocumentTextIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Publications
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {analytics.acceptedPublications}/{analytics.totalPublications}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <ChartBarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg. Progress
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {analytics.avgProgress}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                <ClockIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Budget Used
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round((analytics.spentBudget / analytics.totalBudget) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'projects', label: 'Projects', icon: BeakerIcon },
                { key: 'publications', label: 'Publications', icon: DocumentTextIcon },
                { key: 'milestones', label: 'Milestones', icon: CheckCircleIcon },
                { key: 'collaboration', label: 'Collaboration', icon: UserGroupIcon },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Filters */}
          {activeTab === 'projects' && (
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <div>
                  <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    id="status-filter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority-filter"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={() => handleViewProject(project)}
              />
            ))}
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="space-y-6">
            {publications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        )}

        {activeTab === 'milestones' && <MilestonesView projects={projects} />}

        {activeTab === 'collaboration' && <CollaborationView projects={projects} />}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <AccessibleModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          title={selectedProject.title}
          size="xl"
        >
          <ProjectDetails project={selectedProject} />
        </AccessibleModal>
      )}

      {/* New Project Modal */}
      <AccessibleModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Project"
        size="lg"
      >
        <NewProjectForm onClose={() => setIsNewProjectModalOpen(false)} />
      </AccessibleModal>
    </div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  onView
}: {
  project: typeof mockProjects[0];
  onView: () => void;
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const budgetUsagePercentage = (project.spentBudget / project.budget) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {project.title}
            </h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {project.titleKo}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {project.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
            <span>PI: {project.pi.name}</span>
            <span>Phase: {project.phase}</span>
            <span>Team: {project.collaborators.length + 1} members</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-gray-900 dark:text-gray-100">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Budget Usage */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Budget Usage</span>
          <span className="text-gray-900 dark:text-gray-100">
            ₩{(project.spentBudget / 1000000).toFixed(1)}M / ₩{(project.budget / 1000000).toFixed(1)}M
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              budgetUsagePercentage > 80
                ? 'bg-red-600 dark:bg-red-400'
                : budgetUsagePercentage > 60
                  ? 'bg-yellow-600 dark:bg-yellow-400'
                  : 'bg-green-600 dark:bg-green-400'
            }`}
            style={{ width: `${Math.min(budgetUsagePercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Research Areas */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.researchAreas.map((area) => (
            <span
              key={area}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <AccessibleButton
            variant="outline"
            size="sm"
            onClick={onView}
          >
            <EyeIcon className="w-4 h-4 mr-1" />
            View Details
          </AccessibleButton>
          <AccessibleButton
            variant="outline"
            size="sm"
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Edit
          </AccessibleButton>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

// Publication Card Component
function PublicationCard({ publication }: { publication: typeof mockPublications[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'submitted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'in_preparation': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {publication.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Authors: {publication.authors.join(', ')}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {publication.venue} (IF: {publication.impactFactor})
          </p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(publication.status)}`}>
          {publication.status.replace('_', ' ')}
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {publication.abstract}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex space-x-4">
          {publication.submissionDate && (
            <span>Submitted: {new Date(publication.submissionDate).toLocaleDateString()}</span>
          )}
          {publication.expectedDecision && (
            <span>Expected Decision: {new Date(publication.expectedDecision).toLocaleDateString()}</span>
          )}
          <span>Citations: {publication.citationCount}</span>
        </div>
      </div>
    </div>
  );
}

// Project Details Component
function ProjectDetails({ project }: { project: typeof mockProjects[0] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Project Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <span className="text-gray-900 dark:text-gray-100">{project.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Phase:</span>
              <span className="text-gray-900 dark:text-gray-100">{project.phase}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Priority:</span>
              <span className="text-gray-900 dark:text-gray-100">{project.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Duration:</span>
              <span className="text-gray-900 dark:text-gray-100">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Budget & Resources</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Budget:</span>
              <span className="text-gray-900 dark:text-gray-100">₩{(project.budget / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Spent:</span>
              <span className="text-gray-900 dark:text-gray-100">₩{(project.spentBudget / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Compute Hours:</span>
              <span className="text-gray-900 dark:text-gray-100">{project.resources.computeHours.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Storage:</span>
              <span className="text-gray-900 dark:text-gray-100">{project.resources.storage}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Team Members</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <span className="font-medium text-gray-900 dark:text-gray-100">{project.pi.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Principal Investigator</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{project.pi.institution}</span>
          </div>
          {project.collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">{collaborator.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{collaborator.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Milestones</h4>
        <div className="space-y-3">
          {project.milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                {milestone.status === 'completed' && (
                  <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                )}
                {milestone.status === 'in_progress' && (
                  <ClockIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                )}
                {milestone.status === 'pending' && (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                )}
                <div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{milestone.title}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Due: {new Date(milestone.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                milestone.status === 'completed'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : milestone.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {milestone.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Milestones View Component
function MilestonesView({ projects }: { projects: typeof mockProjects }) {
  const allMilestones = projects.flatMap(project =>
    project.milestones.map(milestone => ({
      ...milestone,
      projectTitle: project.title,
      projectId: project.id
    }))
  ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const upcomingMilestones = allMilestones.filter(m => m.status !== 'completed');
  const overdueMilestones = upcomingMilestones.filter(m => new Date(m.dueDate) < new Date());

  return (
    <div className="space-y-6">
      {overdueMilestones.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-4 flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            Overdue Milestones ({overdueMilestones.length})
          </h3>
          <div className="space-y-3">
            {overdueMilestones.map((milestone) => (
              <div key={`${milestone.projectId}-${milestone.id}`} className="bg-white dark:bg-red-900/40 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{milestone.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.projectTitle}</p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Overdue by {Math.ceil((Date.now() - new Date(milestone.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Upcoming Milestones
        </h3>
        <div className="space-y-3">
          {upcomingMilestones.filter(m => new Date(m.dueDate) >= new Date()).slice(0, 10).map((milestone) => (
            <div key={`${milestone.projectId}-${milestone.id}`} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  milestone.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'
                }`} />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.projectTitle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {new Date(milestone.dueDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.ceil((new Date(milestone.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Collaboration View Component
function CollaborationView({ projects }: { projects: typeof mockProjects }) {
  // Calculate collaboration statistics
  const allCollaborators = projects.flatMap(project =>
    [project.pi, ...project.collaborators].map(person => ({
      ...person,
      projectCount: projects.filter(p =>
        p.pi.id === person.id || p.collaborators.some(c => c.id === person.id)
      ).length
    }))
  );

  const uniqueCollaborators = allCollaborators.reduce((acc, person) => {
    const existing = acc.find(p => p.id === person.id);
    if (existing) {
      existing.projectCount = Math.max(existing.projectCount, person.projectCount);
    } else {
      acc.push(person);
    }
    return acc;
  }, [] as typeof allCollaborators);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Active Collaborators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uniqueCollaborators.map((person) => (
            <div key={person.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{person.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{person.nameEn}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {person.projectCount} project{person.projectCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// New Project Form Component
function NewProjectForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    titleKo: '',
    description: '',
    phase: RESEARCH_PHASES[0],
    priority: 'medium',
    startDate: '',
    endDate: '',
    budget: '',
    researchAreas: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('New project created:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Title (English)
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>

        <div>
          <label htmlFor="titleKo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Title (Korean)
          </label>
          <input
            id="titleKo"
            type="text"
            value={formData.titleKo}
            onChange={(e) => setFormData(prev => ({ ...prev, titleKo: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="phase" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phase
          </label>
          <select
            id="phase"
            value={formData.phase}
            onChange={(e) => setFormData(prev => ({ ...prev, phase: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            {RESEARCH_PHASES.map((phase) => (
              <option key={phase} value={phase}>{phase}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            {PRIORITY_LEVELS.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Budget (KRW)
          </label>
          <input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="50000000"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <AccessibleButton
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </AccessibleButton>
        <AccessibleButton
          type="submit"
          variant="primary"
        >
          Create Project
        </AccessibleButton>
      </div>
    </form>
  );
}