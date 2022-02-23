module.exports = (sequelize, DataTypes) => {
    const CommentsSubjects = sequelize.define("CommentsSubjects", {
      TextComment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      UserName:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      UserImage:{
        type: DataTypes.BLOB('long'),
        allowNull: true,
      },
      RelatedTable:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      RelatedId:{
        type: DataTypes.STRING,
        allowNull:false,
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
    return CommentsSubjects;
  };