module.exports = (sequelize, Sequelize) => {
    const AdminButtons = sequelize.define("adminButtons", {
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

    return AdminButtons;
};
