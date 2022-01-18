module.exports = (sequelize, DataTypes) => {
    const Subjects = sequelize.define("Subjects", {
      SubjectCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SubjectNameTH: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SubjectNameENG: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SubjectOfHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ContentTH: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
      },
      ContentENG: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
      },
      IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      AddBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EditBy: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });

    Subjects.associate = (models) => {
      Subjects.hasMany(models.Attachs, {
        onDelete: "cascade",
      });
    };
    return Subjects;
  };