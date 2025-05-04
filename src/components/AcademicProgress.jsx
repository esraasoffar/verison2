import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { courseData } from '../data/courseData';
import { 
  BookCheck, 
  Clock, 
  GraduationCap, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';

const AcademicProgress = () => {
  const { enrollments } = useAuthStore();
  const [activeTab, setActiveTab] = useState('currentSemester');

  const calculateProgress = () => {
    const totalRequiredCredits = courseData
      .filter(course => !course.isElective)
      .reduce((total, course) => total + course.credits, 0);

    const completedMandatory = enrollments
      .filter(e => {
        const course = courseData.find(c => c.id === e.courseId);
        return e.status === 'completed' && !course.isElective;
      })
      .map(enrollment => {
        const course = courseData.find(c => c.id === enrollment.courseId);
        return {
          ...enrollment,
          course
        };
      });

    const currentEnrollments = enrollments
      .filter(e => e.status === 'enrolled')
      .map(enrollment => {
        const course = courseData.find(c => c.id === enrollment.courseId);
        return {
          ...enrollment,
          course
        };
      });

    const completedElectives = enrollments
      .filter(e => {
        const course = courseData.find(c => c.id === e.courseId);
        return e.status === 'completed' && course.isElective;
      })
      .map(enrollment => {
        const course = courseData.find(c => c.id === enrollment.courseId);
        return {
          ...enrollment,
          course
        };
      });

    const completedMandatoryCredits = completedMandatory
      .reduce((total, e) => total + e.course.credits, 0);

    const currentCredits = currentEnrollments
      .reduce((total, e) => total + e.course.credits, 0);

    const completedElectiveCredits = completedElectives
      .reduce((total, e) => total + e.course.credits, 0);

    const totalElectiveCredits = 25;
    const totalCreditsNeeded = totalRequiredCredits + totalElectiveCredits;
    const totalCompletedCredits = completedMandatoryCredits + completedElectiveCredits;
    const percentage = Math.round((totalCompletedCredits / totalCreditsNeeded) * 100);

    return {
      mandatoryCredits: {
        completed: completedMandatoryCredits,
        total: totalRequiredCredits,
        courses: completedMandatory
      },
      currentSemester: {
        credits: currentCredits,
        total: totalCreditsNeeded,
        percentage: Math.round((currentCredits / totalCreditsNeeded) * 100),
        courses: currentEnrollments
      },
      electiveCredits: {
        completed: completedElectiveCredits,
        total: totalElectiveCredits,
        courses: completedElectives
      },
      overall: {
        completed: totalCompletedCredits,
        total: totalCreditsNeeded,
        percentage,
        courses: [...completedMandatory, ...completedElectives]
      }
    };
  };

  const progress = calculateProgress();

  const renderCourseTable = (courses) => (
    <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Credits
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            {activeTab === 'currentSemester' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((enrollment) => (
            <tr key={enrollment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#006D77]">
                {enrollment.course.code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {enrollment.course.courseName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {enrollment.course.credits}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  enrollment.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {enrollment.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </td>
              {activeTab === 'currentSemester' && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enrollment.course.schedule?.map((slot, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{slot.day} {slot.startTime}-{slot.endTime}</span>
                    </div>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-[#006D77]" size={24} />
        <h2 className="text-2xl font-bold text-[#006D77]">Academic Progress</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => setActiveTab(activeTab === 'mandatory' ? null : 'mandatory')}
          className={`bg-[#EDF6F9] rounded-lg p-4 transition-all ${
            activeTab === 'mandatory' ? 'ring-2 ring-[#006D77]' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[#006D77] font-medium">Completed Mandatory Credits</span>
            <CheckCircle2 className="text-green-600" size={20} />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#006D77]">
              {progress.mandatoryCredits.completed}
              <span className="text-sm font-normal text-gray-600">
                /{progress.mandatoryCredits.total}
              </span>
            </div>
            <div className="text-sm text-gray-600">required credits</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full progress-bar"
              style={{ width: `${(progress.mandatoryCredits.completed / progress.mandatoryCredits.total) * 100}%` }}
            />
          </div>
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'currentSemester' ? null : 'currentSemester')}
          className={`bg-[#EDF6F9] rounded-lg p-4 transition-all ${
            activeTab === 'currentSemester' ? 'ring-2 ring-[#006D77]' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[#006D77] font-medium">Current Semester</span>
            <Clock className="text-amber-600" size={20} />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#006D77]">
              {progress.currentSemester.credits}
              <span className="text-sm font-normal text-gray-600">
                /{progress.currentSemester.total}
              </span>
            </div>
            <div className="text-sm text-gray-600">credits in progress</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full progress-bar"
              style={{ width: `${progress.currentSemester.percentage}%` }}
            />
          </div>
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'elective' ? null : 'elective')}
          className={`bg-[#EDF6F9] rounded-lg p-4 transition-all ${
            activeTab === 'elective' ? 'ring-2 ring-[#006D77]' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[#006D77] font-medium">Elective Progress</span>
            <BookOpen className="text-blue-600" size={20} />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#006D77]">
              {progress.electiveCredits.completed}
              <span className="text-sm font-normal text-gray-600">
                /{progress.electiveCredits.total}
              </span>
            </div>
            <div className="text-sm text-gray-600">elective credits</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full progress-bar"
              style={{ width: `${(progress.electiveCredits.completed / progress.electiveCredits.total) * 100}%` }}
            />
          </div>
        </button>

        <button
          onClick={() => setActiveTab(activeTab === 'overall' ? null : 'overall')}
          className={`bg-[#EDF6F9] rounded-lg p-4 transition-all ${
            activeTab === 'overall' ? 'ring-2 ring-[#006D77]' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[#006D77] font-medium">Overall Progress</span>
            <BookCheck className="text-[#006D77]" size={20} />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#006D77]">
              {progress.overall.completed}
              <span className="text-sm font-normal text-gray-600">
                /{progress.overall.total}
              </span>
            </div>
            <div className="text-sm text-gray-600">total credits ({progress.overall.percentage}%)</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#006D77] rounded-full progress-bar"
              style={{ width: `${progress.overall.percentage}%` }}
            />
          </div>
        </button>
      </div>

      {activeTab && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#006D77] mb-4">
            {activeTab === 'mandatory' && 'Completed Mandatory Courses'}
            {activeTab === 'currentSemester' && 'Current Semester Courses'}
            {activeTab === 'elective' && 'Completed Elective Courses'}
            {activeTab === 'overall' && 'All Completed Courses'}
          </h3>
          {renderCourseTable(
            activeTab === 'mandatory' ? progress.mandatoryCredits.courses :
            activeTab === 'currentSemester' ? progress.currentSemester.courses :
            activeTab === 'elective' ? progress.electiveCredits.courses :
            progress.overall.courses
          )}
        </div>
      )}
    </div>
  );
};

export default AcademicProgress;