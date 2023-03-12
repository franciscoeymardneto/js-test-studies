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
              "id": 1,
              "name": "Neto",
              "profession": "Develop",
              "birthDay": 2002
            },
            {
              "id": 2,
              "name": "Sam",
              "profession": "PO",
              "birthDay": 1996
            },
            {
              "id": 3,
              "name": "Bebel",
              "profession": "Admin",
              "birthDay": 1873
            }
          ]

        deepStrictEqual(JSON.stringify(result),JSON.stringify(expect))
    }

})()