const db = require("../models");
const Buttons = db.buttons;
const Contents = db.contents;
const Statistics = db.statistics;
// const Op = db.Sequelize.Op;
let childrenTitles = []
let prevBtnId = null
let prevBtnName = null

exports.getButtons = (req, res) => {

    Buttons.findAll({where: {parentId: req.body.parentId}})
        .then(data => {
                childrenTitles = data

                Buttons.findOne({where: {id: req.body.parentId}})
                    .then(data => {
                        prevBtnId = data

                        if (req.body.parentId !== '0' && req.body.parentId !== 0) {
                            const id = data.parentId

                            Buttons.findOne({where: {id}})
                                .then(data => {
                                    prevBtnName = data.title
                                    res.send({childrenTitles, prevBtnId, prevBtnName})
                                })

                        } else {
                            res.send({childrenTitles, prevBtnId})
                        }
                    })
            }
        )
}

exports.getContent = (req, res) => {

    Contents.findOne({where: {buttonId: req.body.parentId}})
        .then(data => res.send(data))
}

exports.setStat = (req, res) => {
    Statistics.create({
        parentId: req.body.parentId,
        messageId: req.body.messageId,
        chatId: req.body.chatId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    })
        .then(data => res.send(data))
}