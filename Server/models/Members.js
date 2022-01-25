module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define("Members", {
      accountCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      learningPathId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      AddBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EditBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      groupMember: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true,
      },district: {
        type: DataTypes.STRING,
        allowNull: true,
      },subDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
      }
      
    });
    return Members;
  };