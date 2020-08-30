module.exports = (sequelize, Sequelize) => {
  const Buttons = sequelize.define("buttons", {
    title: {
      type: Sequelize.STRING
    },
    contentId: {
      type: Sequelize.INTEGER
    },
    parentId: {
      type: Sequelize.INTEGER
    }
  });

  return Buttons;
};
