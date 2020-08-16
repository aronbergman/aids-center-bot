const consola = require('consola')

module.exports = {

    logStart() {
        consola.info('Bot has been started...')
    },

    getChatId(msg) {
        return msg.chat.id
    },

    getPrevTitleId(data, type) {

        //    проверить что открыто, статья или раздел
        if (type === 'TITLE') {
            //    проверить первый подзаголовок статьи, взять его ID

            // запрос к бд на определение родителя

        } else {

        }

        //    сделать запрос на определение родительского ID от этого ID
        //    вернуть ID
    }
}