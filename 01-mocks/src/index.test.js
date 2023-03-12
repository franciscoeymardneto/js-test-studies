const error = require('./errors')
const File = require('./file')
const { rejects, deepStrictEqual} = require('node:assert')
;
(async () => {
    {
        const filePath = './../mocks/empty-invalid.csv'
        const reject = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await rejects(result,reject)
    }
    {
        const filePath = './../mocks/header-invalid.csv'
        const reject = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await rejects(result,reject)
    }
    {
        const filePath = './../mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expect = [
            {
              "id": "01",
              "name": "Neto",
              "profession": "Develop",
              "age": 21
            },
            {
              "id": "02",
              "name": "Sam",
              "profession": "PO",
              "age": 27
            },
            {
              "id": "03",
              "name": "Bebel",
              "profession": "Admin",
              "age": 150
            }
          ]

        deepStrictEqual(result,expect)
    }

})()