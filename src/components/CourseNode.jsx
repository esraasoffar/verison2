import React from 'react';
import { Handle, Position } from 'reactflow';
import { useAuthStore } from '../store/authStore';
import { CheckCircle2, BookOpen, Lock, Clock } from 'lucide-react';

const CourseNode = ({ data }) => {
  const { code, courseName, status = 'default', onClick } = data;
  const { studentInfo, isEnrolledInCourse, hasCompletedCourse } = useAuthStore();

  const checkPrerequisites = () => {
    if (!data.prerequisiteID) return true;
    const prerequisites = Array.isArray(data.prerequisiteID) 
      ? data.prerequisiteID 
      : [data.prerequisiteID];
    return prerequisites.every(prereqId => hasCompletedCourse(prereqId));
  };

  const isCompleted = hasCompletedCourse(data.id);
  const isEnrolled = isEnrolledInCourse(data.id);
  const hasPrerequisites = checkPrerequisites();
  const canRegister = !isCompleted && !isEnrolled && hasPrerequisites;

  let nodeStatus = 'locked';
  let statusIcon = <Lock size={40} className="text-gray-500" />;
  let statusText = 'Prerequisites Required';

  if (isCompleted) {
    nodeStatus = 'completed';
    statusIcon = <CheckCircle2 size={40} className="text-green-600" />;
    statusText = 'Completed';
  } else if (isEnrolled) {
    nodeStatus = 'enrolled';
    statusIcon = <Clock size={40} className="text-amber-600" />;
    statusText = 'Currently Enrolled';
  } else if (canRegister) {
    nodeStatus = 'available';
    statusIcon = <BookOpen size={40} className="text-blue-600" />;
    statusText = 'Available to Register';
  }

  const nodeClass = `course-node ${nodeStatus} ${status}`;
  
  return (
    <div 
      className={nodeClass}
      onClick={onClick}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: '#006D77', width: '20px', height: '20px' }}
      />
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="course-code">{code}</div>
          <div className="course-name">{courseName}</div>
        </div>
        {statusIcon}
      </div>
      <div className={`status-text ${
        nodeStatus === 'completed' ? 'text-green-600' :
        nodeStatus === 'enrolled' ? 'text-amber-600' :
        nodeStatus === 'available' ? 'text-blue-600' :
        'text-gray-500'
      }`}>
        {statusText}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ background: '#006D77', width: '20px', height: '20px' }}
      />
    </div>
  );
};

export default CourseNode;