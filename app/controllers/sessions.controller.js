const db = require("../models");
const Sessions = db.sessions;

exports.getSession = (req, res) => {
    Sessions.findOne({where: {userId: req.body.userId}})
        .then(data => res.send(data))
        .catch(err => res.send(err))
}

exports.destroySession = (req, res) => {
    console.log('DESTROY req.body.userId', req.body.userId)
    Sessions.destroy({where: {userId: req.body.userId}})
        .then(data => res.sendStatus(200))
}

exports.setSession = (req, res) => {
    Sessions.create({
        userId: req.body.userId,
        username: req.body.username,
        chatId: req.body.chatId
    })
        .then(data => res.send(data))
        .catch(err => res.send(err))
}