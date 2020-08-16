const NAMES = require('../constants/names')

module.exports = () => {
    require('dotenv').config()

    const helper = require('./helper')
    const keyboard = require('./keyboard')
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
        polling: true
    });

    helper.logStart()

    bot.onText(/\/start/, async msg => {
        const text = `👋 Привет ${msg.from.first_name}, здесь база ответов на самые частые вопросы. \n\nНачни с выбора раздела`;
        const buttons = await keyboard(null, NAMES.TITLE);
        const GET_CHAT = helper.getChatId(msg)

        bot.sendMessage(GET_CHAT, text, {
            reply_markup: {
                inline_keyboard: buttons
            },
            disable_notification: true
        });

    });

    bot.on('callback_query', async query => {
        const prevBtnId = +query.data
        const text = null

        if (prevBtnId === null) {
            text = `👋 Привет ${msg.from.first_name}, здесь база ответов на самые частые вопросы. \n\nНачни с выбора раздела`;
        }

        const buttons = await keyboard(prevBtnId, NAMES.TITLE)

        bot.sendMessage(query.message.chat.id, query.data, {
            reply_markup: {
                inline_keyboard: buttons
            },
            disable_notification: true
        })
    })
}