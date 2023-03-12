const { readFile } = require("node:fs/promises")
const { join } = require("node:path")

class File{
    static async csvToJson(filePath){
        return `Hello, ${await this.getFileContent(filePath)}`
    }
    static async getFileContent(filePath){
        const fileName = join(__dirname,filePath)
        return (await readFile(fileName)).toString('utf-8')
    }
}

(async ()=> {
    const result = await File.csvToJson('./../mocks/threeItems-valid.csv')
    console.log(result)

})()


module.exports = File