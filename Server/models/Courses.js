module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("Courses", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filebase64: {
      type: DataTypes.BLOB('long')  ,
      allowNull: true,
    },
  });
  return Courses;
};