const RESTAPI = require('../constants/restapi')
const axios = require('axios')
require('dotenv').config()

const keyboard = async (parendId, type) => {
    const buttons = [];

    const preTitles = await axios.post(process.env.DEV_HOST + RESTAPI.SUBTITLES, {parendId})
        .then(async (data) => {
                console.log('preTitles DATA.DATA', data.data)

                data.data.childrenTitles.map(section => {
                    console.log('section', section)

                    buttons.push([{
                        callback_data: section.id,
                        text: section.title
                    }])
                });

                data.data.prevBtnId ? buttons.push([{
                    callback_data: `${data.data.prevBtnId.parentId}`,
                    text: `Назад (к заголовкам от ID ${data.data.prevBtnId.parentId})`
                }]) : null
            }
        )
    return buttons
}

module.exports = keyboard