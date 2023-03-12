const { readFile } = require("node:fs/promises")
const { join } = require("node:path")
const errorMessages = require("./errors")
const User = require("./user")

const DEFAULT_OPTIONS = {
    maxLine: 3,
    fields: ["id","name","profession","age"]
}
class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)

        if (!validation.valid) throw new Error(validation.error)

        const users = File.parseCsvToJson(content)
        return users
    }
    static async getFileContent(filePath){
        const fileName = join(__dirname,filePath)
        return (await readFile(fileName)).toString('utf-8')
    }
    static isValid (csvString, options = DEFAULT_OPTIONS) {
        const content = csvString.split('\n')
        const header = content.shift()
        const isHeaderValid = header === options.fields.join(',')

        if (!isHeaderValid) {
            return {
                error: errorMessages.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
            
        }

        const isContentLegthAccept = (
            content.length > 0 &&
            content.length <= options.maxLine
        )

        if (!isContentLegthAccept) {
            return {
                error: errorMessages.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return {
            valid: true
        }
    }
    static parseCsvToJson(csvString) {
        const lines = csvString.split('\n')
        const firstLine = lines.shift()
        const header = firstLine.split(',')

        const users = lines.map(line => {
            const columns = line.split(',')
            let user = {}
            for (const index in columns) {
                user[header[index]] = columns[index]
            }

            return new User(user)

        })

        return users
    }
}

(async ()=> {
    const result = await File.csvToJson('./../mocks/threeItems-valid.csv')
    // const result = await File.csvToJson('./../mocks/header-invalid.csv')
    //console.log(result)

})()


module.exports = File