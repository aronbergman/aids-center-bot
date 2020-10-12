const RESTAPI = require('../constants/restapi')
const axios = require('axios')
const adminAnswerBuilder = require("./adminAnswerBuilder");
const {updateMessage} = require("./helper");
require('dotenv').config()

const eventBuilder = async (queryId, bot, query) => {

    if (queryId === '3') {
        // Проверить, есть ли в бд мероприятий черновик
        return await axios.post(process.env.DEV_HOST + RESTAPI.GET_LAST_EVENT)
            .then(async (data) => {

                if (data.data.length) {
                    // Если есть, продолжить его, определив какое поле не заполнено
                    console.log('GET_LAST_EVENT', data.data)
                } else {
                    // Если нет, отправить клавиатуру с выбором типа
                    const answer = await adminAnswerBuilder(3)
                    updateMessage(bot, answer, query, false)
                }

            })
    }

    // создать запись с выбранным типом и published '0'
    const eventTypes = ['6', '7', '8']
    let type = null
    if (eventTypes.indexOf(queryId) !== -1) {

        switch (queryId) {
            case ('6'):
                type = 'Тип 1';
                break
            case ('7'):
                type = 'Тип 2';
                break
            case ('8'):
                type = 'Тип 3';
                break
        }

        return await axios.post(process.env.DEV_HOST + RESTAPI.CREATE_EVENT_STEP_ONE, {type: type})
            .then(async (data) => {
                const answer = await adminAnswerBuilder(100)
                updateMessage(bot, answer, query, false)
            })
    }
}

module.exports = eventBuilder

// убрать проверку на кнопку назад если она не пришла и там самым не выводить назад для месяцев и типов