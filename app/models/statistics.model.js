module.exports = (sequelize, Sequelize) => {
    const Statistics = sequelize.define("statistics", {
        contentId: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.TEXT
        },
        username: {
            type: Sequelize.TEXT
        },
        firstName: {
            type: Sequelize.TEXT
        },
        lastName: {
            type: Sequelize.TEXT
        },
        messageId: {
            type: Sequelize.INTEGER
        },
        chatId: {
            type: Sequelize.INTEGER
        }
    });

    return Statistics;
};
