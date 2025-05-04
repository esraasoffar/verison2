import React, { useState } from 'react';
import { courseData } from '../data/courseData';
import { Clock, BookOpen, CheckCircle2, AlertCircle, BookCheck } from 'lucide-react';
import CourseModal from './CourseModal';
import { useAuthStore } from '../store/authStore';

const ElectiveCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { isEnrolledInCourse, hasCompletedCourse } = useAuthStore();
  const electiveCourses = courseData.filter(course => course.isElective);

  const handleRegister = (course, e) => {
    e.stopPropagation();
    setSelectedCourse(course);
  };

  return (
    <div className="mt-12 px-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-[#006D77]" size={24} />
        <h2 className="text-2xl font-bold text-[#006D77]">Available Elective Courses</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-[#EDF6F9] border-b">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-[#006D77]" size={20} />
            <p className="text-sm text-[#006D77]">
              Students must complete at least 25 credits from the available elective courses
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
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
                  Prerequisites
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {electiveCourses.map((course) => {
                const isEnrolled = isEnrolledInCourse(course.id);
                const isCompleted = hasCompletedCourse(course.id);
                return (
                  <tr 
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                      isEnrolled ? 'bg-amber-50' : isCompleted ? 'bg-green-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isCompleted ? (
                        <div className="flex items-center justify-center">
                          <CheckCircle2 className="text-green-600" size={20} />
                        </div>
                      ) : isEnrolled ? (
                        <div className="flex items-center justify-center">
                          <BookCheck className="text-amber-600" size={20} />
                        </div>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#006D77]">
                      {course.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.prerequisiteName || 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.schedule.map((slot, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{slot.day} {slot.startTime}-{slot.endTime}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={(e) => handleRegister(course, e)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isCompleted
                            ? 'bg-green-100 text-green-600 cursor-not-allowed'
                            : isEnrolled
                            ? 'bg-amber-100 text-amber-600 cursor-not-allowed'
                            : 'bg-[#006D77] text-white hover:bg-[#005a63]'
                        }`}
                        disabled={isEnrolled || isCompleted}
                      >
                        {isCompleted ? 'Completed' : isEnrolled ? 'Enrolled' : 'Register'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default ElectiveCourses;