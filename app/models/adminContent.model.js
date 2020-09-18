module.exports = (sequelize, Sequelize) => {
    const AdminContents = sequelize.define("adminContent", {
        text: {
            type: Sequelize.TEXT('long')
        },
        buttonId: {
            type: Sequelize.INTEGER
        }
    });

    return AdminContents;
};
