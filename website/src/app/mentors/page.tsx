/**
 * Mentor Network Page
 * ==================
 *
 * Main page for the mentor network, showcasing mentors,
 * their expertise, and facilitating connections with fellows.
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  AcademicCapIcon,
  UserGroupIcon,
  StarIcon,
  MapPinIcon,
  LanguageIcon,
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { AccessibleModal } from '@/components/ui/AccessibleModal';

// Mock mentor data (will be replaced with API calls)
const mockMentors = [
  {
    id: 1,
    name: '유신재',
    nameEn: 'Shin-Jae You',
    title: '교수 / Professor',
    institution: 'Brookhaven National Laboratory',
    expertise: ['Neuroimaging', 'fMRI', 'Brain Networks', 'Computational Neuroscience'],
    languages: ['Korean', 'English'],
    location: 'New York, USA',
    experience: 15,
    rating: 4.9,
    totalMentees: 12,
    activeMentees: 3,
    bio: '뇌영상학 및 계산신경과학 분야의 세계적 권위자로, fMRI와 뇌네트워크 연구에서 혁신적인 성과를 거두고 있습니다.',
    bioEn: 'World-renowned expert in neuroimaging and computational neuroscience, achieving breakthrough results in fMRI and brain network research.',
    availability: 'Available',
    nextAvailableSlot: '2025-01-15T14:00:00Z',
    avatar: '/images/mentors/you-shinjae.jpg',
    specializations: [
      { name: 'fMRI Analysis', level: 'Expert' },
      { name: 'Brain Connectivity', level: 'Expert' },
      { name: 'Machine Learning', level: 'Advanced' },
      { name: 'Python Programming', level: 'Advanced' }
    ],
    publications: 120,
    hIndex: 45,
    contact: {
      email: 'syou@bnl.gov',
      linkedin: 'linkedin.com/in/shinjae-you',
      twitter: '@shinjae_you'
    }
  },
  {
    id: 2,
    name: 'Uri Hasson',
    nameEn: 'Uri Hasson',
    title: 'Professor',
    institution: 'Princeton University',
    expertise: ['Cognitive Neuroscience', 'Language Processing', 'Social Cognition', 'Real-world Neuroscience'],
    languages: ['English', 'Hebrew'],
    location: 'Princeton, USA',
    experience: 20,
    rating: 4.8,
    totalMentees: 15,
    activeMentees: 4,
    bio: '인지신경과학 분야의 선구자로, 실제 환경에서의 뇌 기능 연구에 혁신적인 접근법을 제시했습니다.',
    bioEn: 'Pioneer in cognitive neuroscience, presenting innovative approaches to brain function research in real-world environments.',
    availability: 'Busy',
    nextAvailableSlot: '2025-02-01T10:00:00Z',
    avatar: '/images/mentors/uri-hasson.jpg',
    specializations: [
      { name: 'Naturalistic Stimuli', level: 'Expert' },
      { name: 'Inter-subject Correlation', level: 'Expert' },
      { name: 'Language Networks', level: 'Expert' },
      { name: 'Social Neuroscience', level: 'Advanced' }
    ],
    publications: 95,
    hIndex: 52,
    contact: {
      email: 'hasson@princeton.edu',
      linkedin: 'linkedin.com/in/uri-hasson'
    }
  },
  {
    id: 3,
    name: '김민식',
    nameEn: 'Min-Sik Kim',
    title: '연구교수 / Research Professor',
    institution: 'Seoul National University',
    expertise: ['Deep Learning', 'Brain-Computer Interface', 'Neural Engineering', 'AI in Neuroscience'],
    languages: ['Korean', 'English'],
    location: 'Seoul, Korea',
    experience: 8,
    rating: 4.7,
    totalMentees: 8,
    activeMentees: 2,
    bio: 'AI와 신경공학의 융합 연구를 선도하며, 뇌-컴퓨터 인터페이스 분야에서 차세대 기술을 개발하고 있습니다.',
    bioEn: 'Leading convergence research in AI and neural engineering, developing next-generation technologies in brain-computer interface field.',
    availability: 'Available',
    nextAvailableSlot: '2025-01-10T09:00:00Z',
    avatar: '/images/mentors/kim-minsik.jpg',
    specializations: [
      { name: 'Deep Learning', level: 'Expert' },
      { name: 'BCI Systems', level: 'Expert' },
      { name: 'Neural Decoding', level: 'Advanced' },
      { name: 'PyTorch', level: 'Advanced' }
    ],
    publications: 45,
    hIndex: 28,
    contact: {
      email: 'mskim@snu.ac.kr',
      linkedin: 'linkedin.com/in/minsik-kim'
    }
  }
];

const EXPERTISE_AREAS = [
  'Neuroimaging',
  'Computational Neuroscience',
  'Machine Learning',
  'Deep Learning',
  'Brain Networks',
  'Cognitive Neuroscience',
  'Neural Engineering',
  'Brain-Computer Interface',
  'Language Processing',
  'Social Cognition'
];

export default function MentorNetworkPage() {
  const { data: session } = useSession();
  const [mentors, setMentors] = useState(mockMentors);
  const [filteredMentors, setFilteredMentors] = useState(mockMentors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState<typeof mockMentors[0] | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Filter mentors based on search and filters
  useEffect(() => {
    let filtered = mentors;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(query) ||
        mentor.nameEn.toLowerCase().includes(query) ||
        mentor.institution.toLowerCase().includes(query) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(query))
      );
    }

    // Expertise filter
    if (selectedExpertise.length > 0) {
      filtered = filtered.filter(mentor =>
        selectedExpertise.some(expertise =>
          mentor.expertise.includes(expertise)
        )
      );
    }

    // Availability filter
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(mentor =>
        availabilityFilter === 'available'
          ? mentor.availability === 'Available'
          : mentor.availability !== 'Available'
      );
    }

    setFilteredMentors(filtered);
  }, [searchQuery, selectedExpertise, availabilityFilter, mentors]);

  const handleExpertiseToggle = (expertise: string) => {
    setSelectedExpertise(prev =>
      prev.includes(expertise)
        ? prev.filter(e => e !== expertise)
        : [...prev, expertise]
    );
  };

  const handleViewProfile = (mentor: typeof mockMentors[0]) => {
    setSelectedMentor(mentor);
    setIsProfileModalOpen(true);
  };

  const handleContactMentor = (mentor: typeof mockMentors[0]) => {
    setSelectedMentor(mentor);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Mentor Network
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              멘토 네트워크
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              세계적 수준의 멘토들과 연결되어 연구 여정을 함께하세요.
              Connect with world-class mentors and embark on your research journey together.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {mentors.length}
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-300">
                Active Mentors
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {mentors.reduce((sum, m) => sum + m.activeMentees, 0)}
              </div>
              <div className="text-sm text-green-800 dark:text-green-300">
                Active Mentorships
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {EXPERTISE_AREAS.length}
              </div>
              <div className="text-sm text-purple-800 dark:text-purple-300">
                Expertise Areas
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {Math.round(mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length * 10) / 10}
              </div>
              <div className="text-sm text-orange-800 dark:text-orange-300">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="lg:col-span-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Mentors
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, institution, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Availability
              </label>
              <select
                id="availability"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="all">All Mentors</option>
                <option value="available">Available Now</option>
                <option value="busy">Busy</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-end">
              <AccessibleButton
                variant="outline"
                onClick={() => {
                  // Toggle expertise filter visibility
                  const filterSection = document.getElementById('expertise-filters');
                  if (filterSection) {
                    filterSection.classList.toggle('hidden');
                  }
                }}
                className="w-full"
              >
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filter by Expertise
              </AccessibleButton>
            </div>
          </div>

          {/* Expertise Filters */}
          <div id="expertise-filters" className="hidden mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Expertise Areas
            </label>
            <div className="flex flex-wrap gap-2">
              {EXPERTISE_AREAS.map((expertise) => (
                <button
                  key={expertise}
                  onClick={() => handleExpertiseToggle(expertise)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedExpertise.includes(expertise)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {expertise}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onViewProfile={() => handleViewProfile(mentor)}
              onContact={() => handleContactMentor(mentor)}
            />
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No mentors found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <AccessibleModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          title={`${selectedMentor.name} Profile`}
          size="lg"
        >
          <MentorProfileContent mentor={selectedMentor} />
        </AccessibleModal>
      )}

      {/* Contact Modal */}
      {selectedMentor && (
        <AccessibleModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          title={`Contact ${selectedMentor.name}`}
        >
          <ContactMentorForm mentor={selectedMentor} />
        </AccessibleModal>
      )}
    </div>
  );
}

// Mentor Card Component
function MentorCard({
  mentor,
  onViewProfile,
  onContact
}: {
  mentor: typeof mockMentors[0];
  onViewProfile: () => void;
  onContact: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Avatar and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <AcademicCapIcon className="w-8 h-8 text-gray-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {mentor.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mentor.nameEn}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {mentor.title}
          </p>
        </div>
      </div>

      {/* Institution and Location */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <AcademicCapIcon className="w-4 h-4 mr-2" />
          {mentor.institution}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {mentor.location}
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {mentor.expertise.slice(0, 3).map((exp) => (
            <span
              key={exp}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
            >
              {exp}
            </span>
          ))}
          {mentor.expertise.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
              +{mentor.expertise.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center">
          <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-gray-900 dark:text-gray-100">{mentor.rating}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <UserGroupIcon className="w-4 h-4 mr-1" />
          {mentor.activeMentees} active
        </div>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          mentor.availability === 'Available'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            mentor.availability === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          {mentor.availability}
        </span>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <AccessibleButton
          variant="outline"
          size="sm"
          onClick={onViewProfile}
          className="flex-1"
        >
          View Profile
        </AccessibleButton>
        <AccessibleButton
          variant="primary"
          size="sm"
          onClick={onContact}
          className="flex-1"
        >
          <ChatBubbleLeftEllipsisIcon className="w-4 h-4 mr-1" />
          Contact
        </AccessibleButton>
      </div>
    </div>
  );
}

// Mentor Profile Content Component
function MentorProfileContent({ mentor }: { mentor: typeof mockMentors[0] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <AcademicCapIcon className="w-10 h-10 text-gray-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {mentor.name}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {mentor.nameEn}
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            {mentor.title} at {mentor.institution}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Biography
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {mentor.bio}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {mentor.bioEn}
        </p>
      </div>

      {/* Specializations */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Specializations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mentor.specializations.map((spec) => (
            <div
              key={spec.name}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <span className="text-gray-900 dark:text-gray-100">
                {spec.name}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                spec.level === 'Expert'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              }`}>
                {spec.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {mentor.publications}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Publications
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {mentor.hIndex}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            h-index
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {mentor.experience}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Years Exp.
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {mentor.totalMentees}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mentees
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Mentor Form Component
function ContactMentorForm({ mentor }: { mentor: typeof mockMentors[0] }) {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    preferredMeetingTime: '',
    researchArea: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    // Reset form or show success message
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject / 제목
        </label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Meeting request for research guidance"
          required
        />
      </div>

      <div>
        <label htmlFor="researchArea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Research Area / 연구 분야
        </label>
        <select
          id="researchArea"
          value={formData.researchArea}
          onChange={(e) => setFormData(prev => ({ ...prev, researchArea: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          required
        >
          <option value="">Select research area</option>
          {mentor.expertise.map((exp) => (
            <option key={exp} value={exp}>{exp}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="preferredMeetingTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Preferred Meeting Time / 희망 미팅 시간
        </label>
        <input
          id="preferredMeetingTime"
          type="datetime-local"
          value={formData.preferredMeetingTime}
          onChange={(e) => setFormData(prev => ({ ...prev, preferredMeetingTime: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message / 메시지
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Please introduce yourself and explain how this mentorship would help your research goals..."
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <AccessibleButton
          type="button"
          variant="outline"
          onClick={() => setFormData({ subject: '', message: '', preferredMeetingTime: '', researchArea: '' })}
        >
          Clear / 지우기
        </AccessibleButton>
        <AccessibleButton
          type="submit"
          variant="primary"
        >
          Send Message / 메시지 보내기
        </AccessibleButton>
      </div>
    </form>
  );
}