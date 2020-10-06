const RESTAPI = require('../constants/restapi')
const axios = require('axios')
require('dotenv').config()

const statBuilder = async () => {

    return await axios.post(process.env.DEV_HOST + RESTAPI.GET_STAT)
        .then(async (data) => {

            const xl = require('excel4node');

            const wb = new xl.Workbook();
            const ws = wb.addWorksheet('Worksheet Name');

            const headingColumnNames = [
                'Номер',
                'ID Материала',
                'Заголовок',
                'username',
                'firstName',
                'lastName',
                'Message ID',
                'Private Chat ID',
                'Создано',
                'Обновлено',
            ]

            let headingColumnIndex = 1;
            headingColumnNames.forEach(heading => {
                ws.cell(1, headingColumnIndex++)
                    .string(heading)
            });

            let rowIndex = 2;
            data.data.forEach(record => {
                let columnIndex = 1;
                Object.keys(record).forEach(columnName => {
                    ws.cell(rowIndex, columnIndex++)
                        .string(`${record[columnName]}`)
                });
                rowIndex++;
            });

            wb.write('filename.xlsx')

        });
}

module.exports = statBuilder