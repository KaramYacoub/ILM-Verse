const path = require("path");
const sequelize = require("sequelize");
const fs = require("fs");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const {
  course,
  teacher,
  section,
  grade,
  department,
  course_student,
  student,
  mark_type,
  student_marks,
} = models;
const CourseUnit = require("../models/NOSQL/CourseUnit");
const Assigment = require("../models//NOSQL/Assigment.js");
const Quiz = require("../models/NOSQL/Quiz.js");
//get all courses(data is filtered) ✅
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await course.findAll({
      include: [
        {
          model: section,
          as: "section",
          attributes: ["section_name"],
          include: [
            {
              model: grade,
              as: "grade",
              attributes: ["grade_name"],
              include: [
                {
                  model: department,
                  as: "dept",
                  attributes: ["name"], // Retrieve department's name via grade
                },
              ],
            },
          ],
        },
        {
          model: teacher,
          as: "teacher",
          attributes: ["first_name", "last_name"], // Teacher info
        },
      ],
    });
    //Filter the Response
    const filteredCourses = courses.map((course) => {
      return {
        course_id: course.course_id,
        course_name: course.subject_name, // subject_name not course_name
        teacher_name: `${course.teacher?.first_name || "No teacher assigned"} ${
          course.teacher?.last_name || ""
        }`.trim(), // teacher name can be null
        department: course.section.grade.dept.name,
        grade_name: course.section.grade.grade_name,
        section_name: course.section.section_name,
      };
    });
    res.status(200).json({
      status: "success",
      data: {
        filteredCourses,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Involve students in a course ✅
exports.involveStudents = async (req, res) => {
  try {
    const { course_id } = req?.body;

    // Step 1: Get section_id of the course
    const courseData = await course.findOne({
      where: {
        course_id: course_id,
      },
    });

    if (!courseData) {
      return res.status(404).json({ error: "Course not found" });
    }

    const section_id = courseData.section_id;

    // Step 2: Get all students in the section
    const students = await student.findAll({
      where: {
        section_id: section_id,
      },
    });

    // Step 3: Filter out students already involved in the course
    const involvedStudents = [];

    for (const student of students) {
      const isStudentInvolved = await course_student.findOne({
        where: {
          course_id: course_id,
          student_id: student.student_id,
        },
      });

      if (!isStudentInvolved) {
        involvedStudents.push({
          course_id: course_id,
          student_id: student.student_id,
        });
      }
    }

    // Step 4: Bulk create involvement for students not already involved
    if (involvedStudents.length > 0) {
      const addedStudents = await course_student.bulkCreate(involvedStudents);
      res.status(201).json({
        status: "success",
        message: `${addedStudents.length} Student(s) Added Successfully`,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "All students are already involved in this course.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

//get all teachers from department ✅
exports.getTeachersByCourse = async (req, res) => {
  try {
    const { course_id } = req?.params;
    const courseData = await course.findOne({
      where: {
        course_id: course_id,
      },
      include: {
        model: section,
        as: "section",
        attributes: ["section_id"],
        include: {
          model: grade,
          as: "grade",
          attributes: ["grade_id"],
          include: {
            model: department,
            as: "dept",
            attributes: ["department_id"],
            include: {
              model: teacher,
              as: "teachers",
              attributes: ["first_name", "last_name", "teacher_id"],
            },
          },
        },
      },
    });
    const teachers = courseData.section.grade.dept.teachers;
    res.status(200).json({
      status: "success",
      data: teachers,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// change teacher for specific course ✅
exports.updateTeacher = async (req, res) => {
  try {
    const { course_id, newTeacher_id } = req?.body;
    const courseData = await course.findOne({
      where: {
        course_id: course_id,
      },
    });
    if (!courseData) {
      return res.status(404).json({ error: "Course not found" });
    }
    const updatedCourse = await course.update(
      {
        teacher_id: newTeacher_id,
      },
      {
        where: {
          course_id: course_id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Teacher Changed Successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get students in course ✅
exports.getStudentsInCourse = async (req, res) => {
  try {
    const { course_id } = req?.params;

    if (!course_id) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Query the course_student table to fetch students enrolled in the specified course
    const courseStudents = await course_student.findAll({
      where: {
        course_id: course_id,
      },
      include: [
        {
          model: student,
          as: "student", // Make sure this matches the association alias
          attributes: ["first_name", "last_name", "student_id"], // Select required student fields
        },
      ],
    });

    // Check if any students are found
    if (!courseStudents || courseStudents.length === 0) {
      return res
        .status(404)
        .json({ error: "No students found for this course" });
    }

    // Extract student details from the results
    const students = courseStudents.map(
      (courseStudent) => courseStudent.student
    );

    // Return the list of students
    res.status(200).json({
      status: "success",
      data: {
        students,
        count: students.length || "0",
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all the units in a course ✅
exports.getCourseUnits = async (req, res) => {
  const { course_id } = req.params;
  try {
    const units = await CourseUnit.find({ course_id: course_id })
      .select("unit_name unit_description") // Select specific fields to return
      .lean();

    const result = units.map((unit) => ({
      unit_id: unit._id, // Rename _id to unit_id
      unit_name: unit.unit_name,
      unit_description: unit.unit_description,
    }));

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// add a unit in a course ✅
exports.addUnit = async (req, res) => {
  const { course_id, unit_name, unit_description } = req.body;
  try {
    const newUnit = await new CourseUnit({
      course_id: course_id,
      unit_name: unit_name,
      unit_description: unit_description,
    }).save();

    res.status(201).json({
      status: "sucess",
      data: newUnit,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// get all the unit media ✅
exports.getUnitContent = async (req, res) => {
  const { unit_id } = req.params;
  try {
    const unit = await CourseUnit.findById(unit_id);
    if (!unit) {
      return res.status(404).json({
        status: "error",
        message: "Unit not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: unit.media,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// add new media to a unit ✅
exports.addUnitContent = async (req, res) => {
  const { unit_id } = req.params;
  const { title } = req?.body;
  const file = req.file;
  try {
    const filePath = `/resources/${req.file.filename}`; // Changed from ./Data/resources to /resources
    const fileType = file.mimetype;
    const formattedDate = new Date().toISOString().split("T")[0]; // Extract 'YYYY-MM-DD' from the ISO string

    const media = {
      title: title,
      path: filePath,
      date: formattedDate,
      type: fileType,
    };

    const unit = await CourseUnit.findByIdAndUpdate(
      unit_id,
      { $push: { media: media } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Unit content updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getLecture = async (req, res) => {
  // Construct the file path (make sure it's correct)
  const filePath = "./Data/resources/1746345672877-9fqg6p8402c.mp4";

  try {
    // Check if the file exists
    fs.stat(filePath, (err, stats) => {
      if (err) {
        // If file not found, return 404
        return res.status(404).json({
          error: "Video not found",
        });
      }

      const fileSize = stats.size; // Total size of the file
      const range = req.headers.range; // Get the Range header from the request

      if (!range) {
        // If no Range header, send the whole video
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Length", fileSize);
        const videoStream = fs.createReadStream(filePath);
        videoStream.pipe(res);
        return;
      }

      // Parsing the range header
      const [start, end] = range
        .replace(/bytes=/, "")
        .split("-")
        .map(Number);
      const chunkStart = start || 0;
      const chunkEnd = end || Math.min(chunkStart + 1000000, fileSize - 1); // Default chunk size of 1MB or the file size

      if (chunkStart >= fileSize) {
        res.status(416).json({ error: "Requested range not satisfiable" });
        return;
      }

      // Set the headers for range request response
      res.status(206); // Partial content response
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Content-Length", chunkEnd - chunkStart + 1);
      res.setHeader(
        "Content-Range",
        `bytes ${chunkStart}-${chunkEnd}/${fileSize}`
      );

      // Stream the requested range
      const videoStream = fs.createReadStream(filePath, {
        start: chunkStart,
        end: chunkEnd,
      });
      videoStream.pipe(res);

      // Handle errors in streaming
      videoStream.on("error", (error) => {
        console.error("Streaming error:", error);
        res.status(500).json({
          error: "Failed to stream video. Please try again later.",
        });
      });
    });
  } catch (error) {
    console.error("General error:", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

// delete unit and it's all content ✅
exports.deleteUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const deletedUnit = await CourseUnit.findById(unit_id);
    if (!deletedUnit) {
      return res.status(404).json({
        status: "failure",
        message: "Unit not found",
      });
    }
    for (mediaObject of deletedUnit.media) {
      const filePath = mediaObject.path;

      try {
        // Asynchronously delete the media file
        await fs.promises.unlink(`./Data/${filePath}`);
        console.log(`Deleted file: ${filePath}`);
      } catch (error) {
        console.error(`Failed to delete file`);
      }
    }
    await CourseUnit.findByIdAndDelete(unit_id);

    res.status(204).json({
      status: "success",
      message: "Unit Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// delete specific media from specific content ✅
exports.deleteMedia = async (req, res) => {
  try {
    const { unit_id, media_id } = req.params;
    // Find the unit by its ID
    const unit = await CourseUnit.findById(unit_id);

    if (!unit) {
      return res.status(404).json({
        status: "failure",
        message: "Unit not found",
      });
    }
    // Find the media inside the unit by its media_id
    const mediaIndex = unit.media.findIndex(
      (media) => media._id.toString() === media_id
    );

    if (mediaIndex === -1) {
      return res.status(404).json({
        status: "failure",
        message: "Media not found",
      });
    }

    //Get the file path of the media to delete it from the server
    const media = unit.media[mediaIndex];

    // media.path already contains the filename: changed this one to correctly delete the file
    const filePath = path.join(
      __dirname,
      "../data/",
      media.path.replace(/\\/g, "/")
    );
    console.log("Deleting media:", { unit_id, media_id, filePath });
    //Delete the media file from the server
    await fs.promises.unlink(filePath);

    // Remove the media from the unit's media array
    unit.media.splice(mediaIndex, 1);

    // Save the updated unit to the database
    await unit.save();

    res.status(204).json({
      status: "success",
      message: "Media Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// delete course and all associated units and media
exports.deleteCourse = async (req, res) => {
  const { course_id } = req.params;

  try {
    // remove all the students in that course, because the foreign key of course_id in the course_student relationship
    await course_student.destroy({ where: { course_id: course_id } });

    // Find all units associated with the course (Mongoose model)
    const units = await CourseUnit.find({ course_id: course_id });

    if (units.length === 0) {
      // If no units are found, delete the course itself
      await course.destroy({ where: { course_id: course_id } });
      console.log(`No units found. Deleted course: ${course_id}`);

      return res.status(200).json({
        status: "success",
        message: "Course has been deleted successfully (no units found)",
      });
    }

    // Loop through each unit to delete its media and then the unit
    for (let unit of units) {
      // Loop through each media file in the unit
      for (let mediaObject of unit.media) {
        const filePath = path.join(
          __dirname,
          "../data/",
          mediaObject.path.replace(/\\/g, "/")
        );

        try {
          // Get the absolute file path to delete it from the server

          await fs.promises.unlink(filePath);
          console.log(`Deleted media file: ${filePath}`);
        } catch (error) {
          console.error(`Failed to delete media file: ${filePath}`);
        }
      }

      // Now that media is deleted, remove all the media entries from the unit
      unit.media = []; // Clear the media array from the unit

      // Now delete the unit itself (Mongoose model)
      await CourseUnit.findByIdAndDelete(unit._id);
      console.log(`Deleted unit: ${unit._id}`);
    }

    // Finally, delete the course itself
    await course.destroy({ where: { course_id: course_id } });
    console.log(`Deleted course: ${course_id}`);

    res.status(200).json({
      status: "success",
      message: "Course and all units have been deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting course:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getStudentInSection = async (req, res) => {
  try {
    const { section_id } = req.params;
    const students = await student.findAll({
      where: {
        section_id,
      },
    });

    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Assigments
exports.addAssigment = async (req, res) => {
  try {
    const { course_id } = req?.params;
    const { title, description } = req?.body;
    const end_at = req.body.dueDate || req.body.end_at;
    const file = req?.file;
    const filePath = file?.destination + "/" + file?.filename;
    const fileType = file?.mimetype;
    const published_at = new Date().toISOString().split("T")[0]; // Extract 'YYYY-MM-DD' from the ISO string
    const newAssigment = await new Assigment({
      course_id: course_id,
      title: title,
      description: description,
      path: filePath,
      type: fileType,
      published_at: published_at,
      end_at: end_at,
    }).save();
    res.status(200).json({
      status: "success",
      data: newAssigment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteAssigment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const deletedAssigment = await Assigment.findById(assignment_id);
    if (!deletedAssigment) {
      return res.status(404).json({
        status: "failure",
        message: "Assigment not found",
      });
    }
    const filePath = deletedAssigment.path;

    try {
      // Asynchronously delete the media file
      await fs.promises.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.error(`Failed to delete file`);
    }
    await Assigment.findByIdAndDelete(assignment_id);

    res.status(204).json({
      status: "success",
      message: "Assigment Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.getAllAssigmentsForCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const assigments = await Assigment.find({ course_id: course_id }).select(
      "-studentsSubmission"
    ); // Excluding studentsSubmission

    if (assigments && assigments.length > 0) {
      res.status(200).json({
        status: "success",
        data: assigments,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "No assignments found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.getAllAssigmentsForCourseForStudent = async (req, res) => {
  try {
    const { course_id } = req.params;
    let student_id;
    if (req.role === "parent") {
      student_id = req.params.student_id;
    } else {
      student_id = req.user.id;
    }
    // Fetch assignments for the specified course
    const assigments = await Assigment.find({
      course_id: course_id,
    });

    if (assigments && assigments.length > 0) {
      // Initialize an array to store the final response
      let finalAssigmentsResponse = [];

      for (let assigment of assigments) {
        // Create a copy of the assignment object without the studentsSubmission field
        let assignmentWithoutSubmission = assigment.toObject();
        delete assignmentWithoutSubmission.studentsSubmission;

        // Debugging: log the assignment and the studentsSubmission array

        // Check if there is a submission for the given student_id
        const studentSubmission = assigment.studentsSubmission.find(
          (submission) => submission.student_id === student_id
        );

        // Debugging: log the result of the submission search
        // Add the submission or "Not exist" to the assignment object
        if (studentSubmission) {
          assignmentWithoutSubmission.submission = studentSubmission;
        } else {
          assignmentWithoutSubmission.submission = "Not exist";
        }

        // Push the modified assignment to the final response array
        finalAssigmentsResponse.push(assignmentWithoutSubmission);
      }

      res.status(200).json({
        status: "success",
        data: finalAssigmentsResponse,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "No assignments found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.submitAssigment = async (req, res) => {
  try {
    const { assignment_id, course_id } = req.params;
    const student_id = req.user.id;

    const targetedAssigment = await Assigment.findById(assignment_id);
    const nowDate = new Date().toISOString().split("T")[0]; // Get current date as YYYY-MM-DD

    if (targetedAssigment) {
      const endDate = new Date(targetedAssigment.end_at)
        .toISOString()
        .split("T")[0]; // Extract date part of end_at as YYYY-MM-DD

      // Compare the current date with the end date of the assignment
      if (nowDate > endDate) {
        // If the current date is after the deadline
        fs.unlink(`${req.file.destination}/${req.file.filename}`, (err) => {
          if (err) {
            console.log("Error deleting file:", err);
          } else {
            console.log("File deleted due to late submission.");
          }
        });

        return res.status(400).json({
          status: "failure",
          message: "You cannot submit because the deadline has passed.",
        });
      }

      // If the submission is before the deadline, proceed with saving the submission
      targetedAssigment.studentsSubmission.push({
        student_id: student_id,
        submission_date: nowDate,
        path: `${req.file.destination}/${req.file.filename}`,
        type: req.file.mimetype,
      });

      await targetedAssigment.save();

      return res.status(201).json({
        status: "success",
        message: "Submission successful.",
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "The assignment was not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.showAssigmentSubmission = async (req, res) => {
  try {
    const { assignment_id } = req.params; // Getting the assignment_id from params
    // Find the assignment by its assignment_id (no need to exclude studentsSubmission)
    const assignment = await Assigment.findById(assignment_id);
    if (assignment) {
      // Check if the assignment has submissions
      let studentsData = [];
      if (assignment.studentsSubmission) {
        for (let OneStudent of assignment.studentsSubmission) {
          const studentName = await student.findOne({
            where: {
              student_id: OneStudent.student_id,
            },
            attributes: ["student_id", "first_name", "last_name"],
          });
          if (studentName) {
            OneStudent = {
              student_id: OneStudent.student_id,
              name: `${studentName.first_name} ${studentName.last_name}`,
              submission_date: OneStudent.submission_date,
              path: OneStudent.path,
              type: OneStudent.type,
              isChecked: OneStudent.isChecked,
            };
            studentsData.push(OneStudent);
          } else {
            OneStudent.name = "Unknown";
          }
        }
        res.status(200).json({
          status: "success",
          data: {
            assigmentdata: {
              assignment_id: assignment._id,
              course_id: assignment.course_id,
              published_at: assignment.published_at,
              end_at: assignment.end_at,
              title: assignment.title,
              description: assignment.description,
              path: assignment.path,
              type: assignment.type,
            },
            studentsSubmission: studentsData,
          },
        });
      } else {
        res.status(400).json({
          status: "failure",
          message: "No submissions found for this assignment",
        });
      }
    } else {
      res.status(404).json({
        status: "failure",
        message: "Assignment not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.updateSubmissionStatus = async (req, res) => {
  try {
    const { assignment_id } = req.params; // Getting the assignment_id from params
    const { studentsSubmissions } = req.body;
    const assigment = await Assigment.findById(assignment_id);
    if (assigment) {
      assigment.studentsSubmission = studentsSubmissions;
      await assigment.save();
      res.status(200).json({
        status: "success",
        data: assigment,
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "Assignment not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
function getCurrentTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Pad hours and minutes with leading zeros if necessary
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes}`;
}
// Quizes
exports.addQuiz = async (req, res) => {
  try {
    const { course_id } = req.params;
    const {
      title,
      description,
      start_date,
      start_time,
      duration,
      total_points,
      questions,
    } = req.body;

    const nowDate = new Date().toISOString().split("T")[0];
    const nowTime = getCurrentTime(); // HH:MM
    console.log(nowDate, nowTime);
    console.log(start_date, start_time);
    console.log(nowDate > start_date);
    if (nowDate > start_date) {
      return res.status(400).json({
        status: "failure",
        message: "You can't make a past quiz",
      });
    } else if (
      nowDate === start_date &&
      nowTime.toString() > start_time.toString()
    ) {
      return res.status(400).json({
        status: "failure",
        message: "You can't make a past quiz",
      });
    }

    let totalMarks = 0;
    for (let question of questions) {
      totalMarks += question.points;
    }
    if (totalMarks != total_points) {
      return res.status(400).json({
        error: "Total marks don't match the total points of the questions",
      });
    }

    const newQuiz = await new Quiz({
      course_id: course_id,
      title: title,
      description: description,
      start_date: start_date,
      start_time: start_time,
      duration: duration,
      total_points: total_points,
      questions: questions,
    }).save();

    res.status(201).json({
      status: "success",
      data: newQuiz,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.deleteQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(quiz_id);
    if (!deletedQuiz) {
      return res.status(404).json({
        status: "failure",
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Quiz Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.getAllQuizes = async (req, res) => {
  try {
    const { course_id } = req.params;
    const allQuizes = await Quiz.find({ course_id: course_id });
    if (!allQuizes) {
      return res.status(404).json({
        status: "failure",
        message: "this course doesn't have any quiz",
      });
    }
    res.status(200).json({
      status: "success",
      data: allQuizes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.getQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return res.status(404).json({
        status: "failure",
        message: "quiz not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.editQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const {
      title,
      description,
      start_date,
      start_time,
      duration,
      total_points,
      questions,
    } = req.body;
    // check
    const nowDate = new Date().toISOString().split("T")[0];
    const nowTime = getCurrentTime(); // HH:MM

    if (nowDate > start_date) {
      return res.status(400).json({
        status: "failure",
        message: "You can't make a past quiz",
      });
    } else if (nowDate === start_date && nowTime > start_time) {
      return res.status(400).json({
        status: "failure",
        message: "You can't make a past quiz",
      });
    }
    let totalMarks = 0;
    for (let question of questions) {
      totalMarks += question.points;
    }
    if (totalMarks != total_points) {
      return res.status(400).json({
        error: "Total marks don't match the total points of the questions",
      });
    }
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quiz_id,
      {
        title,
        description,
        start_date,
        start_time,
        duration,
        total_points,
        questions,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "quiz updated successfully",
      data: updatedQuiz,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`;
}
exports.getQuizesForCourseForStudent = async (req, res) => {
  try {
    const { course_id } = req.params;
    const quizes = await Quiz.find({ course_id: course_id }).select(
      "-questions -Submissions"
    );

    if (!quizes) {
      return res.status(404).json({
        status: "failure",
        message: "no quizes found",
      });
    }

    const nowDate = new Date().toISOString().split("T")[0]; // YEAR-MONTH-DAY
    const nowTime = getCurrentTime(); // HH:MM

    let allQuizes = [];
    for (let oneQuiz of quizes) {
      const startDate = oneQuiz.start_date;
      const startTime = oneQuiz.start_time; // HH:MM
      const duration = oneQuiz.duration; // in minutes

      // Convert start_time to minutes
      const startTimeInMinutes = timeToMinutes(startTime);

      // Calculate the end time by adding duration to start time
      const endTimeInMinutes = startTimeInMinutes + duration;
      const endTime = minutesToTime(endTimeInMinutes); // Convert back to HH:MM format

      const toPushQuiz = {
        quiz_id: oneQuiz._id,
        title: oneQuiz.title,
        description: oneQuiz.description,
        start_date: oneQuiz.start_date,
        start_time: oneQuiz.start_time,
        end_time: endTime, // Add the calculated end time
        duration: oneQuiz.duration,
        total_points: oneQuiz.total_points,
        able_to_view: oneQuiz.able_to_view,
        status: "", // Start with an empty status
      };

      console.log(nowDate, startDate, nowTime, endTime);
      // Check if the current date and time are past the start and end times of the quiz
      if (nowDate > startDate || (nowDate === startDate && nowTime > endTime)) {
        toPushQuiz.status = "finished"; // If quiz time is finished
      } else if (
        nowDate === startDate &&
        nowTime >= startTime &&
        nowTime <= endTime
      ) {
        // If current time is between start_time and end_time
        toPushQuiz.status = "able to start";
      } else if (
        nowDate < startDate ||
        (nowDate === startDate && nowTime < startTime)
      ) {
        // If the quiz is upcoming
        toPushQuiz.status = "Upcoming";
      } else {
        toPushQuiz.status = "hi";
      }

      allQuizes.push(toPushQuiz);
    }

    res.status(200).json({
      status: "success",
      data: allQuizes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.getQuizToStart = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    console.log(quiz_id);
    const startedQuiz = await Quiz.find({ _id: quiz_id }).select(
      "-able_to_view -Submissions"
    );

    res.status(200).json({
      status: "success",
      data: startedQuiz,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.submitQuiz = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const student_id = req.user?.id;

    if (!student_id) {
      return res
        .status(400)
        .json({ status: "failure", message: "Student ID missing" });
    }

    const { answers } = req.body;
    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return res
        .status(404)
        .json({ status: "failure", message: "Quiz not found" });
    }

    let totalPoint = 0;

    // Map questions by ID or text for quick lookup
    const questionsMap = {};
    for (const q of quiz.questions) {
      questionsMap[q.question_text] = q; // Using question_text as key
    }

    // Function to check if student's chosen answer is correct
    function isAnswerCorrect(question, choosedAnswer) {
      if (Array.isArray(choosedAnswer)) {
        return choosedAnswer.some((ans) => {
          return question.options.some(
            (opt) =>
              opt._id.toString() === ans._id && opt.isCorrectAnswer === true
          );
        });
      } else {
        return question.options.some(
          (opt) =>
            opt._id.toString() === choosedAnswer._id &&
            opt.isCorrectAnswer === true
        );
      }
    }

    // Calculate total score based on correct answers
    for (const oneAnswer of answers) {
      const questionId = oneAnswer._id;
      const choosedAnswer = oneAnswer.choosed_answer;
      const question = questionsMap[oneAnswer.question_text];
      if (!question) continue;

      if (isAnswerCorrect(question, choosedAnswer)) {
        totalPoint += question.points;
      }
    }

    // Build submission object including student's answers and the correct answers
    const submission = {
      student_id: student_id,
      mark: totalPoint,
      questions_submission: answers.map((ans) => {
        let choosedAnswerText = "";
        let correctAnswerText = "";

        // Extract student's chosen answer text
        if (Array.isArray(ans.choosed_answer)) {
          choosedAnswerText = ans.choosed_answer
            .map((a) => a.choosed_answer)
            .filter((text) => text)
            .join(", ");
        } else if (ans.choosed_answer && ans.choosed_answer.choosed_answer) {
          choosedAnswerText = ans.choosed_answer.choosed_answer;
        }
        if (!choosedAnswerText) choosedAnswerText = "No answer";

        // Find the original question from quiz questions
        const originalQuestion = questionsMap[ans.question_text];

        if (originalQuestion) {
          // Get all correct options texts concatenated
          correctAnswerText = originalQuestion.options
            .filter((opt) => opt.isCorrectAnswer)
            .map((opt) => opt.option_text)
            .join(", ");
        }

        return {
          question_text: ans.question_text || "No question text",
          choosed_answer: choosedAnswerText,
          correct_answer: correctAnswerText || "No correct answer found",
        };
      }),
      submited_at: new Date().toISOString().split("T")[0], // Current date as YYYY-MM-DD
    };

    // Add submission to quiz and save
    quiz.Submissions.push(submission);
    await quiz.save();

    // Respond with success and total score
    res.status(201).json({
      status: "success",
      totalPoints: totalPoint,
      data: submission,
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: error.message });
  }
};

exports.showQuizMark = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    let student_id;
    if (req.role === "parent") {
      student_id = req.params.student_id;
    } else if (req.role === "student") {
      student_id = req.user.id;
    } else {
      student_id = req.params.student_id;
    }
    console.log("student_id:", student_id);

    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return res
        .status(404)
        .json({ status: "failure", message: "Quiz not found" });
    }

    const submission = quiz.Submissions.find(
      (sub) => sub.student_id === student_id
    );
    console.log("submission:", submission);

    if (submission) {
      // Map student's questions_submission to add full choices from quiz.questions
      const detailedQuestions = submission.questions_submission.map((qs) => {
        // Find the matching original question from the quiz
        const originalQuestion = quiz.questions.find(
          (q) => q.question_text === qs.question_text
        );

        let choices = [];
        if (originalQuestion) {
          choices = originalQuestion.options.map((opt) => opt.option_text);
        }

        return {
          question_text: qs.question_text,
          choosed_answer: qs.choosed_answer,
          correct_answer: qs.correct_answer || "", // If you saved it; else empty
          choices: choices,
        };
      });

      return res.status(200).json({
        status: "success",
        data: {
          submited_at: submission.submited_at,
          mark: submission.mark,
          questions: detailedQuestions,
        },
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          submited_at: "Not submitted",
          mark: "Don't have mark",
          questions: [],
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.showQuizSubmissions = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const findedCourse = await Quiz.findById(quiz_id);
    if (!findedCourse) {
      return res
        .status(404)
        .json({ status: "failure", message: "Quiz not found" });
    }

    const StudentsInCourse = await course_student.findAll({
      where: {
        course_id: findedCourse.course_id,
      },
      attributes: [],
      include: {
        model: student,
        as: "student",
        attributes: ["student_id", "first_name", "last_name"],
      },
    });

    const finalSubmissions = [];

    for (const oneStudent of StudentsInCourse) {
      const studentData = oneStudent.student;
      const fullName = `${studentData.first_name} ${studentData.last_name}`;

      // Find the student's submission in the quiz submissions
      const submission = findedCourse.Submissions.find(
        (sub) => sub.student_id === studentData.student_id
      );

      if (submission) {
        // For each question answered by the student, build detailed info
        const detailedQuestions = submission.questions_submission.map((qs) => {
          // Find the original question in quiz.questions by matching question_text
          const originalQuestion = findedCourse.questions.find(
            (q) => q.question_text === qs.question_text
          );

          // If found original question, prepare correct answers and all choices
          let correctAnswersText = [];
          let allChoices = [];

          if (originalQuestion) {
            correctAnswersText = originalQuestion.options
              .filter((opt) => opt.isCorrectAnswer)
              .map((opt) => opt.option_text);

            allChoices = originalQuestion.options.map((opt) => opt.option_text);
          }

          return {
            question_text: qs.question_text,
            student_answer: qs.choosed_answer,
            correct_answer: correctAnswersText.join(", "),
            choices: allChoices,
          };
        });

        finalSubmissions.push({
          fullName,
          submited_at: submission.submited_at,
          mark: submission.mark,
          questions: detailedQuestions,
        });
      } else {
        // No submission found for this student
        finalSubmissions.push({
          fullName,
          submited_at: "Not submitted",
          mark: "Not marked",
          questions: [],
        });
      }
    }

    res.status(200).json({
      status: "success",
      data: finalSubmissions,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.publicQuizMarks = async (req, res) => {
  try {
    const { quiz_id } = req.params;
    const { able_to_view } = req.body; // true false
    const updatedQuiz = await Quiz.findById(quiz_id);

    if (!updatedQuiz) {
      return res.status(400).json({
        status: "failure",
        message: "the quiz not found",
      });
    }

    updatedQuiz.able_to_view = able_to_view;
    await updatedQuiz.save();

    res.status(201).json({
      status: "sucess",
      message: `the Ability to view marks is ${able_to_view}`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// marks
// here we should meet at discord ok karam?>
exports.addMark = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { student_id, mark_type, mark_value } = req.body;
    // Mark validation based on mark_type

    if (
      (mark_type === "MT-001" ||
        mark_type === "MT-002" ||
        mark_type === "MT-003") &&
      (mark_value < 0 || mark_value > 20)
    ) {
      return res.status(400).json({
        error: "Mark value should be between 0 and 20",
      });
    } else if (mark_type === "MT-004" && (mark_value < 0 || mark_value > 40)) {
      return res.status(400).json({
        error: "Mark value should be between 0 and 40",
      });
    }

    const existingMark = await student_marks.findOne({
      where: {
        student_id: student_id,
        type_id: mark_type,
        course_id: course_id,
      },
    });
    // If the mark exists, return an error message
    if (existingMark) {
      return res.status(400).json({
        error: "Mark already exists for this student, course, and mark type.",
      });
    }
    // Create new mark record if no existing mark found
    const newMark = await student_marks.create({
      course_id: course_id,
      student_id: student_id,
      type_id: mark_type,
      mark_value: mark_value,
    });

    res.status(201).json({
      status: "success",
      message: "Mark Added Successfully",
      data: newMark,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.editMark = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { student_id, mark_type, mark_value } = req.body;
    // Mark validation based on mark_type
    if (
      (mark_type === "MT-001" ||
        mark_type === "MT-002" ||
        mark_type === "MT-003") &&
      (mark_value < 0 || mark_value > 20)
    ) {
      return res.status(400).json({
        error: "Mark value should be between 0 and 20",
      });
    } else if (mark_type === "MT-004" && (mark_value < 0 || mark_value > 40)) {
      return res.status(400).json({
        error: "Mark value should be between 0 and 40",
      });
    }

    // First check if the mark exists
    const existingMark = await student_marks.findOne({
      where: {
        course_id: course_id,
        student_id: student_id,
        type_id: mark_type,
      },
    });

    if (!existingMark) {
      return res.status(404).json({
        error: "Mark not found",
      });
    }

    // Update the mark
    await student_marks.update(
      { mark_value: mark_value },
      {
        where: {
          course_id: course_id,
          student_id: student_id,
          type_id: mark_type,
        },
      }
    );

    // Get the updated mark
    const updatedMark = await student_marks.findOne({
      where: {
        course_id: course_id,
        student_id: student_id,
        type_id: mark_type,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Mark updated successfully",
      data: updatedMark,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getMark = async (req, res) => {
  try {
    const { course_id, student_id, mark_type } = req.params;

    // Fetch the mark from the database
    const mark = await student_marks.findOne({
      where: {
        course_id: course_id,
        student_id: student_id,
        type_id: mark_type, // Ensure that the field is 'type_id' in the database model
      },
    });

    // Check if the mark was found and send the appropriate response
    if (mark) {
      return res.status(200).json({
        status: "success",
        data: mark.mark_value, // Return the mark value if found
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: "No mark found", // Message indicating no mark found
      });
    }
  } catch (error) {
    // Handle and log errors
    console.error("Error fetching mark:", error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getCourseByID = async (req, res) => {
  try {
    const { course_id } = req.params;
    const courseData = await course.findOne({
      where: {
        course_id: course_id,
      },
      include: [
        {
          model: section,
          as: "section",
          attributes: ["section_name"],
          include: [
            {
              model: grade,
              as: "grade",
              attributes: ["grade_name"],
              include: [
                {
                  model: department,
                  as: "dept",
                  attributes: ["name"], // Retrieve department's name via grade
                },
              ],
            },
          ],
        },
        {
          model: teacher,
          as: "teacher",
          attributes: ["first_name", "last_name"], // Teacher info
        },
      ],
    });
    res.status(200).json({
      status: "success",
      data: courseData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
