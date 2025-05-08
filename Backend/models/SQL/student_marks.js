const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "student_marks",
    {
      mark_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      course_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "course_student",
          key: "student_id",
        },
      },
      student_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "course_student",
          key: "student_id",
        },
      },
      type_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "mark_type",
          key: "type_id",
        },
      },
      mark_value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      mark_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "student_marks",
      schema: "public",
      hasTrigger: true,
      timestamps: false,
      indexes: [
        {
          name: "student_marks_pkey",
          unique: true,
          fields: [{ name: "mark_id" }],
        },
      ],
    }
  );
};
