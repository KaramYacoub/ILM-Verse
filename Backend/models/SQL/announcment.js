const Sequelize = require("sequelize");
const department = require("./department");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "announcment",
    {
      announcmentid: {
        type: DataTypes.STRING(20),
        allowNull: true,
        primaryKey: true,
      },
      announcmentdate: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: new Date().toISOString().split("T")[0],
      },
      sentat: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: new Date().toTimeString().split(" ")[0],
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adminid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "admin",
          key: "gm_id",
        },
      },
      department_id: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
          model: "department",
          key: "department_id",
        },
      },
    },
    {
      sequelize,
      tableName: "announcment",
      schema: "public",
      hasTrigger: true,
      timestamps: false,
      indexes: [
        {
          name: "announcment_pkey",
          unique: true,
          fields: [{ name: "announcmentid" }],
        },
      ],
    }
  );
};
