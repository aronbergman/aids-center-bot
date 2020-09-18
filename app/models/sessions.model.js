module.exports = (sequelize, Sequelize) => {
    const Sessions = sequelize.define("sessions", {
        userId: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.TEXT
        }
    });

    return Sessions;
};
