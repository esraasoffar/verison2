import React, { useState, useRef, useEffect } from 'react';
import { X, BookCheck, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { checkScheduleConflict } from '../utils/scheduleUtils';
import TimeConflictModal from './TimeConflictModal';
import { courseData } from '../data/courseData';

const CourseModal = ({ course, onClose }) => {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [conflicts, setConflicts] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const modalRef = useRef(null);
  const { 
    registerForCourse, 
    isEnrolledInCourse, 
    hasCompletedCourse,
    studentInfo 
  } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        const timeConflictModal = document.querySelector('[data-modal="time-conflict"]');
        if (timeConflictModal && timeConflictModal.contains(event.target)) {
          return;
        }
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (hasCompletedCourse(course.id)) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [course.id, hasCompletedCourse]);

  if (!course) return null;

  const checkPrerequisites = () => {
    if (!course.prerequisiteID) return true;

    const prerequisites = Array.isArray(course.prerequisiteID) 
      ? course.prerequisiteID 
      : [course.prerequisiteID];

    return prerequisites.every(prereqId => hasCompletedCourse(prereqId));
  };

  const isAlreadyCompleted = hasCompletedCourse(course.id);
  const isCurrentlyEnrolled = isEnrolledInCourse(course.id);
  const hasPrerequisites = checkPrerequisites();
  const canRegister = !isAlreadyCompleted && !isCurrentlyEnrolled && hasPrerequisites;

  const handleRegister = () => {
    if (!canRegister) return;

    const scheduleConflicts = checkScheduleConflict(
      course,
      studentInfo?.currentlyEnrolled || [],
      courseData
    );

    if (scheduleConflicts.length > 0) {
      setConflicts(scheduleConflicts);
      return;
    }

    proceedWithRegistration();
  };

  const proceedWithRegistration = () => {
    try {
      const enrollment = registerForCourse(course.id);
      if (enrollment) {
        setRegistrationStatus({
          success: true,
          message: "Successfully registered for the course!"
        });
        setConflicts(null);
      }
    } catch (error) {
      console.error('Error registering for course:', error);
      setRegistrationStatus({
        success: false,
        message: "Failed to register for the course. Please try again."
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onMouseLeave={(e) => e.stopPropagation()}
    >
      <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 animate-confetti">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3'][i % 4],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `scale(${Math.random()})`,
                    animation: `confetti-fall ${1 + Math.random() * 2}s linear forwards`
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#006D77]">{course.code}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{course.courseName}</h3>
            <p className="text-gray-600">Credits: {course.credits}</p>
            <p className="text-gray-600">Semester: {course.semester || 'Not specified'}</p>
            
            {isAlreadyCompleted && (
              <div className="mt-2 text-green-600 flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>Course Completed</span>
              </div>
            )}
            
            {isCurrentlyEnrolled && (
              <div className="mt-2 text-amber-600 flex items-center gap-2">
                <BookCheck size={20} />
                <span>Currently Enrolled</span>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Prerequisites:</h4>
            {course.prerequisiteID ? (
              <div>
                {Array.isArray(course.prerequisiteName) ? (
                  <ul className="list-disc list-inside">
                    {course.prerequisiteName.map((name, index) => (
                      <li key={index} className={`${
                        hasCompletedCourse(course.prerequisiteID[index])
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}>
                        {name}
                        {hasCompletedCourse(course.prerequisiteID[index]) && 
                          ' ✓'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={`${
                    hasCompletedCourse(course.prerequisiteID)
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}>
                    {course.prerequisiteName}
                    {hasCompletedCourse(course.prerequisiteID) && ' ✓'}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No prerequisites</p>
            )}
          </div>

          {course.schedule && course.schedule.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Schedule:</h4>
              <div className="space-y-2">
                {course.schedule.map((slot, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-lg">
                    <div className="font-medium text-gray-700">{slot.day}</div>
                    <div className="text-sm text-gray-600">
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <div className="text-sm text-gray-500">Room: {slot.room}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {registrationStatus && (
            <div className={`p-4 rounded-lg ${
              registrationStatus.success 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            } flex items-center gap-2`}>
              {registrationStatus.success 
                ? <CheckCircle2 size={20} /> 
                : <AlertCircle size={20} />}
              <p>{registrationStatus.message}</p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            {isAlreadyCompleted ? (
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg bg-green-500 text-white cursor-not-allowed"
              >
                <CheckCircle2 size={20} />
                Course Completed
              </button>
            ) : isCurrentlyEnrolled ? (
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg bg-amber-500 text-white cursor-not-allowed"
              >
                <BookCheck size={20} />
                Currently Enrolled
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={!canRegister}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                  canRegister
                    ? 'bg-[#006D77] hover:bg-[#005a63] text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <BookCheck size={20} />
                {canRegister ? 'Register for Course' : 'Prerequisites Required'}
              </button>
            )}
          </div>
        </div>
      </div>

      {conflicts && (
        <TimeConflictModal
          conflicts={conflicts}
          onConfirm={proceedWithRegistration}
          onCancel={() => setConflicts(null)}
        />
      )}
    </div>
  );
};

export default CourseModal;