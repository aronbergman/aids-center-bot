const axios = require("axios");
const moment = require("moment");
moment.locale('ru');
const db = require("../models");
const Contents = db.contents;

module.exports = () => {
    const eventsBuilder = () => {
        let eventsFormatting = '*КАЛЕНДАРЬ БЛИЖАЙШИХ МЕРОПРИЯТИЙ*\nНажми на мероприятие и ты узнаешь МЕСТО и АДРЕС его проведения \n\n'

        return axios.get('https://api.spid.center/v3/events')
            .then(({data}) => data.events.items.map(item => {
                const date = moment(item.date_from).format('LLL');
                const eventsItem = `${date}\n[${item.title}](https://spid.center/ru/events/${item.id})\n\n`
                eventsFormatting = eventsFormatting + eventsItem
            }))
            .then(() => {
                eventsFormatting = eventsFormatting + '*Анонс ближайшего мероприятия:*'
            })
            .then(async () => {
                try {
                    const result = await Contents.update(
                        {text: eventsFormatting},
                        {where: {buttonId: 57}}
                    )
                    console.log(result)
                } catch (err) {
                    console.log(err)
                }
            })
    }

    eventsBuilder().then(() => {
        console.log("SET INTERVAL EVENTS UPDATE EVERY HOUR");
        setInterval(() => eventsBuilder(), 3600000);
    })
}