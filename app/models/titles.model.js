module.exports = (sequelize, Sequelize) => {
  const Titles = sequelize.define("titles", {
    title: {
      type: Sequelize.STRING
    },
    parentId: {
      type: Sequelize.INTEGER
    }
  });

  return Titles;
};
