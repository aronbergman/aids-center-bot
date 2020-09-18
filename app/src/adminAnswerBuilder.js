const RESTAPI = require('../constants/restapi')
const axios = require('axios')
require('dotenv').config()

const adminAnswerBuilder = async (parentId = 0, contentId) => {

    const buttons = await axios.post(process.env.DEV_HOST + RESTAPI.ADMIN_BUTTONS, {parentId})
        .then(async (data) => {
                const buttons = [];

                data.data.childrenTitles.map(section => {
                    buttons.push([{
                        callback_data: section.contentId,
                        text: section.title
                    }])
                });

                data.data.prevBtnName ? buttons.push([{
                    // Не учитывать в статистике нажатия на кнопку "Назад", отслеживаю <
                    callback_data: `${data.data.prevBtnId.parentId}<`,
                    text: `⬅️️ ${data.data.prevBtnName}`
                }]) : null;

                return buttons
            }
        )

    const text = await axios.post(process.env.DEV_HOST + RESTAPI.ADMIN_CONTENT, {
        parentId: contentId ? contentId : parentId
    })
        .then(async (data) => data.data.text ? data.data.text : `Добавь материал в таблицу для buttonId ${parentId}`
        )

    return {text, buttons, parentId}
}

module.exports = adminAnswerBuilder