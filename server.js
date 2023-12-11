
// •	Add the following declaration at the top of your server.js file:
/********************************************************************************
*	WEB700 – Assignment 06
*
*	I declare that this assignment is my own work in accordance with Seneca's
*	Academic Integrity Policy:
*
*	https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
*	Name: adegbite afeez abefe 	Student ID:131269227 	Date: 10/12/2023 	
*
*	Published URL:  	
*
********************************************************************************/




















const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

const HTTP_PORT = 8080;




const collegeData = require("./modules/collegeData.js");

// Route to render students view
app.get('/students', async (req, res) => {
  try {
    const students = await collegeData.getAllStudents();
    if (students.length > 0) {
      res.render('students', { students });
    } else {
      res.render('students', { message: 'No results' });
    }
  } catch (error) {
    res.render('students', { message: 'Error retrieving students' });
  }
});

// Route to render courses view
app.get('/courses', async (req, res) => {
  try {
    const courses = await collegeData.getCourses();
    if (courses.length > 0) {
      res.render('courses', { courses });
    } else {
      res.render('courses', { message: 'No results' });
    }
  } catch (error) {
    res.render('courses', { message: 'Error retrieving courses' });
  }
});






// GET route for '/courses/add'
app.get('/courses/add', (req, res) => {
  res.render('addCourse'); //
});

// Route to handle adding a new course (POST request)
app.post('/courses/add', (req, res) => {
  const courseData = req.body; 

  // Process the received course data and add it using your collegeData module
  collegeData.addCourse(courseData)
    .then(() => {
      res.redirect('/courses'); // Redi
    })
    .catch((error) => {
      res.status(500).send('Error adding course: ' + error); // Send error response
    });
});



// POST route for '/courses/update'
app.post('/courses/update', (req, res) => {
  const courseData = req.body; // Assuming course data is sent through the request body

  // Call your updateCourse function with the courseData
  updateCourse(courseData)
    .then(() => {
      res.redirect('/courses'); // Redirect to /courses after updating
    })
    .catch(error => {
      res.status(500).send('Unable to update course'); // Handle error if update fails
    });
});


app.get('/course/:id', (req, res) => {
  const courseId = req.params.id;

  // Retrieve course data by ID using collegeData module
  collegeData.getCourseById(courseId)
    .then((course) => {
      if (!course) {
        res.status(404).send('Course Not Found'); // Send 404 if no course data is found
      } else {
        res.render('course', { course }); // 
      }
    })
    .catch((error) => {
      res.status(500).send('Error fetching course: ' + error); // Send error response
    });
});

// Route to handle deleting a specific course by ID
app.get('/course/delete/:id', (req, res) => {
  const courseId = req.params.id;

  // Invoke deleteCourseById from collegeData module to delete the course by ID
  collegeData.deleteCourseById(courseId)
    .then(() => {
      res.redirect('/courses'); 
    })
    .catch((error) => {
      res.status(500).send('Unable to Remove Course / Course not found: ' + error); // Send error response
    });
});

app.get('/student/delete/:studentNum', (req, res) => {
  const studentNum = req.params.studentNum;

  collegeData.deleteStudentByNum(studentNum)
    .then(() => {
      res.redirect('/students'); // 
    })
    .catch(error => {
      res.status(500).send(`Unable to Remove Student: ${error}`); // 
    });
});



// GET route to render the add course form
app.get('/courses/add', (req, res) => {
  res.render('addCourse'); // Render the addCourse view
});

// POST route to handle adding a new course
app.post('/courses/add', (req, res) => {
  const courseData = req.body;
  collegeData.addCourse(courseData)
    .then(() => {
      res.redirect('/courses');
    })
    .catch((err) => {
      res.status(500).send('Unable to create course');
    });
});

// POST route to handle updating a course
app.post('/course/update', (req, res) => {
  const courseData = req.body;
  collegeData.updateCourse(courseData)
    .then(() => {
      res.redirect('/courses');
    })
    .catch((err) => {
      res.status(500).send('Unable to update course');
    });
});

// GET route to view a specific course by ID
app.get('/course/:id', (req, res) => {
  const courseId = req.params.id;
  collegeData.getCourseById(courseId)
    .then((course) => {
      if (!course) {
        res.status(404).send('Course Not Found');
      } else {
        res.render('course', { course: course });
      }
    })
    .catch((err) => {
      res.status(500).send('Error fetching course');
    });
});

// GET route to delete a course by ID
app.get('/course/delete/:id', (req, res) => {
  const courseId = req.params.id;
  collegeData.deleteCourseById(courseId)
    .then(() => {
      res.redirect('/courses');
    })
    .catch((err) => {
      res.status(500).send('Unable to Remove Course / Course not found');
    });
});




app.get('/students/add', (req, res) => {
  
    collegeData.getCourses()
        .then((courses) => {
             res.render('addStudent', { courses });
        })
        .catch((error) => {
            console.error('Error fetching courses:', error);      
            res.render('addStudent', { courses: [] });
        });
});

app.get("/student/:studentNum", (req, res) => {
  let viewData = {};

  
  data.getStudentByNum(req.params.studentNum)
    .then((studentData) => {
      if (studentData) {
        viewData.student = studentData; 
        return data.getCourses(); 
      } else {
        viewData.student = null; 
        throw new Error("Student Not Found");
      }
    })
    .then((coursesData) => {
      viewData.courses = coursesData; 

    
      if (viewData.student) {
        viewData.courses.forEach((course) => {
          if (course.courseId === viewData.student.course) {
            course.selected = true;
          }
        });
      }
    })
    .then(() => {
      if (!viewData.student) {
      
        res.status(404).send("Student Not Found");
      } else {
        
        res.render("student", { viewData: viewData });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      viewData.student = null; 
      viewData.courses = []; 
      res.status(500).send("Internal Server Error");
    });
});

app.get('/student/delete/:studentNum', (req, res) => {
  const studentNum = req.params.studentNum; 
  collegeData.deleteStudentByNum(studentNum)
    .then(() => {
        res.redirect('/students');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Unable to Remove Student / Student not found');
    });
});



collegeData
  .initialize()
  .then(() => {
    // Start the server
    app.listen(HTTP_PORT, () => {
      console.log(`Server is running on port ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error initializing data: ${err}`);
    // Optionally,.
  });
