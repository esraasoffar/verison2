// Dummy student data with completed courses
export const studentData = {
  "testuser": {
    name: "John Smith",
    semester: 3,
    completedCourses: [1, 3, 6, 8, 9, 15, 28],
    currentlyEnrolled: [2, 4, 16, 27]
  },
  "admin": {
    name: "Admin User",
    semester: 5,
    completedCourses: [1, 2, 3, 4, 6, 7, 8, 9, 15, 16, 17, 19, 28, 27],
    currentlyEnrolled: [20, 24, 30]
  },
  "freshman": {
    name: "Emma Wilson",
    semester: 1,
    completedCourses: [],
    currentlyEnrolled: [1, 3, 6, 8, 9, 15]
  },
  "sophomore": {
    name: "Michael Chen",
    semester: 3,
    completedCourses: [1, 2, 3, 4, 6, 8, 9, 15, 16, 40], // Includes one elective (40)
    currentlyEnrolled: [5, 17, 19, 21, 41] // Including another elective (41)
  },
  "junior": {
    name: "Sarah Martinez",
    semester: 5,
    completedCourses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 19, 20, 21, 40, 41, 42], // Multiple electives
    currentlyEnrolled: [24, 30, 43, 44] // Mix of required and elective courses
  },
  "senior": {
    name: "David Park",
    semester: 7,
    completedCourses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 19, 20, 21, 24, 25, 40, 41, 42, 43, 44],
    currentlyEnrolled: [26, 38, 54] // Final semester with thesis
  },
  "transfer": {
    name: "Lisa Thompson",
    semester: 4,
    completedCourses: [1, 2, 3, 4, 6, 8, 9], // Basic courses completed at previous institution
    currentlyEnrolled: [5, 16, 19, 40] // Starting major courses
  },
  "parttime": {
    name: "James Rodriguez",
    semester: 6,
    completedCourses: [1, 3, 6, 8, 9, 15, 2, 4, 7, 40, 44], // Slower progression
    currentlyEnrolled: [16, 19, 45] // Taking fewer courses per semester
  },
  "honors": {
    name: "Alexandra Kim",
    semester: 4,
    completedCourses: [1, 2, 3, 4, 6, 7, 8, 9, 15, 16, 40, 41, 42], // Ahead in electives
    currentlyEnrolled: [5, 17, 19, 43, 44] // Taking extra courses
  }
};