const db = require("../models");
const Statistics = db.statistics;

exports.setStat = (req, res) => {
    Statistics.create({
        contentId: req.body.parentId,
        messageId: req.body.messageId,
        chatId: req.body.chatId,
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    })
        .then(data => res.send(data))
}

exports.getStat = async (req, res) => {
    await Statistics.findAll().then(data => res.send(data))
}
