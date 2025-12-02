/**
 * Mentorship Dashboard
 * ===================
 *
 * Dashboard for managing mentorship relationships, tracking progress,
 * scheduling meetings, and facilitating communication between mentors and fellows.
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  VideoCameraIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { AccessibleModal } from '@/components/ui/AccessibleModal';

// Mock mentorship data
const mockMentorships = [
  {
    id: 1,
    mentor: {
      id: 1,
      name: '유신재',
      nameEn: 'Shin-Jae You',
      institution: 'Brookhaven National Laboratory',
      avatar: '/images/mentors/you-shinjae.jpg',
    },
    fellow: {
      id: 1,
      name: '김지현',
      nameEn: 'Ji-Hyun Kim',
      institution: 'SNU Graduate School',
      avatar: '/images/fellows/kim-jihyun.jpg',
    },
    status: 'active',
    startDate: '2024-09-01',
    researchArea: 'fMRI Analysis',
    nextMeeting: {
      date: '2025-01-15T14:00:00Z',
      type: 'video',
      agenda: 'Discuss preprocessing pipeline results',
    },
    progress: {
      completedMilestones: 3,
      totalMilestones: 5,
      currentPhase: 'Data Analysis',
      nextDeadline: '2025-01-30',
    },
    recentActivity: [
      {
        date: '2025-01-05',
        type: 'meeting',
        description: 'Weekly progress review',
      },
      {
        date: '2025-01-03',
        type: 'document',
        description: 'Submitted analysis report',
      },
    ],
  },
  {
    id: 2,
    mentor: {
      id: 2,
      name: 'Uri Hasson',
      nameEn: 'Uri Hasson',
      institution: 'Princeton University',
      avatar: '/images/mentors/uri-hasson.jpg',
    },
    fellow: {
      id: 2,
      name: '박민준',
      nameEn: 'Min-Jun Park',
      institution: 'SNU Graduate School',
      avatar: '/images/fellows/park-minjun.jpg',
    },
    status: 'active',
    startDate: '2024-08-15',
    researchArea: 'Language Processing',
    nextMeeting: {
      date: '2025-01-18T10:00:00Z',
      type: 'in-person',
      agenda: 'Review experiment design',
    },
    progress: {
      completedMilestones: 4,
      totalMilestones: 6,
      currentPhase: 'Experiment Design',
      nextDeadline: '2025-02-15',
    },
    recentActivity: [
      {
        date: '2025-01-04',
        type: 'message',
        description: 'Discussed literature review',
      },
    ],
  },
];

const mockMeetings = [
  {
    id: 1,
    title: 'Weekly Progress Review',
    date: '2025-01-15T14:00:00Z',
    duration: 60,
    type: 'video',
    mentorshipId: 1,
    status: 'scheduled',
    agenda: ['Review preprocessing results', 'Plan next analysis steps', 'Discuss timeline'],
    meetingLink: 'https://zoom.us/j/123456789',
  },
  {
    id: 2,
    title: 'Experiment Design Review',
    date: '2025-01-18T10:00:00Z',
    duration: 90,
    type: 'in-person',
    mentorshipId: 2,
    status: 'scheduled',
    agenda: ['Review experimental paradigm', 'Finalize participant criteria', 'Ethics approval discussion'],
    location: 'SNU Psychology Building Room 301',
  },
];

export default function MentorshipDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [mentorships, setMentorships] = useState(mockMentorships);
  const [meetings, setMeetings] = useState(mockMeetings);
  const [selectedMentorship, setSelectedMentorship] = useState<typeof mockMentorships[0] | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Mock user role - in real app this would come from session
  const userRole = session?.user?.role || 'fellow'; // 'mentor' or 'fellow'

  const upcomingMeetings = meetings
    .filter(meeting => new Date(meeting.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleScheduleMeeting = (mentorshipId: number) => {
    const mentorship = mentorships.find(m => m.id === mentorshipId);
    if (mentorship) {
      setSelectedMentorship(mentorship);
      setIsScheduleModalOpen(true);
    }
  };

  const handleSubmitReport = (mentorshipId: number) => {
    const mentorship = mentorships.find(m => m.id === mentorshipId);
    if (mentorship) {
      setSelectedMentorship(mentorship);
      setIsReportModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Mentorship Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {userRole === 'mentor' ? 'Manage your mentees and track their progress' : 'Track your mentorship journey and upcoming meetings'}
              </p>
            </div>
            <div className="flex space-x-3">
              <AccessibleButton
                variant="outline"
                onClick={() => setIsScheduleModalOpen(true)}
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                Schedule Meeting
              </AccessibleButton>
              <AccessibleButton
                variant="primary"
                onClick={() => setIsReportModalOpen(true)}
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Submit Report
              </AccessibleButton>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { key: 'overview', label: 'Overview', icon: ChartBarIcon },
              { key: 'mentorships', label: 'Mentorships', icon: UserGroupIcon },
              { key: 'meetings', label: 'Meetings', icon: CalendarDaysIcon },
              { key: 'progress', label: 'Progress', icon: CheckCircleIcon },
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <UserGroupIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Mentorships
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {mentorships.filter(m => m.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                    <CalendarDaysIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Upcoming Meetings
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {upcomingMeetings.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <CheckCircleIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Completed Milestones
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {mentorships.reduce((sum, m) => sum + m.progress.completedMilestones, 0)}
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
                      Avg. Progress
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {Math.round(
                        mentorships.reduce(
                          (sum, m) => sum + (m.progress.completedMilestones / m.progress.totalMilestones) * 100,
                          0
                        ) / mentorships.length
                      )}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Meetings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Upcoming Meetings
                  </h3>
                  <AccessibleButton
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('meetings')}
                  >
                    View All
                  </AccessibleButton>
                </div>
                <div className="space-y-3">
                  {upcomingMeetings.slice(0, 3).map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                  {upcomingMeetings.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No upcoming meetings
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {mentorships.slice(0, 3).map((mentorship) =>
                    mentorship.recentActivity.map((activity, index) => (
                      <div key={`${mentorship.id}-${index}`} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {activity.type === 'meeting' && (
                            <VideoCameraIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          )}
                          {activity.type === 'document' && (
                            <DocumentTextIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                          )}
                          {activity.type === 'message' && (
                            <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mentorships Tab */}
        {activeTab === 'mentorships' && (
          <div className="space-y-6">
            {mentorships.map((mentorship) => (
              <MentorshipCard
                key={mentorship.id}
                mentorship={mentorship}
                userRole={userRole}
                onScheduleMeeting={() => handleScheduleMeeting(mentorship.id)}
                onSubmitReport={() => handleSubmitReport(mentorship.id)}
              />
            ))}
          </div>
        )}

        {/* Meetings Tab */}
        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Upcoming Meetings
              </h3>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} expanded />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            {mentorships.map((mentorship) => (
              <ProgressCard key={mentorship.id} mentorship={mentorship} />
            ))}
          </div>
        )}
      </div>

      {/* Schedule Meeting Modal */}
      <AccessibleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Meeting"
      >
        <ScheduleMeetingForm onClose={() => setIsScheduleModalOpen(false)} />
      </AccessibleModal>

      {/* Submit Report Modal */}
      <AccessibleModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Submit Progress Report"
        size="lg"
      >
        <SubmitReportForm onClose={() => setIsReportModalOpen(false)} />
      </AccessibleModal>
    </div>
  );
}

// Meeting Card Component
function MeetingCard({
  meeting,
  expanded = false
}: {
  meeting: typeof mockMeetings[0];
  expanded?: boolean;
}) {
  const meetingDate = new Date(meeting.date);
  const isToday = meetingDate.toDateString() === new Date().toDateString();

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${
      isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            {meeting.title}
          </h4>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
            <CalendarDaysIcon className="w-4 h-4 mr-1" />
            {meetingDate.toLocaleDateString()} at {meetingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
            <ClockIcon className="w-4 h-4 mr-1" />
            {meeting.duration} minutes
          </div>
          {meeting.type === 'video' && meeting.meetingLink && (
            <div className="mt-2">
              <AccessibleButton
                variant="outline"
                size="sm"
                onClick={() => window.open(meeting.meetingLink, '_blank')}
              >
                <VideoCameraIcon className="w-4 h-4 mr-1" />
                Join Video Call
              </AccessibleButton>
            </div>
          )}
        </div>
        <div className="ml-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            meeting.type === 'video'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {meeting.type === 'video' ? 'Video' : 'In-person'}
          </span>
        </div>
      </div>
      {expanded && meeting.agenda && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Agenda:
          </h5>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {meeting.agenda.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Mentorship Card Component
function MentorshipCard({
  mentorship,
  userRole,
  onScheduleMeeting,
  onSubmitReport
}: {
  mentorship: typeof mockMentorships[0];
  userRole: string;
  onScheduleMeeting: () => void;
  onSubmitReport: () => void;
}) {
  const partner = userRole === 'mentor' ? mentorship.fellow : mentorship.mentor;
  const progressPercentage = (mentorship.progress.completedMilestones / mentorship.progress.totalMilestones) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <UserGroupIcon className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {partner.name} ({partner.nameEn})
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {partner.institution}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {mentorship.researchArea}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Active
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Since {new Date(mentorship.startDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-gray-900 dark:text-gray-100">
            {mentorship.progress.completedMilestones}/{mentorship.progress.totalMilestones} milestones
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Current phase: {mentorship.progress.currentPhase}
        </p>
      </div>

      {/* Next Meeting */}
      {mentorship.nextMeeting && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Next Meeting
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {new Date(mentorship.nextMeeting.date).toLocaleDateString()} at{' '}
                {new Date(mentorship.nextMeeting.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                mentorship.nextMeeting.type === 'video'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {mentorship.nextMeeting.type}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        <AccessibleButton
          variant="outline"
          size="sm"
          onClick={onScheduleMeeting}
        >
          <CalendarDaysIcon className="w-4 h-4 mr-1" />
          Schedule Meeting
        </AccessibleButton>
        <AccessibleButton
          variant="outline"
          size="sm"
          onClick={onSubmitReport}
        >
          <DocumentTextIcon className="w-4 h-4 mr-1" />
          Submit Report
        </AccessibleButton>
        <AccessibleButton
          variant="primary"
          size="sm"
        >
          <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
          Message
        </AccessibleButton>
      </div>
    </div>
  );
}

// Progress Card Component
function ProgressCard({ mentorship }: { mentorship: typeof mockMentorships[0] }) {
  const progressPercentage = (mentorship.progress.completedMilestones / mentorship.progress.totalMilestones) * 100;
  const isOnTrack = new Date(mentorship.progress.nextDeadline) > new Date();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {mentorship.researchArea}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            with {mentorship.mentor.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isOnTrack ? (
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          ) : (
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
          )}
          <span className={`text-sm font-medium ${
            isOnTrack ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
          }`}>
            {isOnTrack ? 'On Track' : 'Needs Attention'}
          </span>
        </div>
      </div>

      {/* Progress Details */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="text-gray-900 dark:text-gray-100">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-3 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {mentorship.progress.completedMilestones}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {mentorship.progress.totalMilestones - mentorship.progress.completedMilestones}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Remaining
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {new Date(mentorship.progress.nextDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Next Deadline
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Current Phase: {mentorship.progress.currentPhase}
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Next deadline: {new Date(mentorship.progress.nextDeadline).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Schedule Meeting Form Component
function ScheduleMeetingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    duration: '60',
    type: 'video',
    agenda: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Meeting scheduled:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Meeting Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Weekly Progress Review"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date & Time
          </label>
          <input
            id="date"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Duration (minutes)
          </label>
          <select
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            <option value="90">90 minutes</option>
            <option value="120">120 minutes</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Meeting Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="video">Video Call</option>
          <option value="in-person">In-Person</option>
        </select>
      </div>

      <div>
        <label htmlFor="agenda" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Agenda
        </label>
        <textarea
          id="agenda"
          rows={3}
          value={formData.agenda}
          onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="List meeting topics and objectives..."
        />
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
          Schedule Meeting
        </AccessibleButton>
      </div>
    </form>
  );
}

// Submit Report Form Component
function SubmitReportForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    period: '',
    progress: '',
    challenges: '',
    nextSteps: '',
    attachments: null as FileList | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Report submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Report Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Weekly Progress Report - Data Analysis Phase"
          required
        />
      </div>

      <div>
        <label htmlFor="period" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Reporting Period
        </label>
        <input
          id="period"
          type="text"
          value={formData.period}
          onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="January 1-7, 2025"
          required
        />
      </div>

      <div>
        <label htmlFor="progress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Progress Made
        </label>
        <textarea
          id="progress"
          rows={3}
          value={formData.progress}
          onChange={(e) => setFormData(prev => ({ ...prev, progress: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Describe what you accomplished this period..."
          required
        />
      </div>

      <div>
        <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Challenges & Issues
        </label>
        <textarea
          id="challenges"
          rows={3}
          value={formData.challenges}
          onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Any obstacles or difficulties encountered..."
        />
      </div>

      <div>
        <label htmlFor="nextSteps" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Next Steps & Goals
        </label>
        <textarea
          id="nextSteps"
          rows={3}
          value={formData.nextSteps}
          onChange={(e) => setFormData(prev => ({ ...prev, nextSteps: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Plans for the upcoming period..."
          required
        />
      </div>

      <div>
        <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Attachments (optional)
        </label>
        <input
          id="attachments"
          type="file"
          multiple
          onChange={(e) => setFormData(prev => ({ ...prev, attachments: e.target.files }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Upload documents, presentations, or other relevant files
        </p>
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
          Submit Report
        </AccessibleButton>
      </div>
    </form>
  );
}