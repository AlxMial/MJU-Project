module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("Courses", {
    CurriculumCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CurriculumNameTH: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CurriculumNameENG: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CurriculumType: {
      type: DataTypes.STRING  ,
      allowNull: true,
    },
    NumOfHours: {
      type: DataTypes.INTEGER  ,
      allowNull: true,
    },
    NumOfMin: {
      type: DataTypes.INTEGER  ,
      allowNull: true,
    },
    DescriptionTH: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    CurriculumTag: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    DescriptionENG: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    IsComMat: {
      type: DataTypes.BOOLEAN  ,
      allowNull: true,
    },
    IsLCDMat: {
      type: DataTypes.BOOLEAN  ,
      allowNull: true,
    },
    IsOtherMat: {
      type: DataTypes.BOOLEAN  ,
      allowNull: true,
    },
    IsDocMedia: {
      type: DataTypes.BOOLEAN  ,
      allowNull: true,
    },
    IsOtherMedia: {
      type: DataTypes.BOOLEAN  ,
      allowNull: true,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN  ,
      allowNull: true,
    },
    AddBy: {
      type: DataTypes.STRING  ,
      allowNull: true,
    },
    EditBy: {
      type: DataTypes.STRING  ,
      allowNull: true,
    }
  });

  Courses.associate = (models) => {
    Courses.hasMany(models.Subjects, {
      onDelete: "cascade",
    });

    Courses.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };
  return Courses;
};