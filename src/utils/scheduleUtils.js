// Convert time string (HH:MM) to minutes since midnight for easier comparison
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Check if two time ranges overlap
const doTimesOverlap = (start1, end1, start2, end2) => {
  const start1Mins = timeToMinutes(start1);
  const end1Mins = timeToMinutes(end1);
  const start2Mins = timeToMinutes(start2);
  const end2Mins = timeToMinutes(end2);

  return start1Mins < end2Mins && end1Mins > start2Mins;
};

export const checkScheduleConflict = (newCourse, enrolledCourses, courseData) => {
  const conflicts = [];
  
  // Get the schedule of the new course
  const newSchedule = newCourse.schedule || [];
  
  // Check against each enrolled course's schedule
  for (const enrolledCourseId of enrolledCourses) {
    const enrolledCourse = courseData.find(c => c.id === enrolledCourseId);
    if (!enrolledCourse || !enrolledCourse.schedule) continue;

    for (const newSlot of newSchedule) {
      for (const enrolledSlot of enrolledCourse.schedule) {
        // Check if the days match first
        if (newSlot.day === enrolledSlot.day) {
          // Then check if times overlap
          if (doTimesOverlap(
            newSlot.startTime,
            newSlot.endTime,
            enrolledSlot.startTime,
            enrolledSlot.endTime
          )) {
            conflicts.push({
              courseCode: enrolledCourse.code,
              courseName: enrolledCourse.courseName,
              day: newSlot.day,
              time: `${enrolledSlot.startTime}-${enrolledSlot.endTime}`,
              room: enrolledSlot.room
            });
          }
        }
      }
    }
  }
  
  return conflicts;
};