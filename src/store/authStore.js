import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { studentData } from './studentData';

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,
      studentInfo: null,
      enrollments: [],
      
      login: (username) => {
        const initialStudentInfo = studentData[username];
        const initialCompletedCourses = initialStudentInfo?.completedCourses || [];
        const initialCurrentlyEnrolled = initialStudentInfo?.currentlyEnrolled || [];
        
        const completedEnrollments = initialCompletedCourses.map(courseId => ({
          id: `initial-${courseId}`,
          courseId,
          status: 'completed',
          enrolledAt: new Date(2024, 0, 1).toISOString(),
          completedAt: new Date(2024, 0, 1).toISOString(),
          semester: 1,
          year: 2024
        }));

        const currentEnrollments = initialCurrentlyEnrolled.map(courseId => ({
          id: `initial-enrolled-${courseId}`,
          courseId,
          status: 'enrolled',
          enrolledAt: new Date().toISOString(),
          completedAt: null,
          semester: initialStudentInfo?.semester || 1,
          year: 2024
        }));

        const storedEnrollments = localStorage.getItem(`enrollments_${username}`);
        const parsedStoredEnrollments = storedEnrollments ? JSON.parse(storedEnrollments) : [];

        const combinedEnrollments = [
          ...completedEnrollments,
          ...currentEnrollments,
          ...parsedStoredEnrollments.filter(stored => 
            !completedEnrollments.some(comp => comp.courseId === stored.courseId) &&
            !currentEnrollments.some(curr => curr.courseId === stored.courseId)
          )
        ];

        set({ 
          isAuthenticated: true, 
          username,
          studentInfo: {
            ...initialStudentInfo,
            currentlyEnrolled: [
              ...initialCurrentlyEnrolled,
              ...parsedStoredEnrollments
                .filter(e => e.status === 'enrolled')
                .map(e => e.courseId)
            ]
          },
          enrollments: combinedEnrollments
        });
      },

      logout: () => {
        const { username, enrollments } = get();
        if (username) {
          const nonInitialEnrollments = enrollments.filter(
            e => !e.id.startsWith('initial-')
          );
          localStorage.setItem(
            `enrollments_${username}`, 
            JSON.stringify(nonInitialEnrollments)
          );
        }
        set({ 
          isAuthenticated: false, 
          username: null,
          studentInfo: null,
          enrollments: []
        });
      },

      registerForCourse: (courseId) => {
        const { username, enrollments, studentInfo } = get();
        
        const isCompleted = enrollments.some(
          e => e.courseId === courseId && e.status === 'completed'
        );
        if (isCompleted) {
          return null;
        }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const semester = currentMonth >= 8 ? 1 : 2;

        const existingEnrollment = enrollments.find(
          e => e.courseId === courseId && e.status === 'enrolled'
        );
        if (existingEnrollment) {
          return null;
        }

        const newEnrollment = {
          id: crypto.randomUUID(),
          courseId,
          status: 'enrolled',
          enrolledAt: currentDate.toISOString(),
          completedAt: null,
          semester,
          year: currentYear
        };

        const updatedEnrollments = [...enrollments, newEnrollment];
        const updatedStudentInfo = {
          ...studentInfo,
          currentlyEnrolled: [...(studentInfo?.currentlyEnrolled || []), courseId]
        };
        
        set({ 
          enrollments: updatedEnrollments,
          studentInfo: updatedStudentInfo
        });

        const nonInitialEnrollments = updatedEnrollments.filter(
          e => !e.id.startsWith('initial-')
        );
        localStorage.setItem(
          `enrollments_${username}`, 
          JSON.stringify(nonInitialEnrollments)
        );

        return newEnrollment;
      },

      updateEnrollmentStatus: (enrollmentId, status) => {
        const { username, enrollments, studentInfo } = get();
        const updatedEnrollments = enrollments.map(enrollment => {
          if (enrollment.id === enrollmentId) {
            return {
              ...enrollment,
              status,
              completedAt: status === 'completed' ? new Date().toISOString() : null
            };
          }
          return enrollment;
        });

        const enrollment = enrollments.find(e => e.id === enrollmentId);
        let updatedStudentInfo = { ...studentInfo };
        
        if (enrollment) {
          if (status === 'completed') {
            updatedStudentInfo.completedCourses = [
              ...(updatedStudentInfo.completedCourses || []),
              enrollment.courseId
            ];
            updatedStudentInfo.currentlyEnrolled = updatedStudentInfo.currentlyEnrolled
              .filter(id => id !== enrollment.courseId);
          }
        }

        set({ 
          enrollments: updatedEnrollments,
          studentInfo: updatedStudentInfo
        });
        
        const nonInitialEnrollments = updatedEnrollments.filter(
          e => !e.id.startsWith('initial-')
        );
        localStorage.setItem(
          `enrollments_${username}`, 
          JSON.stringify(nonInitialEnrollments)
        );
      },

      getEnrollments: () => get().enrollments,

      isEnrolledInCourse: (courseId) => {
        const { enrollments } = get();
        return enrollments.some(e => e.courseId === courseId && e.status === 'enrolled');
      },

      hasCompletedCourse: (courseId) => {
        const { enrollments } = get();
        return enrollments.some(e => e.courseId === courseId && e.status === 'completed');
      }
    }),
    {
      name: 'course-registration-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: false, // Force initial state to be logged out
        username: null,
        studentInfo: null,
        enrollments: []
      }),
      version: 2,
      migrate: (persistedState, version) => {
        if (version === 0 || version === 1) {
          return {
            isAuthenticated: false,
            username: null,
            studentInfo: null,
            enrollments: []
          };
        }
        return {
          ...persistedState,
          isAuthenticated: false, // Ensure migrated state is logged out
          username: null,
          studentInfo: null,
          enrollments: []
        };
      }
    }
  )
);

export { useAuthStore };