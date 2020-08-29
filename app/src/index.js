const DESCRIPTIONS = require('../constants/descriptions')

module.exports = () => {
    require('dotenv').config()

    const helper = require('./helper')
    const answerBuilder = require('./answerBuilder')
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
        polling: true,
    });

    helper.logStart()

    bot.onText(/\/start/, async msg => {
        const text = DESCRIPTIONS.HELLO + DESCRIPTIONS.START;
        const buttons = await answerBuilder(null);
        const GET_CHAT = helper.getChatId(msg)

        bot.sendMessage(GET_CHAT, text, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: buttons
            },
            disable_notification: true
        });
    });

    bot.onText(/\/help/, async msg => {
        const text = DESCRIPTIONS.HELP;
        const buttons = await answerBuilder('1');
        const GET_CHAT = helper.getChatId(msg)

        bot.sendMessage(GET_CHAT, text, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: buttons
            },
            disable_notification: true
        });
    });

    bot.onText(/\/digest/, async msg => {
        const text = DESCRIPTIONS.DIGEST;
        const buttons = await answerBuilder('2');
        const GET_CHAT = helper.getChatId(msg)

        bot.sendMessage(GET_CHAT, text, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: buttons
            },
            disable_notification: true
        });
    });


    bot.on('callback_query', async query => {
        const prevBtnId = +query.data
        let text = null

        switch (query.data) {
            case 'null':
                text = DESCRIPTIONS.START;
                break
            case '1':
                text = DESCRIPTIONS.HELP;
                break
            case '2':
                text = DESCRIPTIONS.DIGEST;
                break
            case '5':
                text = DESCRIPTIONS.UNSECURITED_CONTACT;
                break
        }

        const buttons = await answerBuilder(prevBtnId)

        bot.sendMessage(query.message.chat.id, `${text}`, {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: buttons
            },
            disable_notification: true
        })
    })
}