module.exports = (sequelize, DataTypes) => {
    const Attachs = sequelize.define("Attachs", {
      FileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      FileData: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
      },
      FileType: {
        type: DataTypes.STRING,
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
    return Attachs;
  };