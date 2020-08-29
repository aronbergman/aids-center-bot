module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define("content", {
        text: {
            type: Sequelize.TEXT('long')
        },
        buttonId: {
            type: Sequelize.INTEGER
        }
    });

    return Content;
};
