import React from 'react';
import { useAuthStore } from '../store/authStore';
import { courseData } from '../data/courseData';
import { BookOpen, CheckCircle2, Clock, GraduationCap, BookCheck } from 'lucide-react';

const RegisteredCourses = () => {
  const { enrollments } = useAuthStore();
  const [currentEnrollments, setCurrentEnrollments] = React.useState([]);
  const [completedEnrollments, setCompletedEnrollments] = React.useState([]);

  React.useEffect(() => {
    const current = enrollments
      .filter(e => e.status === 'enrolled')
      .map(enrollment => {
        const course = courseData.find(c => c.id === enrollment.courseId);
        return {
          ...enrollment,
          course
        };
      });

    const completed = enrollments
      .filter(e => e.status === 'completed')
      .map(enrollment => {
        const course = courseData.find(c => c.id === enrollment.courseId);
        return {
          ...enrollment,
          course
        };
      });

    setCurrentEnrollments(current);
    setCompletedEnrollments(completed);
  }, [enrollments]);

  const calculateProgress = () => {
    const totalRequiredCredits = courseData
      .filter(course => !course.isElective)
      .reduce((total, course) => total + course.credits, 0);

    const completedRequiredCredits = completedEnrollments
      .filter(e => !e.course.isElective)
      .reduce((total, e) => total + e.course.credits, 0);

    const currentCredits = currentEnrollments
      .reduce((total, e) => total + e.course.credits, 0);

    const totalElectiveCredits = 25;
    const completedElectiveCredits = completedEnrollments
      .filter(e => e.course.isElective)
      .reduce((total, e) => total + e.course.credits, 0);

    const totalCreditsNeeded = totalRequiredCredits + totalElectiveCredits;
    const totalCompletedCredits = completedRequiredCredits + completedElectiveCredits;

    const percentage = totalCreditsNeeded > 0 
      ? Math.round((totalCompletedCredits / totalCreditsNeeded) * 100)
      : 0;

    return {
      totalRequired: totalRequiredCredits,
      completedRequired: completedRequiredCredits,
      current: currentCredits,
      currentCourses: currentEnrollments.length,
      percentage,
      totalElective: totalElectiveCredits,
      completedElective: completedElectiveCredits,
      totalCreditsNeeded,
      totalCompletedCredits
    };
  };

  const progress = calculateProgress();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-[#006D77]" size={24} />
        <h2 className="text-2xl font-bold text-[#006D77]">Registered Courses</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="text-[#006D77]" size={24} />
          <h3 className="text-xl font-semibold text-[#006D77]">Progress Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#EDF6F9] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-[#006D77] font-medium">Completed Credits</span>
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#006D77]">
                {progress.completedRequired}
                <span className="text-sm font-normal text-gray-600">
                  /{progress.totalRequired}
                </span>
              </div>
              <div className="text-sm text-gray-600">required credits</div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full progress-bar"
                style={{ width: `${(progress.completedRequired / progress.totalRequired) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#EDF6F9] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-[#006D77] font-medium">Current Semester</span>
              <Clock className="text-amber-600" size={20} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#006D77]">
                {progress.current}
                <span className="text-sm font-normal text-gray-600">
                  /{progress.totalCreditsNeeded}
                </span>
              </div>
              <div className="text-sm text-gray-600">credits in progress</div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full progress-bar"
                style={{ width: `${(progress.current / progress.totalCreditsNeeded) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#EDF6F9] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-[#006D77] font-medium">Elective Progress</span>
              <BookCheck className="text-blue-600" size={20} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#006D77]">
                {progress.completedElective}
                <span className="text-sm font-normal text-gray-600">
                  /{progress.totalElective}
                </span>
              </div>
              <div className="text-sm text-gray-600">elective credits</div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full progress-bar"
                style={{ width: `${(progress.completedElective / progress.totalElective) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#EDF6F9] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-[#006D77] font-medium">Overall Progress</span>
              <GraduationCap className="text-[#006D77]" size={20} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#006D77]">
                {progress.totalCompletedCredits}
                <span className="text-sm font-normal text-gray-600">
                  /{progress.totalCreditsNeeded}
                </span>
              </div>
              <div className="text-sm text-gray-600">total credits ({progress.percentage}%)</div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#006D77] rounded-full progress-bar"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Current Enrollments */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#006D77] mb-4">Current Enrollments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentEnrollments.map(enrollment => (
            <div 
              key={enrollment.id} 
              className="bg-white rounded-lg shadow p-4 border-l-4 border-[#006D77]"
            >
              <h4 className="font-medium text-[#006D77]">{enrollment.course.code}</h4>
              <p className="text-sm text-gray-600 mb-2">{enrollment.course.courseName}</p>
              <div className="space-y-2">
                {enrollment.course.schedule?.map((slot, index) => (
                  <div key={index} className="text-sm bg-[#EDF6F9] rounded-lg p-2">
                    <div className="font-medium text-[#006D77]">{slot.day}</div>
                    <div className="text-gray-600 flex items-center gap-1">
                      <Clock size={14} />
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <div className="text-gray-500 text-xs">Room: {slot.room}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      <div>
        <h3 className="text-xl font-semibold text-[#006D77] mb-4">Completed Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedEnrollments.map(enrollment => (
            <div 
              key={enrollment.id} 
              className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-[#006D77]">{enrollment.course.code}</h4>
                <CheckCircle2 className="text-green-600" size={20} />
              </div>
              <p className="text-sm text-gray-600">{enrollment.course.courseName}</p>
              <div className="text-xs text-gray-500 mt-2">
                Completed: {new Date(enrollment.completedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredCourses;