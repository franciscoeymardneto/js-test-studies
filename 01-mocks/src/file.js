const { readFile } = require("node:fs/promises")
const { join } = require("node:path")
const errorMessages = require("./errors")

const DEFAULT_OPTIONS = {
    maxLine: 3,
    fields: ["id","name","profession","age"]
}
class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)

        if (!validation.valid) throw new Error(validation.error)

        return content
    }
    static async getFileContent(filePath){
        const fileName = join(__dirname,filePath)
        return (await readFile(fileName)).toString('utf-8')
    }
    static isValid (csvString, options = DEFAULT_OPTIONS) {
        const [header, ...content] = csvString.split('\n')
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
}

(async ()=> {
    const result = await File.csvToJson('./../mocks/threeItems-valid.csv')
    // const result = await File.csvToJson('./../mocks/header-invalid.csv')
    //console.log(result)

})()


module.exports = File