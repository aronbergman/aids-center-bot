const db = require("../models");
const Titles = db.titles;
// const Op = db.Sequelize.Op;
let childrenTitles = []
let prevBtnId = null

exports.getTitles = (req, res) => {

    console.log('req.body.parendId', req.body.parendId)

    Titles.findAll({
        where: {
            parentId: req.body.parendId
        }
    }).then(data => {
            childrenTitles = data

            Titles.findOne({
                where: {
                    id: req.body.parendId
                }
            }).then(data => {
                prevBtnId = data
            }).then(data => res.send({
                childrenTitles,
                prevBtnId
            }))
        }
    )
}