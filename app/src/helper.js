const consola = require('consola')
const axios = require("axios");
const RESTAPI = require("../constants/restapi");

module.exports = {

    logStart() {
        consola.info('Bot has been started...')
    },

    getChatId(msg) {
        return msg.chat.id
    },

    setSendMessage(bot, answer, GET_CHAT, setInStatistics = true) {
        bot.sendMessage(GET_CHAT, answer.text, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: answer.buttons
            },
            disable_notification: true
        }).then(r => {
                if (setInStatistics) {
                    axios.post(process.env.DEV_HOST + RESTAPI.STAT, {
                        parentId: answer.parentId,
                        messageId: r.message_id,
                        chatId: r.chat.id,
                        firstName: r.chat.first_name,
                        lastName: r.chat.last_name,
                        username: r.chat.username
                    })
                }
            }
        );
    },

    updateMessage(bot, answer, query, setInStatistics = true) {
        bot.editMessageText(answer.text, {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: answer.buttons
            },
        }).then(r => {
            if (setInStatistics) {
                axios.post(process.env.DEV_HOST + RESTAPI.STAT, {
                    parentId: answer.parentId,
                    messageId: r.message_id,
                    chatId: r.chat.id,
                    firstName: r.chat.first_name,
                    lastName: r.chat.last_name,
                    username: r.chat.username
                })
            }
        }).catch(function (err) {
            if (err)
                console.log("editMessage error");
        });
    },

    async checkSesion(userId) {
        let session = null;
        await axios.post(process.env.DEV_HOST + RESTAPI.GET_SESSION, {userId})
            .then(data => {
                session = data.data
            })
        return session
    },

    createSession(data) {
        axios.post(process.env.DEV_HOST + RESTAPI.SET_SESSION, {
            userId: data.id,
            username: data.username,
        })
    },

    destroySession(userId) {
        axios.post(process.env.DEV_HOST + RESTAPI.DESTROY_SESSION, {
            userId
        })
    }
}