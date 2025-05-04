import React, { useRef, useEffect } from 'react';
import { X, AlertTriangle, Clock, MapPin } from 'lucide-react';

const TimeConflictModal = ({ conflicts, onConfirm, onCancel }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCancel]);

  return (
    <div 
      data-modal="time-conflict"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
      onMouseLeave={(e) => e.stopPropagation()}
    >
      <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle size={24} />
            <h2 className="text-xl font-bold">Schedule Conflict Detected</h2>
          </div>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            This course conflicts with the following courses you're already enrolled in:
          </p>
          
          <div className="bg-amber-50 rounded-lg p-4 space-y-3">
            {conflicts.map((conflict, index) => (
              <div 
                key={index} 
                className="border-b border-amber-200 last:border-0 pb-3 last:pb-0"
              >
                <div className="font-medium text-amber-700">{conflict.courseCode}</div>
                <div className="text-sm text-amber-600">{conflict.courseName}</div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Clock size={14} />
                    <span>{conflict.day} {conflict.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <MapPin size={14} />
                    <span>Room {conflict.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 font-medium">
              Warning: Registering for this course will result in a schedule conflict.
            </p>
            <p className="text-amber-600 text-sm mt-1">
              You may still register, but please ensure you can manage the overlapping schedules.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              No, Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              Yes, Register Anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeConflictModal;