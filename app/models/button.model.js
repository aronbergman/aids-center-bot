module.exports = (sequelize, Sequelize) => {
  const Buttons = sequelize.define("buttons", {
    title: {
      type: Sequelize.STRING
    },
    parentId: {
      type: Sequelize.INTEGER
    }
  });

  return Buttons;
};
