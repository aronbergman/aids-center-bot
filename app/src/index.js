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


    bot.on('message', msg => {
        const text = msg.text;
        if (text && text.startsWith('/')) return;

        if (msg.chat.username === 'aronbergman') {

            if (msg.reply_to_message) {
                bot.sendMessage(msg.reply_to_message.text, msg.text)
            } else {
                bot.sendMessage(msg.chat.id, `${msg.chat.id === 146341933 ? '✅' : '⚠️'}`)
            }

        } else {
            bot.sendMessage(146341933, `
        ${msg.from.is_bot ? '🤖' : '🙋🏼‍♂️'} ${msg.from.first_name} ${msg.from.last_name} @${msg.from.username}
${msg.chat.id} ${msg.text}`, {
                parse_mode: "Markdown"
            }).then(bot.sendMessage(146341933, msg.chat.id))
        }
    });
}