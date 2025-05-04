import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { courseData, DAYS_OF_WEEK, TIME_SLOTS } from '../data/courseData';
import { Clock, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const Schedule = () => {
  const { enrollments } = useAuthStore();
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);
  const [zoom, setZoom] = useState(1);
  const [showFullSchedule, setShowFullSchedule] = useState(true);

  React.useEffect(() => {
    const current = enrollments
      .filter(e => e.status === 'enrolled')
      .map(enrollment => {
        const course = courseData.find(c => c.id === enrollment.courseId);
        return {
          id: course.id,
          code: course.code,
          courseName: course.courseName,
          schedule: course.schedule || [],
          isElective: course.isElective
        };
      });
    setEnrolledCourses(current);
  }, [enrollments]);

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const calculatePosition = (startTime) => {
    const startMinutes = timeToMinutes(startTime);
    const hourStart = Math.floor(startMinutes / 60) * 60;
    const minutesIntoHour = startMinutes - hourStart;
    return (minutesIntoHour / 60) * 100;
  };

  const calculateHeight = (startTime, endTime) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const durationInHours = (endMinutes - startMinutes) / 60;
    return durationInHours * 100;
  };

  const getCoursesForTimeSlot = (day, hour) => {
    return enrolledCourses.filter(course =>
      course.schedule.some(slot => {
        const slotStart = timeToMinutes(slot.startTime);
        const slotEnd = timeToMinutes(slot.endTime);
        const hourStart = timeToMinutes(hour);
        const hourEnd = hourStart + 60;
        return slot.day === day && slotStart < hourEnd && slotEnd > hourStart;
      })
    );
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.4));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 sm:mx-[100px] lg:mx-[200px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-[#006D77]" size={24} />
                <h2 className="text-2xl font-bold text-[#006D77]">Weekly Schedule</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  title="Zoom Out"
                >
                  <ZoomOut size={20} className="text-[#006D77]" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  title="Reset Zoom"
                >
                  <Maximize2 size={20} className="text-[#006D77]" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  title="Zoom In"
                >
                  <ZoomIn size={20} className="text-[#006D77]" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="sm:mx-[100px] lg:mx-[200px]" style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
              <table className="w-full border-collapse min-w-[800px]">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 border-b border-gray-200">
                      Time
                    </th>
                    {DAYS_OF_WEEK.map(day => (
                      <th key={day} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5 border-b border-gray-200">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {TIME_SLOTS.map((time, timeIndex) => (
                    <tr key={time} className={timeIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-3 py-1 whitespace-nowrap text-xs text-gray-500 font-medium border-r border-gray-100">
                        {time}
                      </td>
                      {DAYS_OF_WEEK.map(day => {
                        const coursesInHour = getCoursesForTimeSlot(day, time);
                        
                        return (
                          <td
                            key={`${day}-${time}`}
                            className="relative border-r border-gray-100 h-14"
                          >
                            {coursesInHour.map((course) => {
                              const slot = course.schedule.find(s => s.day === day);
                              if (!slot) return null;

                              const slotStart = timeToMinutes(slot.startTime);
                              const hourStart = timeToMinutes(time);
                              
                              if (slotStart >= hourStart && slotStart < hourStart + 60) {
                                const top = calculatePosition(slot.startTime);
                                const height = calculateHeight(slot.startTime, slot.endTime);
                                const hasConflict = coursesInHour.length > 1;
                                const width = `${100 / coursesInHour.length}%`;
                                const index = coursesInHour.indexOf(course);
                                const left = `${(index * 100) / coursesInHour.length}%`;

                                return (
                                  <div
                                    key={course.id}
                                    className="absolute flex flex-col p-1 rounded border transition-all duration-200 hover:shadow-md"
                                    style={{
                                      top: `${top}%`,
                                      height: `${height}%`,
                                      width,
                                      left,
                                      backgroundColor: 'rgb(255 240 235 / var(--tw-bg-opacity))',
                                      '--tw-bg-opacity': '1',
                                      borderColor: hasConflict ? '#f59e0b' : '#006D77',
                                      borderWidth: hasConflict ? '2px' : '1px'
                                    }}
                                  >
                                    <div className="text-[11px] font-medium text-[#006D77] line-clamp-2">
                                      {course.courseName}
                                    </div>
                                    <div className="mt-auto space-y-0.5 text-[9px] text-gray-500">
                                      <div className="flex items-center gap-0.5">
                                        <Clock size={8} />
                                        <span className="truncate">
                                          {slot.startTime}-{slot.endTime}
                                        </span>
                                      </div>
                                      <div className="truncate">
                                        Room: {slot.room}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-lg shadow p-4 sm:mx-[100px] lg:mx-[200px]">
          <h3 className="text-lg font-semibold text-[#006D77] mb-3">Enrolled Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-[rgb(237,246,249)] rounded-lg p-3 border-l-4 border-[#006D77]">
                <h4 className="font-medium text-[#006D77] text-sm">{course.courseName}</h4>
                <p className="text-xs text-gray-500 mb-2">{course.code}</p>
                <div className="space-y-2">
                  {course.schedule.map((slot, index) => (
                    <div key={index} className="text-xs bg-white rounded p-2">
                      <div className="font-medium text-[#006D77]">{slot.day}</div>
                      <div className="text-gray-600 flex items-center gap-1">
                        <Clock size={12} />
                        {slot.startTime} - {slot.endTime}
                      </div>
                      <div className="text-gray-500">Room: {slot.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;