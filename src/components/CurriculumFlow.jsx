import React, { useCallback, useState } from 'react';
import ReactFlow, { 
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { courseData, getPrerequisites } from '../data/courseData';
import CourseNode from './CourseNode';
import CourseModal from './CourseModal';

const nodeTypes = {
  courseNode: CourseNode,
};

// Adjusted spacing constants
const SEMESTER_VERTICAL_SPACING = 500;
const COURSE_HORIZONTAL_SPACING = 450;
const INITIAL_X_OFFSET = 310; // Increased to account for left margin
const INITIAL_Y_OFFSET = 50;
const SEMESTER_LABEL_X = 80; // Adjusted for left margin

const EDGE_COLORS = [
  '#006D77',
  '#83C5BE',
  '#22c55e',
  '#3b82f6',
];

const HIGHLIGHT_COLORS = [
  '#f97316',
  '#ef4444',
  '#ec4899',
  '#8b5cf6',
];

const CurriculumFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [highlightColorIndex, setHighlightColorIndex] = useState(0);

  React.useEffect(() => {
    let interval;
    if (hoveredCourse) {
      interval = setInterval(() => {
        setHighlightColorIndex((prev) => (prev + 1) % HIGHLIGHT_COLORS.length);
      }, 750);
    }
    return () => clearInterval(interval);
  }, [hoveredCourse]);

  const getConnectedNodeIds = (courseId, edges) => {
    const connectedIds = new Set();
    edges.forEach(edge => {
      if (edge.source === courseId) connectedIds.add(edge.target);
      if (edge.target === courseId) connectedIds.add(edge.source);
    });
    connectedIds.add(courseId);
    return connectedIds;
  };

  const highlightPrerequisites = (courseId, nodes, edges) => {
    const connectedNodes = getConnectedNodeIds(courseId, edges);
    const highlightColor = HIGHLIGHT_COLORS[highlightColorIndex];

    return {
      nodes: nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          status: node.id === courseId ? 'selected' : 
                 connectedNodes.has(node.id) ? 'current' : 'ghosted'
        }
      })),
      edges: edges.map(edge => {
        const isHighlighted = edge.source === courseId || edge.target === courseId;
        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: isHighlighted ? highlightColor : '#e5e7eb',
            strokeWidth: isHighlighted ? 8 : 4,
            opacity: isHighlighted ? 1 : 0.3,
            transition: 'all 0.3s ease'
          },
          animated: isHighlighted,
          markerEnd: {
            ...edge.markerEnd,
            color: isHighlighted ? highlightColor : '#e5e7eb',
          }
        };
      })
    };
  };

  const resetHighlights = (nodes, edges) => {
    return {
      nodes: nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          status: node.data.originalStatus || 'default'
        }
      })),
      edges: edges.map(edge => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: EDGE_COLORS[Math.abs(edge.data?.offset / 40 || 0) % EDGE_COLORS.length],
          strokeWidth: 4,
          opacity: 1,
          transition: 'all 0.3s ease'
        },
        animated: false,
        markerEnd: {
          ...edge.markerEnd,
          color: EDGE_COLORS[Math.abs(edge.data?.offset / 40 || 0) % EDGE_COLORS.length],
        }
      }))
    };
  };

  const handleNodeMouseEnter = (event, node) => {
    if (node.type === 'courseNode') {
      const { nodes: updatedNodes, edges: updatedEdges } = highlightPrerequisites(node.id, nodes, edges);
      setNodes(updatedNodes);
      setEdges(updatedEdges);
      setHoveredCourse(node.id);
    }
  };

  const handleNodeMouseLeave = () => {
    const { nodes: updatedNodes, edges: updatedEdges } = resetHighlights(nodes, edges);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
    setHoveredCourse(null);
  };

  const createOrthogonalPath = (sourceX, sourceY, targetX, targetY, offset = 0) => {
    const midY = sourceY + ((targetY - sourceY) / 2);
    return `M ${sourceX} ${sourceY + 20}
            L ${sourceX} ${midY + offset}
            L ${targetX} ${midY + offset}
            L ${targetX} ${targetY}`;
  };

  const initializeGraph = useCallback(() => {
    const newNodes = [];
    const newEdges = [];
    const edgeTracker = new Map();
    
    const courseBySemester = {};
    const requiredCourses = courseData.filter(course => !course.isElective);
    
    requiredCourses.forEach(course => {
      const sem = course.semester;
      if (sem && sem > 0) {
        if (!courseBySemester[sem]) courseBySemester[sem] = [];
        courseBySemester[sem].push(course);
      }
    });

    const sortedSemesters = Object.keys(courseBySemester)
      .map(Number)
      .sort((a, b) => a - b);

    sortedSemesters.forEach((semester, semesterIndex) => {
      const courses = courseBySemester[semester];
      const semesterY = INITIAL_Y_OFFSET + (semesterIndex * SEMESTER_VERTICAL_SPACING);
      
      // Adjusted semester label position to vertically align with course nodes
      newNodes.push({
        id: `semester-${semester}`,
        type: 'default',
        position: { x: SEMESTER_LABEL_X, y: semesterY + 80 }, // Added offset to center with course nodes
        data: { label: `Semester ${semester}` },
        className: 'semester-label',
        draggable: false,
        selectable: false
      });

      courses.forEach((course, courseIndex) => {
        const xPos = INITIAL_X_OFFSET + (courseIndex * COURSE_HORIZONTAL_SPACING);
        
        const truncatedName = course.courseName.length > 30 
          ? course.courseName.substring(0, 27) + '...'
          : course.courseName;

        newNodes.push({
          id: course.id.toString(),
          type: 'courseNode',
          position: { x: xPos, y: semesterY },
          draggable: false,
          data: {
            ...course,
            courseName: truncatedName,
            onClick: () => setSelectedCourse(course)
          }
        });
        
        const prerequisites = getPrerequisites(course.id);
        prerequisites.forEach((prereq) => {
          if (prereq) {
            const sourceNode = newNodes.find(n => n.id === prereq.id.toString());
            if (!sourceNode) return;

            const sourceX = sourceNode.position.x;
            const sourceY = sourceNode.position.y;
            const targetX = xPos;
            const targetY = semesterY;
            
            const edgeKey = `${Math.min(sourceX, targetX)}-${Math.max(sourceX, targetX)}`;
            const edgeCount = edgeTracker.get(edgeKey) || 0;
            edgeTracker.set(edgeKey, edgeCount + 1);

            const offset = edgeCount % 2 === 0 
              ? (Math.floor(edgeCount / 2) * 20)
              : -(Math.floor(edgeCount / 2) * 20);
            
            const edgeColor = EDGE_COLORS[Math.abs(offset / 20) % EDGE_COLORS.length];
            
            newEdges.push({
              id: `${prereq.id}-${course.id}`,
              source: prereq.id.toString(),
              target: course.id.toString(),
              type: 'default',
              animated: false,
              style: { 
                stroke: edgeColor,
                strokeWidth: 2,
                transition: 'all 0.3s ease'
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: edgeColor,
              },
              data: { offset },
              path: createOrthogonalPath(sourceX, sourceY, targetX, targetY, offset)
            });
          }
        });
      });
    });
    
    setNodes(newNodes);
    setEdges(newEdges);
  }, [setNodes, setEdges]);

  React.useEffect(() => {
    initializeGraph();
    window.addEventListener('resize', initializeGraph);
    return () => window.removeEventListener('resize', initializeGraph);
  }, [initializeGraph]);

  return (
    <div className="curriculum-flow-container">
      <div className="mx-[60px]" style={{ width: 'calc(100% - 120px)', height: 'calc(100vh - 64px)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeMouseEnter={handleNodeMouseEnter}
          onNodeMouseLeave={handleNodeMouseLeave}
          fitView={false}
          defaultViewport={{
            x: 0,
            y: 0,
            zoom: 0.4
          }}
          minZoom={0.2}
          maxZoom={1.5}
          nodesDraggable={false}
        >
          <Controls 
            className="bg-white shadow-lg border-2 border-[#006D77] rounded-lg"
            position="bottom-right"
            style={{ right: 16, bottom: 16 }}
          />
          <MiniMap 
            style={{ 
              background: '#fff',
              border: '2px solid #006D77',
              borderRadius: '8px',
              padding: '8px',
              right: 16,
              top: 16,
            }} 
            nodeColor="#83C5BE"
            position="top-right"
          />
        </ReactFlow>
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

export default CurriculumFlow;