'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  UserIcon,
  AcademicCapIcon,
  BeakerIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { FellowApplication, Department, SkillLevel } from '@/types';

// Form sections
const sections = [
  {
    id: 'personal',
    title: 'Personal Information',
    titleKorean: '개인정보',
    icon: UserIcon,
    description: 'Basic personal and contact information',
    descriptionKorean: '기본 개인 및 연락처 정보',
  },
  {
    id: 'academic',
    title: 'Academic Background',
    titleKorean: '학업 배경',
    icon: AcademicCapIcon,
    description: 'Academic record and relevant coursework',
    descriptionKorean: '학업 기록 및 관련 교과목',
  },
  {
    id: 'skills',
    title: 'Skills & Experience',
    titleKorean: '기술 및 경험',
    icon: BeakerIcon,
    description: 'Technical skills and research experience',
    descriptionKorean: '기술 능력 및 연구 경험',
  },
  {
    id: 'research',
    title: 'Research Interests',
    titleKorean: '연구 관심사',
    icon: BeakerIcon,
    description: 'Research areas and previous work',
    descriptionKorean: '연구 분야 및 이전 작업',
  },
  {
    id: 'essays',
    title: 'Essays',
    titleKorean: '에세이',
    icon: DocumentTextIcon,
    description: 'Personal statements and research proposal',
    descriptionKorean: '개인 성명서 및 연구 제안서',
  },
  {
    id: 'references',
    title: 'References & Portfolio',
    titleKorean: '추천인 및 포트폴리오',
    icon: PresentationChartLineIcon,
    description: 'Academic references and portfolio links',
    descriptionKorean: '학업 추천인 및 포트폴리오 링크',
  },
];

interface FormData extends Omit<FellowApplication, 'submittedAt'> {}

export function ApplicationForm() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      programmingSkills: [{ name: 'Python', level: SkillLevel.INTERMEDIATE, yearsExperience: 0 }],
      mlSkills: [],
      neuroTools: [],
      researchInterests: [{ area: '', description: '', priority: 1 }],
      relevantCourses: [{ name: '', grade: '', credits: 0 }],
      references: [
        { name: '', position: '', institution: '', email: '', relationship: '' },
        { name: '', position: '', institution: '', email: '', relationship: '' },
      ],
      publications: [],
    },
  });

  const {
    fields: programmingFields,
    append: appendProgramming,
    remove: removeProgramming,
  } = useFieldArray({
    control,
    name: 'programmingSkills',
  });

  const {
    fields: mlFields,
    append: appendML,
    remove: removeML,
  } = useFieldArray({
    control,
    name: 'mlSkills',
  });

  const {
    fields: neuroFields,
    append: appendNeuro,
    remove: removeNeuro,
  } = useFieldArray({
    control,
    name: 'neuroTools',
  });

  const {
    fields: interestFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({
    control,
    name: 'researchInterests',
  });

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: 'relevantCourses',
  });

  const {
    fields: referenceFields,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({
    control,
    name: 'references',
  });

  const nextSection = async () => {
    const currentSectionId = sections[currentSection].id;
    let fieldsToValidate: string[] = [];

    // Define which fields to validate for each section
    switch (currentSectionId) {
      case 'personal':
        fieldsToValidate = [
          'nameKorean',
          'nameEnglish',
          'studentId',
          'email',
          'phone',
          'department',
          'year',
        ];
        break;
      case 'academic':
        fieldsToValidate = ['gpaOverall', 'gpaMajor'];
        break;
      case 'skills':
        fieldsToValidate = ['programmingSkills'];
        break;
      case 'research':
        fieldsToValidate = ['researchInterests'];
        break;
      case 'essays':
        fieldsToValidate = ['motivationStatement', 'researchProposal', 'longTermVision'];
        break;
      case 'references':
        fieldsToValidate = ['references'];
        break;
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Here you would submit to your API
      console.log('Submitting application:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Application submitted successfully!');
      toast.success('지원서가 성공적으로 제출되었습니다!');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      toast.error('지원서 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">
            Korean Name <span className="korean">한국어 이름</span> *
          </label>
          <input
            {...register('nameKorean', {
              required: 'Korean name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            className="form-input"
            placeholder="김철수"
          />
          {errors.nameKorean && (
            <p className="text-sm text-red-600 mt-1">{errors.nameKorean.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            English Name <span className="korean">영어 이름</span> *
          </label>
          <input
            {...register('nameEnglish', {
              required: 'English name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            className="form-input"
            placeholder="Cheolsu Kim"
          />
          {errors.nameEnglish && (
            <p className="text-sm text-red-600 mt-1">{errors.nameEnglish.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Student ID <span className="korean">학번</span> *
          </label>
          <input
            {...register('studentId', {
              required: 'Student ID is required',
              pattern: {
                value: /^\d{4}-\d{5}$/,
                message: 'Format: YYYY-NNNNN (e.g., 2022-12345)',
              },
            })}
            className="form-input"
            placeholder="2022-12345"
          />
          {errors.studentId && (
            <p className="text-sm text-red-600 mt-1">{errors.studentId.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Email <span className="korean">이메일</span> *
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="form-input"
            placeholder="your.email@snu.ac.kr"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Phone <span className="korean">전화번호</span> *
          </label>
          <input
            {...register('phone', { required: 'Phone number is required' })}
            className="form-input"
            placeholder="010-1234-5678"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Department <span className="korean">학과</span> *
          </label>
          <select
            {...register('department', { required: 'Department is required' })}
            className="form-input"
          >
            <option value="">Select Department</option>
            {Object.entries(Department).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-sm text-red-600 mt-1">{errors.department.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Year <span className="korean">학년</span> *
          </label>
          <select
            {...register('year', { required: 'Year is required' })}
            className="form-input"
          >
            <option value="">Select Year</option>
            <option value={1}>1학년</option>
            <option value={2}>2학년</option>
            <option value={3}>3학년</option>
            <option value={4}>4학년</option>
            <option value={5}>5학년</option>
            <option value={6}>6학년</option>
          </select>
          {errors.year && (
            <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAcademicSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">
            Overall GPA <span className="korean">전체 학점</span> *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4.5"
            {...register('gpaOverall', {
              required: 'Overall GPA is required',
              min: { value: 0, message: 'GPA must be at least 0' },
              max: { value: 4.5, message: 'GPA cannot exceed 4.5' },
            })}
            className="form-input"
            placeholder="4.0"
          />
          {errors.gpaOverall && (
            <p className="text-sm text-red-600 mt-1">{errors.gpaOverall.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Major GPA <span className="korean">전공 학점</span> *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4.5"
            {...register('gpaMajor', {
              required: 'Major GPA is required',
              min: { value: 0, message: 'GPA must be at least 0' },
              max: { value: 4.5, message: 'GPA cannot exceed 4.5' },
            })}
            className="form-input"
            placeholder="4.2"
          />
          {errors.gpaMajor && (
            <p className="text-sm text-red-600 mt-1">{errors.gpaMajor.message}</p>
          )}
        </div>
      </div>

      {/* Relevant Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Relevant Courses <span className="korean text-sm">관련 과목</span>
          </h4>
          <button
            type="button"
            onClick={() => appendCourse({ name: '', grade: '', credits: 0 })}
            className="btn-ghost text-sm"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Course
          </button>
        </div>

        {courseFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <input
                {...register(`relevantCourses.${index}.name`)}
                className="form-input"
                placeholder="Course name"
              />
            </div>
            <div>
              <input
                {...register(`relevantCourses.${index}.grade`)}
                className="form-input"
                placeholder="Grade (A+, A, B+, etc.)"
              />
            </div>
            <div className="flex space-x-2">
              <input
                type="number"
                {...register(`relevantCourses.${index}.credits`)}
                className="form-input"
                placeholder="Credits"
              />
              {courseFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCourse(index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center space-x-2 ${
                    index <= currentSection ? 'text-brain-primary' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      index < currentSection
                        ? 'bg-brain-primary text-white'
                        : index === currentSection
                        ? 'bg-brain-primary text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {index < currentSection ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-xs font-medium">{section.title}</div>
                    <div className="text-xs korean text-gray-500">{section.titleKorean}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-brand h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card p-8">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <sections[currentSection].icon className="w-8 h-8 text-brain-primary" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {sections[currentSection].title}
                    </h3>
                    <p className="text-lg korean text-gray-600">
                      {sections[currentSection].titleKorean}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  {sections[currentSection].description}
                </p>
                <p className="text-sm korean text-gray-500 mt-1">
                  {sections[currentSection].descriptionKorean}
                </p>
              </div>

              {/* Section Content */}
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentSection === 0 && renderPersonalSection()}
                {currentSection === 1 && renderAcademicSection()}
                {/* Add other sections here */}
                {currentSection > 1 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      Section under development. More form sections will be implemented here.
                    </p>
                    <p className="text-sm korean text-gray-500 mt-1">
                      개발 중인 섹션입니다. 더 많은 폼 섹션이 여기에 구현될 예정입니다.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous <span className="korean ml-1">이전</span>
                </button>

                {currentSection === sections.length - 1 ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Submitting...</span>
                        <span className="korean ml-1">제출 중...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <span className="korean ml-1">지원서 제출</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextSection}
                    className="btn-primary"
                  >
                    Next <span className="korean ml-1">다음</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}