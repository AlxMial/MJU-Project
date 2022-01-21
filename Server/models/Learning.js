module.exports = (sequelize, DataTypes) => {
    const Learning = sequelize.define("Learning", {
      LearningPathCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LearningPathNameTH: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LearningPathNameENG: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DescriptionTH: {
        type: DataTypes.BLOB('long')  ,
        allowNull: true,
      },
      DescriptionENG: {
        type: DataTypes.BLOB('long')  ,
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
      },
    });

    Learning.associate = (models) => {
      Learning.hasMany(models.Courses, {
        onDelete: "cascade",
      });
    };
    return Learning;
  };