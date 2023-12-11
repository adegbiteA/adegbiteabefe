var sequelize = new Sequelize('A6', 'adegbiteafeeez', '************', {
  host: 'ep-old-recipe-21714485.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  query: { raw: true }
});



// Define the Student model
const Student = sequelize.define('Student', {
  studentNum: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  addressStreet: {
    type: DataTypes.STRING,
  },
  addressCity: {
    type: DataTypes.STRING,
  },
  addressProvince: {
    type: DataTypes.STRING,
  },
  TA: {
    type: DataTypes.BOOLEAN,
  },
  status: {
    type: DataTypes.STRING,
  },
});




// define the course model

const Course = sequelize.define('Course', {
  courseid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseCode: {
    type: DataTypes.STRING,
  },
  courseDescription: {
    type: DataTypes.STRING,
  },
});

Student.belongsToMany(Course, { through: 'StudentCourse' });
Course.belongsToMany(Student, { through: 'StudentCourse' });

// Export the models
module.exports = {
  Student,
  Course
};





// Function to initialize database and models
function initialize() {
  return sequelize.sync()
    .then(() => {
      console.log('Database and models synced successfully.');
      return Promise.resolve();
    })
    .catch((err) => {
      console.error('Unable to sync the database:', err);
      return Promise.reject('Unable to sync the database');
    });
}

// Function to get all students
function getAllStudents() {
  return Student.findAll()
    .then((students) => {
      if (students.length > 0) {
        return Promise.resolve(students);
      } else {
        return Promise.reject('No results returned');
      }
    })
    .catch((err) => {
      console.error('Error fetching all students:', err);
      return Promise.reject('No results returned');
    });
}

// Function to get students by course
function getStudentsByCourse(course) {
  return Student.findAll({ where: { courseId: course } })
    .then((students) => {
      if (students.length > 0) {
        return Promise.resolve(students);
      } else {
        return Promise.reject('No results returned');
      }
    })
    .catch((err) => {
      console.error('Error fetching students by course:', err);
      return Promise.reject('No results returned');
    });
}

// Function to get student by studentNum
function getStudentByNum(num) {
  return Student.findAll({ where: { studentNum: num } })
    .then((data) => {
      if (data.length > 0) {
        return Promise.resolve(data[0]);
      } else {
        return Promise.reject('No results returned');
      }
    })
    .catch((err) => {
      console.error('Error fetching student by number:', err);
      return Promise.reject('No results returned');
    });
}

// Function to get all courses
function getCourses() {
  return Course.findAll()
    .then((courses) => {
      if (courses.length > 0) {
        return Promise.resolve(courses);
      } else {
        return Promise.reject('No results returned');
      }
    })
    .catch((err) => {
      console.error('Error fetching all courses:', err);
      return Promise.reject('No results returned');
    });
}

// Function to get course by courseId
function getCourseById(id) {
  return Course.findAll({ where: { courseId: id } })
    .then((data) => {
      if (data.length > 0) {
        return Promise.resolve(data[0]);
      } else {
        return Promise.reject('No results returned');
      }
    })
    .catch((err) => {
      console.error('Error fetching course by ID:', err);
      return Promise.reject('No results returned');
    });
}

// Function to add a student
function addStudent(studentData) {
  studentData.TA = (studentData.TA) ? true : false;
  for (const key in studentData) {
    if (studentData[key] === '') {
      studentData[key] = null;
    }
  }

  return Student.create(studentData)
    .then(() => {
      console.log('Student created successfully');
      return Promise.resolve();
    })
    .catch((err) => {
      console.error('Unable to create student:', err);
      return Promise.reject('Unable to create student');
    });
}

// Function to update a student
function updateStudent(studentData) {
  studentData.TA = (studentData.TA) ? true : false;
  for (const key in studentData) {
    if (studentData[key] === '') {
      studentData[key] = null;
    }
  }

  return Student.update(studentData, { where: { studentNum: studentData.studentNum } })
    .then(() => {
      console.log('Student updated successfully');
      return Promise.resolve();
    })
    .catch((err) => {
      console.error('Unable to update student:', err);
      return Promise.reject('Unable to update student');
    });
}

module.exports = {
  initialize,
  getAllStudents,
  getStudentsByCourse,
  getStudentByNum,
  getCourses,
  getCourseById,
  addStudent,
  updateStudent
};

// Inside collegeData.js

// ...

const addCourse = (courseData) => {
  for (let key in courseData) {
    if (courseData[key] === '') {
      courseData[key] = null;
    }
  }

  return new Promise((resolve, reject) => {
    Course.create(courseData)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject("Unable to create course");
      });
  });
};

const updateCourse = (courseData) => {
  for (let key in courseData) {
    if (courseData[key] === '') {
      courseData[key] = null;
    }
  }

  const courseId = courseData.courseId;

  return new Promise((resolve, reject) => {
    Course.update(courseData, {
      where: { courseId: courseId }
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject("Unable to update course");
      });
  });
};

const deleteCourseById = (id) => {
  return new Promise((resolve, reject) => {
    Course.destroy({
      where: { courseId: id }
    })
      .then((result) => {
        if (result === 0) {
          reject("Course not found");
        } else {
          resolve("Course deleted successfully");
        }
      })
      .catch((err) => {
        reject("Unable to delete course");
      });
  });
};

module.exports = {
  // Other functions
  addCourse,
  updateCourse,
  deleteCourseById
};

const deleteStudentByNum = (studentNum) => {
  return new Promise((resolve, reject) => {
    Student.destroy({
      where: {
        studentNum: studentNum 
      }
    })
      .then((deletedRows) => {
        
        if (deletedRows > 0) {
          resolve('Student deleted successfully');
        } else {
          reject(new Error('Student not found'));
        }
      })
      .catch((err) => {
        reject(err); 
      });
  });
};

module.exports = {
  deleteStudentByNum
};




















































// Function that initializes the data by instantiating the Data class with the given students and courses data datasets.
// Returns a promise that resolves after successful instantiation or rejects if data is missing.
module.exports.initialize = function() {
  return new Promise((resolve, reject) => {
    sequelize.sync()
      .then(() => {
        console.log('Database synced successfully');
        resolve();
      })
      .catch((error) => {
        console.error('Unable to sync the database:', error);
        reject('Unable to sync the database');
      });
  });
};



module.exports.getAllStudents = function() {
  return new Promise((resolve, reject) => {
    Student.findAll()
      .then(students => {
        if (students.length === 0) {
          reject("No results returned");
        } else {
          resolve(students);
        }
      })
      .catch(error => {
        console.error("Error fetching students:", error);
        reject("An error occurred while fetching students");
      });
  });
};


module.exports.getStudentsByCourse = function(course) {
  return new Promise((resolve, reject) => {
    Student.findAll({
      where: {
        course: course // Filtering by the provided course value
      }
    })
    .then(students => {
      if (students.length === 0) {
        reject("No results returned");
      } else {
        resolve(students);
      }
    })
    .catch(error => {
      console.error("Error fetching students by course:", error);
      reject("An error occurred while fetching students by course");
    });
  });
};



module.exports.getStudentByNum = function(num) {
  return new Promise((resolve, reject) => {
    Student.findAll({
      where: {
        studentNum: num // Filtering by the provided student number
      }
    })
    .then(student => {
      if (!student) {
        reject("No results returned");
      } else {
        resolve(student);
      }
    })
    .catch(error => {
      console.error("Error fetching student by number:", error);
      reject("An error occurred while fetching student by number");
    });
  });
};



module.exports.getCourses = function() {
  return new Promise((resolve, reject) => {
    Course.findAll()
      .then(courses => {
        if (courses.length === 0) {
          reject("No results returned");
        } else {
          resolve(courses);
        }
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
        reject("An error occurred while fetching courses");
      });
  });
};


module.exports.getCourseById = function(id) {
  return new Promise((resolve, reject) => {
    Course.findAll({
      where: {
        id: id // Filtering by the provided course ID
      }
    })
    .then(courses => {
      if (courses.length === 0) {
        reject("No results returned");
      } else {
        resolve(courses[0]); // Provide the first object from the data
      }
    })
    .catch(error => {
      console.error("Error fetching course by ID:", error);
      reject("An error occurred while fetching course by ID");
    });
  });
};


module.exports.addStudent = function(studentData) {
  // Check and set TA property
  studentData.TA = (studentData.TA) ? true : false;

  // Iterate over properties and set blank values to null
  for (let prop in studentData) {
    if (studentData[prop] === "") {
      studentData[prop] = null;
    }
  }

  // Add the student data to the database
  return Student.create(studentData)
    .then(() => {
      // If Student.create() resolved successfully, invoke the resolve method
      return Promise.resolve("Student created successfully!");
    })
    .catch((error) => {
      // If there was an error, invoke the reject method with a meaningful message
      return Promise.reject("Unable to create student: " + error.message);
    });
};



  module.exports.updateStudent = function(studentData) {
    return new Promise((resolve, reject) => {
      // Ensure TA value is explicitly set to true/false and replace blank values with null
      if (studentData.TA !== true && studentData.TA !== false) {
        studentData.TA = null;
      }
  
      // Invoke Student.update() function and filter by studentNum
      Student.update({ studentNum: studentData.studentNum }, studentData)
        .then(() => {
          resolve(); // Communicate back to server.js that the operation was successful
        })
        .catch(() => {
          reject("Unable to update student"); // Invoke reject method with error message
        });
    });
  };
  
// Assuming you have a Course model and it has a create() method to create a new course

module.exports.addCourse = function(courseData) {
  // Ensure any blank values in courseData are set to null
  for (let key in courseData) {
    if (courseData[key] === '') {
      courseData[key] = null;
    }
  }

  return new Promise((resolve, reject) => {
    // Create a new course using the Course model's create() method
    Course.create(courseData)
      .then(newCourse => {
        // If the course creation is successful, resolve the promise
        resolve(newCourse);
      })
      .catch(err => {
        // If there's an error, reject the promise with a meaningful message
        reject('Unable to create course');
      });
  });
};

module.exports.updateCourse = function(courseData) {
  return new Promise((resolve, reject) => {
    // Ensure that blank values in courseData are replaced with null
    for (let key in courseData) {
      if (courseData[key] === "") {
        courseData[key] = null;
      }
    }

    // Invoke Course.update() function and filter by courseId
    Course.update({ courseId: courseData.courseId }, courseData)
      .then(() => {
        resolve(); // Communicate back to server.js that the operation was successful
      })
      .catch((error) => {
        reject("Unable to update course: " + error); // Invoke reject method with error message
      });
  });
};

module.exports.deleteCourseById = function(id) {
  return new Promise((resolve, reject) => {
    // Use Course.destroy() to delete the course by its ID
    Course.destroy({ where: { courseId: id } })
      .then((deletedRows) => {
        if (deletedRows > 0) {
          resolve(); // Resolve the promise if rows were affected (course was deleted)
        } else {
          reject("Course not found"); // Reject if no rows were affected (course not found)
        }
      })
      .catch((error) => {
        reject("Unable to delete course: " + error); // Reject the promise if an error occurred
      });
  });
};

module.exports.deleteStudentByNum = function deleteStudentByNum(studentNum) {
  return new Promise((resolve, reject) => {
    // Use Student.destroy() to delete the student by student number
    Student.destroy({ where: { studentNumber: studentNum } })
      .then(deletedRows => {
        if (deletedRows > 0) {
          resolve(); // Resolve the promise if rows were affected (student was deleted)
        } else {
          reject("Student not found"); // Reject if no rows were affected (student not found)
        }
      })
      .catch(error => {
        reject("Unable to delete student: " + error); // Reject the promise if an error occurred
      });
  });
};