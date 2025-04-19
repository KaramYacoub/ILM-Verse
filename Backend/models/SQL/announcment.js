const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "announcment",
    {
      announcmentid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      announcmentdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_DATE"),
      },
      sentat: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: "date_trunc(minute",
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
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
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
