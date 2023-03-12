class User {
    constructor({id, name, profession, age}){
        this.id = parseInt(id)
        this.name = name
        this.profession = profession
        this.birthDay = new Date().getFullYear() - age
    }
}
module.exports = User