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
const Report = require("../models/NOSQL/Report");
const CourseUnit = require("../models/NOSQL/CourseUnit");
const Assigment = require("../models//NOSQL/Assigment.js");
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
    const { course_id } = req.body;

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
    const { course_id } = req.params;
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
    const { course_id, newTeacher_id } = req.body;
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
    const { course_id } = req.params;

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

// add a report for a student in ✅
exports.addReport = async (req, res) => {
  const { course_id, student_id, title, date, description } = req.body;
  const role = req.role;
  const id = req.user.id;
  try {
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Formats to YYYY-MM-DD

    const newReport = await new Report({
      instructor_id: id,
      instructor_type: role,
      course_id: course_id, // Optional field, can be left out if not needed
      student_id: student_id,
      title: title,
      description: description,
      date: formattedDate,
    }).save();

    res.status(201).json({
      status: "success",
      message: "Report Added Successfully",
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
  const { title } = req.body;
  const file = req.file;
  try {
    console.log(unit_id);
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
        await fs.promises.unlink(filePath);
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
    console.log(students);

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
    const { course_id } = req.params;
    const { title, description, end_at } = req.body;
    const file = req.file;
    const filePath = file.destination + "/" + file.filename;
    const fileType = file.mimetype;
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
    console.log("in the add assigment");
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
    const { assigment_id } = req.params;
    const deletedAssigment = await Assigment.findById(assigment_id);
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
    await Assigment.findByIdAndDelete(assigment_id);

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
exports.getAllAssigmentsForTeacher = async (req, res) => {
  try {
    const { course_id } = req.params;
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.showAssigmentSubmission = async (req, res) => {};
exports.getAllAssigmentsForStudent = async (req, res) => {};
exports.markAssigment = async (req, res) => {};
exports.submitAssigment = async (req, res) => {};

// Quizes
exports.addQuiz = async (req, res) => {};
exports.deleteQuiz = async (req, res) => {};
exports.getQuiz = async (req, res) => {};
exports.editQuiz = async (req, res) => {};
exports.getAllQuizes = async (req, res) => {};
exports.showQuizSubmissions = async (req, res) => {};

// marks
// here we should meet at discord ok karam?>
exports.addMark = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { student_id, mark_type, mark_value } = req.body;
    console.log(course_id, student_id, mark_type, mark_value);
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
      console.log("here");
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
    // Find the mark record to update
    const updatedMark = await student_marks.update(
      { mark_value: mark_value }, // The updated fields
      {
        where: {
          course_id: course_id,
          student_id: student_id,
          type_id: mark_type, // Make sure the correct field is used here (type_id instead of mark_type)
        },
        returning: true, // This option ensures the updated record is returned
        plain: true, // Ensures that only the updated record is returned
      }
    );

    res.status(200).json({
      status: "success",
      message: "Mark updated successfully",
      data: updatedMark[1], // The second item in the array contains the updated record
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getMark = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { student_id, mark_type } = req.body;

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
