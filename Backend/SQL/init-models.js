var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _announcment = require("./announcment");
var _course = require("./course");
var _course_student = require("./course_student");
var _department = require("./department");
var _event = require("./event");
var _grade = require("./grade");
var _mark_type = require("./mark_type");
var _parent = require("./parent");
var _post = require("./post");
var _section = require("./section");
var _student = require("./student");
var _student_marks = require("./student_marks");
var _teacher = require("./teacher");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var announcment = _announcment(sequelize, DataTypes);
  var course = _course(sequelize, DataTypes);
  var course_student = _course_student(sequelize, DataTypes);
  var department = _department(sequelize, DataTypes);
  var event = _event(sequelize, DataTypes);
  var grade = _grade(sequelize, DataTypes);
  var mark_type = _mark_type(sequelize, DataTypes);
  var parent = _parent(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var section = _section(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var student_marks = _student_marks(sequelize, DataTypes);
  var teacher = _teacher(sequelize, DataTypes);

  course.belongsToMany(student, { as: 'student_id_students', through: course_student, foreignKey: "course_id", otherKey: "student_id" });
  student.belongsToMany(course, { as: 'course_id_courses', through: course_student, foreignKey: "student_id", otherKey: "course_id" });
  announcment.belongsTo(admin, { as: "admin", foreignKey: "adminid"});
  admin.hasMany(announcment, { as: "announcments", foreignKey: "adminid"});
  event.belongsTo(admin, { as: "admin", foreignKey: "adminid"});
  admin.hasMany(event, { as: "events", foreignKey: "adminid"});
  post.belongsTo(admin, { as: "admin", foreignKey: "adminid"});
  admin.hasMany(post, { as: "posts", foreignKey: "adminid"});
  course_student.belongsTo(course, { as: "course", foreignKey: "course_id"});
  course.hasMany(course_student, { as: "course_students", foreignKey: "course_id"});
  student_marks.belongsTo(course_student, { as: "course", foreignKey: "course_id"});
  course_student.hasMany(student_marks, { as: "student_marks", foreignKey: "course_id"});
  student_marks.belongsTo(course_student, { as: "student", foreignKey: "student_id"});
  course_student.hasMany(student_marks, { as: "student_student_marks", foreignKey: "student_id"});
  grade.belongsTo(department, { as: "dept", foreignKey: "dept_id"});
  department.hasMany(grade, { as: "grades", foreignKey: "dept_id"});
  teacher.belongsTo(department, { as: "dept", foreignKey: "dept_id"});
  department.hasMany(teacher, { as: "teachers", foreignKey: "dept_id"});
  section.belongsTo(grade, { as: "grade", foreignKey: "grade_id"});
  grade.hasMany(section, { as: "sections", foreignKey: "grade_id"});
  student_marks.belongsTo(mark_type, { as: "type", foreignKey: "type_id"});
  mark_type.hasMany(student_marks, { as: "student_marks", foreignKey: "type_id"});
  student.belongsTo(parent, { as: "parent", foreignKey: "parent_id"});
  parent.hasMany(student, { as: "students", foreignKey: "parent_id"});
  course.belongsTo(section, { as: "section", foreignKey: "section_id"});
  section.hasMany(course, { as: "courses", foreignKey: "section_id"});
  student.belongsTo(section, { as: "section", foreignKey: "section_id"});
  section.hasMany(student, { as: "students", foreignKey: "section_id"});
  teacher.belongsTo(section, { as: "section", foreignKey: "section_id"});
  section.hasMany(teacher, { as: "teachers", foreignKey: "section_id"});
  course_student.belongsTo(student, { as: "student", foreignKey: "student_id"});
  student.hasMany(course_student, { as: "course_students", foreignKey: "student_id"});
  course.belongsTo(teacher, { as: "teacher", foreignKey: "teacher_id"});
  teacher.hasMany(course, { as: "courses", foreignKey: "teacher_id"});

  return {
    admin,
    announcment,
    course,
    course_student,
    department,
    event,
    grade,
    mark_type,
    parent,
    post,
    section,
    student,
    student_marks,
    teacher,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
