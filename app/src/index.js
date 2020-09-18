module.exports = () => {
    require('dotenv').config()

    const helper = require('./helper')
    const answerBuilder = require('./answerBuilder')
    const adminAnswerBuilder = require('./adminAnswerBuilder')
    const TelegramBot = require('node-telegram-bot-api');
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN_TEST, {
        polling: true,
    });

    helper.logStart()

    bot.onText(/\/start/, async msg => {
        const answer = await answerBuilder('0', '9999');
        const GET_CHAT = helper.getChatId(msg)

        await helper.setSendMessage(bot, answer, GET_CHAT)
        //    удалить сессию активного админа
        await helper.checkSesion(msg.chat.id).then(async data => {
            data.userId ? helper.destroySession(msg.chat.id) : null
        })
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

    bot.onText(/\/admin/, async msg => {
        const userId = msg.from.id

        // ПЕРЕЧИСЛЕНИЕ СПИСКА АДМИНОВ В SWITCH-CASE
        if (msg.from.id === 146341933) {
            await helper.checkSesion(msg.chat.id).then(async data => {
                if (!data.userId) {
                    //    иначе сохраняю ее и возвращаю админское меню
                    helper.createSession(msg.chat)
                }
            })
        }

        helper.checkSesion(userId).then(async data => {
            if (data.userId) {
                //    авторизация пройдена
                const answer = await adminAnswerBuilder('0', '9999');
                const GET_CHAT = helper.getChatId(msg)
                helper.setSendMessage(bot, answer, GET_CHAT)
            } else {
                //    авторизация не пройдена
                bot.sendMessage(msg.chat.id, '🔑 Введите пароль для входа')
            }
        })

        // клиент отправил admin
        // я проверил, есть ли его чат в БД авторизованных сессий

        // если чата нт в списке авторизованных сессий я присылаю сообщение с запросом пароля
        // в replay на это сообщение читаю пароль, если он правильный то записываю сессию и возвращаю админское меню
        // если пароль не верный – возвращаю сообщение о неверном пароле.

        // сформировать админское меню
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

        await helper.checkSesion(query.from.id).then(async data => {
            if (data.userId) {
                // обработать запрос в контексте админа
                const answer = await adminAnswerBuilder(setParentId)
                helper.updateMessage(bot, answer, query, !prevBtn)
            } else {
                // обработать запрос в контексте пользователя
                const answer = await answerBuilder(setParentId)
                helper.updateMessage(bot, answer, query, !prevBtn)
            }
        })
    })


    bot.on('message', msg => {
        const text = msg.text;
        if (text && text.startsWith('/')) return;

        if (msg.chat.username === 'aronbergman') {

            if (msg.reply_to_message) {
                bot.sendMessage(msg.reply_to_message.text, msg.text)
            } else {
                bot.sendMessage(msg.chat.id, `${msg.chat.id === 146341933 ? msg.text : '⚠️'}`)
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