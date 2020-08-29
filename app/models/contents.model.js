module.exports = (sequelize, Sequelize) => {
    const Contents = sequelize.define("contents", {
        text: {
            type: Sequelize.TEXT('long')
        },
        titleId: {
            type: Sequelize.INTEGER
        }
    });

    return Contents;
};
