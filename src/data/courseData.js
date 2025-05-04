export const courseData = [
  {
    "id": 1,
    "code": "NMXAN1EBNE",
    "courseName": "Mathematics I – Calculus I",
    "semester": 1,
    "credits": 6,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Monday", startTime: "08:00", endTime: "09:40", room: "BA.1.32" },
      { day: "Wednesday", startTime: "10:00", endTime: "11:40", room: "BA.1.32" }
    ]
  },
  {
    "id": 2,
    "code": "NMXAN2EBNE",
    "courseName": "Calculus II.",
    "semester": 2,
    "credits": 6,
    "prerequisiteID": 1,
    "prerequisiteName": "NMXAN1EBNE",
    "schedule": [
      { day: "Tuesday", startTime: "10:00", endTime: "11:40", room: "BA.2.45" },
      { day: "Thursday", startTime: "14:00", endTime: "15:40", room: "BA.2.45" }
    ]
  },
  {
    "id": 3,
    "code": "NMXDM1EBNE",
    "courseName": "Discrete Mathematics and Linear Algebra I",
    "semester": 1,
    "credits": 6,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Monday", startTime: "10:00", endTime: "11:40", room: "BA.1.35" },
      { day: "Wednesday", startTime: "14:00", endTime: "15:40", room: "BA.1.35" }
    ]
  },
  {
    "id": 4,
    "code": "NMXDM2EBNE",
    "courseName": "Discrete Mathematics and Linear Algebra II",
    "semester": 2,
    "credits": 6,
    "prerequisiteID": 3,
    "prerequisiteName": "NMXDM1EBNE",
    "schedule": [
      { day: "Tuesday", startTime: "08:00", endTime: "09:40", room: "BA.2.32" },
      { day: "Thursday", startTime: "10:00", endTime: "11:40", room: "BA.2.32" }
    ]
  },
  {
    "id": 5,
    "code": "NMXVS1EBNE",
    "courseName": "Probability Theory and Mathematical Statistics",
    "semester": 3,
    "credits": 5,
    "prerequisiteID": [4, 2],
    "prerequisiteName": ["NMXDM2EBNE", "NMXAN2EBNE"],
    "schedule": [
      { day: "Monday", startTime: "14:00", endTime: "15:40", room: "BA.3.45" },
      { day: "Friday", startTime: "10:00", endTime: "11:40", room: "BA.3.45" }
    ]
  },
  {
    "id": 6,
    "code": "NIXBI1EBNE",
    "courseName": "Basics of Information Systems",
    "semester": 1,
    "credits": 4,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Tuesday", startTime: "14:00", endTime: "15:40", room: "BC.1.21" },
      { day: "Thursday", startTime: "08:00", endTime: "09:40", room: "BC.1.21" }
    ]
  },
  {
    "id": 7,
    "code": "KVXFI1EBNE",
    "courseName": "Physics",
    "semester": 2,
    "credits": 5,
    "prerequisiteID": 1,
    "prerequisiteName": "NMXAN1EBNE",
    "schedule": [
      { day: "Monday", startTime: "12:00", endTime: "13:40", room: "BC.2.32" },
      { day: "Wednesday", startTime: "08:00", endTime: "09:40", room: "BC.2.32" }
    ]
  },
  {
    "id": 8,
    "code": "KVEVI1EBNE",
    "courseName": "Electrical Engineering",
    "semester": 1,
    "credits": 5,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Tuesday", startTime: "12:00", endTime: "13:40", room: "BC.1.45" },
      { day: "Friday", startTime: "14:00", endTime: "15:40", room: "BC.1.45" }
    ]
  },
  {
    "id": 9,
    "code": "GGXKG1EBNE",
    "courseName": "Macroeconomics",
    "semester": 1,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Wednesday", startTime: "12:00", endTime: "13:40", room: "BA.1.42" }
    ]
  },
  {
    "id": 10,
    "code": "GGXKG2EBNE",
    "courseName": "Microeconomics",
    "semester": 2,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Thursday", startTime: "12:00", endTime: "13:40", room: "BA.2.42" }
    ]
  },
  {
    "id": 11,
    "code": "GSXVG0EBNE",
    "courseName": "Enterprise Economics",
    "semester": 3,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Friday", startTime: "12:00", endTime: "13:40", room: "BA.3.42" }
    ]
  },
  {
    "id": 12,
    "code": "GVXME1EBNE",
    "courseName": "Basics of Management",
    "semester": 5,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Monday", startTime: "16:00", endTime: "17:40", room: "BA.5.42" }
    ]
  },
  {
    "id": 13,
    "code": "GGXJA1EBNE",
    "courseName": "Public Administration and Law",
    "semester": 6,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Tuesday", startTime: "16:00", endTime: "17:40", room: "BA.6.42" }
    ]
  },
  {
    "id": 14,
    "code": "NNXIK1EBNE",
    "courseName": "Infocommunication Techniques",
    "semester": 4,
    "credits": 5,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Wednesday", startTime: "16:00", endTime: "17:40", room: "BC.4.21" },
      { day: "Friday", startTime: "08:00", endTime: "09:40", room: "BC.4.21" }
    ]
  },
  {
    "id": 15,
    "code": "NIXSF1EBNE",
    "courseName": "Software Design and Development I",
    "semester": 1,
    "credits": 6,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Monday", startTime: "14:00", endTime: "15:40", room: "BC.3.21" },
      { day: "Friday", startTime: "10:00", endTime: "11:40", room: "BC.3.21" }
    ]
  },
  {
    "id": 16,
    "code": "NIXSF2EBNE",
    "courseName": "Software Design and Development II",
    "semester": 2,
    "credits": 6,
    "prerequisiteID": 15,
    "prerequisiteName": "NIXSF1EBNE",
    "schedule": [
      { day: "Tuesday", startTime: "14:00", endTime: "15:40", room: "BC.3.22" },
      { day: "Thursday", startTime: "10:00", endTime: "11:40", room: "BC.3.22" }
    ]
  },
  {
    "id": 17,
    "code": "NSXHF1EBNE",
    "courseName": "Advanced Development Techniques",
    "semester": 3,
    "credits": 6,
    "prerequisiteID": 16,
    "prerequisiteName": "NIXSF2EBNE",
    "schedule": [
      { day: "Monday", startTime: "10:00", endTime: "11:40", room: "BC.3.23" },
      { day: "Wednesday", startTime: "14:00", endTime: "15:40", room: "BC.3.23" }
    ]
  },
  {
    "id": 18,
    "code": "NSXJW1EBNE",
    "courseName": "Web development in Java",
    "semester": 3,
    "credits": 6,
    "prerequisiteID": 16,
    "prerequisiteName": "NIXSF2EBNE",
    "schedule": [
      { day: "Tuesday", startTime: "10:00", endTime: "11:40", room: "BC.3.24" },
      { day: "Thursday", startTime: "14:00", endTime: "15:40", room: "BC.3.24" }
    ]
  },
  {
    "id": 19,
    "code": "NIXAB0EBNE",
    "courseName": "Databases",
    "semester": 3,
    "credits": 6,
    "prerequisiteID": 15,
    "prerequisiteName": "NIXSF1EBNE",
    "schedule": [
      { day: "Wednesday", startTime: "10:00", endTime: "11:40", room: "BC.3.25" },
      { day: "Friday", startTime: "14:00", endTime: "15:40", room: "BC.3.25" }
    ]
  },
  {
    "id": 20,
    "code": "NIXSG1EBNE",
    "courseName": "Software Technology and GUI Design",
    "semester": 4,
    "credits": 6,
    "prerequisiteID": 17,
    "prerequisiteName": "NSXHF1EBNE",
    "schedule": [
      { day: "Monday", startTime: "08:00", endTime: "09:40", room: "BC.4.21" },
      { day: "Wednesday", startTime: "12:00", endTime: "13:40", room: "BC.4.21" }
    ]
  },
  {
    "id": 21,
    "code": "NIXRE1EBNE",
    "courseName": "System Theory",
    "semester": 3,
    "credits": 5,
    "prerequisiteID": 2,
    "prerequisiteName": "NMXAN2EBNE",
    "schedule": [
      { day: "Tuesday", startTime: "08:00", endTime: "09:40", room: "BC.3.31" },
      { day: "Thursday", startTime: "12:00", endTime: "13:40", room: "BC.3.31" }
    ]
  },
  {
    "id": 22,
    "code": "NIEEL0EBNE",
    "courseName": "Electronics",
    "semester": 2,
    "credits": 5,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Monday", startTime: "12:00", endTime: "13:40", room: "BC.2.31" },
      { day: "Wednesday", startTime: "08:00", endTime: "09:40", room: "BC.2.31" }
    ]
  },
  {
    "id": 23,
    "code": "NIXDR0EBNE",
    "courseName": "Digital Systems",
    "semester": 3,
    "credits": 5,
    "prerequisiteID": [22, 3],
    "prerequisiteName": ["NIEEL0EBNE", "NMXDM1EBNE"],
    "schedule": [
      { day: "Tuesday", startTime: "12:00", endTime: "13:40", room: "BC.3.32" },
      { day: "Thursday", startTime: "08:00", endTime: "09:40", room: "BC.3.32" }
    ]
  },
  {
    "id": 24,
    "code": "NIESA1EBNE",
    "courseName": "Introduction to Computer Architectures",
    "semester": 5,
    "credits": 5,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Wednesday", startTime: "10:00", endTime: "11:40", room: "BC.5.31" },
      { day: "Friday", startTime: "14:00", endTime: "15:40", room: "BC.5.31" }
    ]
  },
  {
    "id": 25,
    "code": "NIXKA1EBNE",
    "courseName": "Advanced Computer Architectures I",
    "semester": 6,
    "credits": 5,
    "prerequisiteID": 24,
    "prerequisiteName": "NIESA1EBNE",
    "schedule": [
      { day: "Monday", startTime: "14:00", endTime: "15:40", room: "BC.6.31" },
      { day: "Thursday", startTime: "10:00", endTime: "11:40", room: "BC.6.31" }
    ]
  },
  {
    "id": 26,
    "code": "NIXKA2EBNE",
    "courseName": "Advanced Computer Architectures II",
    "semester": 7,
    "credits": 5,
    "prerequisiteID": 25,
    "prerequisiteName": "NIXKA1EBNE",
    "schedule": [
      { day: "Tuesday", startTime: "14:00", endTime: "15:40", room: "BC.7.31" },
      { day: "Friday", startTime: "10:00", endTime: "11:40", room: "BC.7.31" }
    ]
  },
  {
    "id": 27,
    "code": "NIEOR1EBNE",
    "courseName": "Operating Systems",
    "semester": 3,
    "credits": 6,
    "prerequisiteID": 28,
    "prerequisiteName": "NIXSH0EBNE",
    "schedule": [
      { day: "Wednesday", startTime: "14:00", endTime: "15:40", room: "BC.3.41" },
      { day: "Friday", startTime: "08:00", endTime: "09:40", room: "BC.3.41" }
    ]
  },
  {
    "id": 28,
    "code": "NIXSH0EBNE",
    "courseName": "Computer Networks",
    "semester": 2,
    "credits": 6,
    "prerequisiteID": 6,
    "prerequisiteName": "NIXBI1EBNE",
    "schedule": [
      { day: "Monday", startTime: "10:00", endTime: "11:40", room: "BC.2.41" },
      { day: "Thursday", startTime: "14:00", endTime: "15:40", room: "BC.2.41" }
    ]
  },
  {
    "id": 29,
    "code": "NIXIR0EBNE",
    "courseName": "Intelligent Systems",
    "semester": 4,
    "credits": 6,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Tuesday", startTime: "10:00", endTime: "11:40", room: "BC.4.41" },
      { day: "Thursday", startTime: "08:00", endTime: "09:40", room: "BC.4.41" }
    ]
  },
  {
    "id": 30,
    "code": "NIXVI0EBNE",
    "courseName": "Enterprise Information Systems",
    "semester": 5,
    "credits": 6,
    "prerequisiteID": 19,
    "prerequisiteName": "NIXAB0EBNE",
    "schedule": [
      { day: "Wednesday", startTime: "12:00", endTime: "13:40", room: "BC.5.41" },
      { day: "Friday", startTime: "10:00", endTime: "11:40", room: "BC.5.41" }
    ]
  },
  {
    "id": 31,
    "code": "NIEIB0EBNE",
    "courseName": "IT Security",
    "semester": 4,
    "credits": 6,
    "prerequisiteID": 27,
    "prerequisiteName": "NIEOR1EBNE",
    "schedule": [
      { day: "Monday", startTime: "08:00", endTime: "09:40", room: "BC.4.51" },
      { day: "Wednesday", startTime: "14:00", endTime: "15:40", room: "BC.4.51" }
    ]
  },
  {
    "id": 33,
    "code": "NNPPR1EBNE",
    "courseName": "Project Work I",
    "semester": 4,
    "credits": 4,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "schedule": [
      { day: "Tuesday", startTime: "16:00", endTime: "17:40", room: "BC.4.61" }
    ]
  },
  {
    "id": 34,
    "code": "NNPPR2EBNE",
    "courseName": "Project Work II",
    "semester": 5,
    "credits": 4,
    "prerequisiteID": 33,
    "prerequisiteName": "NNPPR1EBNE",
    "schedule": [
      { day: "Wednesday", startTime: "16:00", endTime: "17:40", room: "BC.5.61" }
    ]
  },
  {
    "id": 35,
    "code": "NNPPR3EBNE",
    "courseName": "Project Work III",
    "semester": 6,
    "credits": 4,
    "prerequisiteID": 34,
    "prerequisiteName": "NNPPR2EBNE",
    "schedule": [
      { day: "Thursday", startTime: "16:00", endTime: "17:40", room: "BC.6.61" }
    ]
  },
  {
    "id": 36,
    "code": "NNPPR4EBNE",
    "courseName": "Project Work IV",
    "semester": 7,
    "credits": 4,
    "prerequisiteID": 35,
    "prerequisiteName": "NNPPR3EBNE",
    "schedule": [
      { day: "Friday", startTime: "16:00", endTime: "17:40", room: "BC.7.61" }
    ]
  },
  {
    "id": 37,
    "code": "NNDSD1EBNE",
    "courseName": "Thesis I",
    "semester": 6,
    "credits": 15,
    "prerequisiteID": 33,
    "prerequisiteName": "NNPPR1EBNE",
    "schedule": [
      { day: "Monday", startTime: "16:00", endTime: "17:40", room: "BC.6.71" }
    ]
  },
  {
    "id": 38,
    "code": "NNDSD2EBNE",
    "courseName": "Thesis II",
    "semester": 7,
    "credits": 15,
    "prerequisiteID": 37,
    "prerequisiteName": "NNDSD1EBNE",
    "schedule": [
      { day: "Tuesday", startTime: "16:00", endTime: "17:40", room: "BC.7.71" }
    ]
  },
  {
    "id": 40,
    "code": "ELCT01EBNE",
    "courseName": "Advanced Python Programming",
    "semester": 4,
    "credits": 4,
    "prerequisiteID": 16,
    "prerequisiteName": "NIXSF2EBNE",
    "isElective": true,
    "schedule": [
      { day: "Monday", startTime: "16:00", endTime: "17:40", room: "BC.4.81" }
    ]
  },
  {
    "id": 41,
    "code": "ELCT02EBNE",
    "courseName": "Machine Learning Fundamentals",
    "semester": 5,
    "credits": 4,
    "prerequisiteID": 5,
    "prerequisiteName": "NMXVS1EBNE",
    "isElective": true,
    "schedule": [
      { day: "Tuesday", startTime: "16:00", endTime: "17:40", room: "BC.5.81" }
    ]
  },
  {
    "id": 42,
    "code": "ELCT03EBNE",
    "courseName": "Cloud Computing and DevOps",
    "semester": 6,
    "credits": 4,
    "prerequisiteID": 28,
    "prerequisiteName": "NIXSH0EBNE",
    "isElective": true,
    "schedule": [
      { day: "Wednesday", startTime: "16:00", endTime: "17:40", room: "BC.6.81" }
    ]
  },
  {
    "id": 43,
    "code": "ELCT04EBNE",
    "courseName": "Mobile App Development",
    "semester": 5,
    "credits": 4,
    "prerequisiteID": 17,
    "prerequisiteName": "NSXHF1EBNE",
    "isElective": true,
    "schedule": [
      { day: "Thursday", startTime: "14:00", endTime: "15:40", room: "BC.5.82" }
    ]
  },
  {
    "id": 44,
    "code": "ELCT05EBNE",
    "courseName": "Technical Writing and Documentation",
    "semester": 3,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "isElective": true,
    "schedule": [
      { day: "Friday", startTime: "14:00", endTime: "15:40", room: "BA.3.81" }
    ]
  },
  {
    "id": 45,
    "code": "ELCT06EBNE",
    "courseName": "Professional Communication Skills",
    "semester": 4,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "isElective": true,
    "schedule": [
      { day: "Tuesday", startTime: "08:00", endTime: "09:40", room: "BA.4.81" }
    ]
  },
  {
    "id": 46,
    "code": "ELCT07EBNE",
    "courseName": "Project Management in IT",
    "semester": 5,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "isElective": true,
    "schedule": [
      { day: "Tuesday", startTime: "14:00", endTime: "15:40", room: "BA.5.81" }
    ]
  },
  {
    "id": 47,
    "code": "ELCT08EBNE",
    "courseName": "Data Visualization",
    "semester": 4,
    "credits": 4,
    "prerequisiteID": 19,
    "prerequisiteName": "NIXAB0EBNE",
    "isElective": true,
    "schedule": [
      { day: "Wednesday", startTime: "14:00", endTime: "15:40", room: "BC.4.82" }
    ]
  },
  {
    "id": 48,
    "code": "ELCT09EBNE",
    "courseName": "Cybersecurity Fundamentals",
    "semester": 5,
    "credits": 4,
    "prerequisiteID": 31,
    "prerequisiteName": "NIEIB0EBNE",
    "isElective": true,
    "schedule": [
      { day: "Thursday", startTime: "14:00", endTime: "15:40", room: "BC.5.83" }
    ]
  },
  {
    "id": 49,
    "code": "ELCT10EBNE",
    "courseName": "UI/UX Design Principles",
    "semester": 4,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "isElective": true,
    "schedule": [
      { day: "Friday", startTime: "12:00", endTime: "13:40", room: "BC.4.83" }
    ]
  },
  {
    "id": 50,
    "code": "ELCT11EBNE",
    "courseName": "Blockchain Technology",
    "semester": 6,
    "credits": 4,
    "prerequisiteID": 19,
    "prerequisiteName": "NIXAB0EBNE",
    "isElective": true,
    "schedule": [
      { day: "Monday", startTime: "12:00", endTime: "13:40", room: "BC.6.82" }
    ]
  },
  {
    "id": 51,
    "code": "ELCT12EBNE",
    "courseName": "Natural Language Processing",
    "semester": 6,
    "credits": 4,
    "prerequisiteID": 41,
    "prerequisiteName": "ELCT02EBNE",
    "isElective": true,
    "schedule": [
      { day: "Tuesday", startTime: "12:00", endTime: "13:40", room: "BC.6.83" }
    ]
  },
  {
    "id": 52,
    "code": "ELCT13EBNE",
    "courseName": "Software Testing and Quality Assurance",
    "semester": 5,
    "credits": 4,
    "prerequisiteID": 17,
    "prerequisiteName": "NSXHF1EBNE",
    "isElective": true,
    "schedule": [
      { day: "Wednesday", startTime: "12:00", endTime: "13:40", room: "BC.5.84" }
    ]
  },
  {
    "id": 53,
    "code": "ELCT14EBNE",
    "courseName": "Business Intelligence",
    "semester": 6,
    "credits": 4,
    "prerequisiteID": 47,
    "prerequisiteName": "ELCT08EBNE",
    "isElective": true,
    "schedule": [
      { day: "Thursday", startTime: "12:00", endTime: "13:40", room: "BC.6.84" }
    ]
  },
  {
    "id": 54,
    "code": "ELCT15EBNE",
    "courseName": "Innovation and Entrepreneurship",
    "semester": 7,
    "credits": 3,
    "prerequisiteID": null,
    "prerequisiteName": null,
    "isElective": true,
    "schedule": [
      { day: "Friday", startTime: "10:00", endTime: "11:40", room: "BA.7.81" }
    ]
  }
];

export const getPrerequisites = (courseId) => {
  const course = courseData.find(c => c.id === courseId);
  if (!course) return [];
  
  if (!course.prerequisiteID) return [];
  
  if (Array.isArray(course.prerequisiteID)) {
    return course.prerequisiteID.map(id => courseData.find(c => c.id === id));
  }
  
  return [courseData.find(c => c.id === course.prerequisiteID)];
};

export const getCoursesBySemester = (semester) => {
  return courseData.filter(course => course.semester === semester);
};

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

export const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00"
];

export const getTotalCredits = () => {
  return courseData.reduce((total, course) => total + course.credits, 0);
};

export const getRequiredCredits = () => {
  return courseData
    .filter(course => !course.isElective)
    .reduce((total, course) => total + course.credits, 0);
};

export const getElectiveCredits = () => {
  return 25;
};

export const getCompletedElectiveCredits = (completedCourseIds) => {
  return Math.min(
    25,
    courseData
      .filter(course => course.isElective && completedCourseIds.includes(course.id))
      .reduce((total, course) => total + course.credits, 0)
  );
};