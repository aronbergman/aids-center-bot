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
        const answer = await answerBuilder('0', '9999');
        const GET_CHAT = helper.getChatId(msg)

        helper.setSendMessage(bot, answer, GET_CHAT)
    });


    bot.onText(/\/help/, async msg => {
        const answer = await answerBuilder('1');
        const GET_CHAT = helper.getChatId(msg)

        helper.setSendMessage(bot, answer, GET_CHAT)
    });


    bot.onText(/\/digest/, async msg => {
        const answer = await answerBuilder('2');
        const GET_CHAT = helper.getChatId(msg)

        helper.setSendMessage(bot, answer, GET_CHAT)
    });


    bot.onText(/\/contacts/, async msg => {
        const answer = await answerBuilder('3');
        const GET_CHAT = helper.getChatId(msg)

        helper.setSendMessage(bot, answer, GET_CHAT)
    });


    bot.onText(/\/fund/, async msg => {
        const answer = await answerBuilder('4');
        const GET_CHAT = helper.getChatId(msg)

        helper.setSendMessage(bot, answer, GET_CHAT)
    });


    bot.onText(/\/before/, async msg => {
        const answer = await answerBuilder('33');
        const GET_CHAT = helper.getChatId(msg)

        helper.setSendMessage(bot, answer, GET_CHAT)
    });


    bot.onText(/\/after/, async msg => {
        const answer = await answerBuilder('34');
        const GET_CHAT = helper.getChatId(msg)

        helper.setSendMessage(bot, answer, GET_CHAT)
    });

    bot.on('callback_query', async query => {
        // Не учитывать в статистике нажатия на кнопку "Назад"
        const prevBtn = !!(query.data.indexOf('<') + 1)
        let setParentId = ''

        if (prevBtn) {
            setParentId = query.data.substring(0, query.data.length - 1)
        } else {
            setParentId = +query.data
        }

        const answer = await answerBuilder(setParentId)
        helper.setSendMessage(bot, answer, query.message.chat.id, !prevBtn)
    })
}