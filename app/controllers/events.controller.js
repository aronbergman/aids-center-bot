const db = require("../models");
const Events = db.events;

exports.getLastEvent = (req, res) => {
    Events.findOne({where: {published: 0}})
        .then(data => res.send(data))
}

exports.addEventStepOne = (req, res) => {
    Events.create({
        published: 0,
        type: req.body.type
    })
        .then(data => res.send(data))
}

//
// exports.getSession = (req, res) => {
//     Sessions.findOne({where: {userId: req.body.userId}})
//         .then(data => res.send(data))
//         .catch(err => res.send(err))
// }
//
// exports.destroySession = (req, res) => {
//     console.log('DESTROY req.body.userId', req.body.userId)
//     Sessions.destroy({where: {userId: req.body.userId}})
//         .then(data => res.sendStatus(200))
// }
//
// exports.setSession = (req, res) => {
//     Sessions.create({
//         userId: req.body.userId,
//         username: req.body.username,
//         chatId: req.body.chatId
//     })
//         .then(data => res.send(data))
//         .catch(err => res.send(err))
// }