module.exports = (sequelize, Sequelize) => {
    const Statistics = sequelize.define("statistics", {
        parentId: {
            type: Sequelize.INTEGER
        },
        messageId: {
            type: Sequelize.INTEGER
        },
        chatId: {
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.TEXT
        },
        lastName: {
            type: Sequelize.TEXT
        },
        username: {
            type: Sequelize.TEXT
        },
    });

    return Statistics;
};
