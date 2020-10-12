module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("events", {
        type: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        },
        month: {
            type: Sequelize.INTEGER
        },
        day: {
            type: Sequelize.INTEGER
        },
        heures: {
            type: Sequelize.INTEGER
        },
        minutes: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.INTEGER
        },
        published: {
            type: Sequelize.INTEGER
        },
    });

    return Events;
};
