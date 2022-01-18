module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      TextComment: {
        type: DataTypes.STRING,
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
      }
    });
    return Comments;
  };