import fs from 'fs'

export default (email: string, number: string): User[] => {
    // Чтение файла json
    const data = fs.readFileSync('./json/users.json', {
        encoding: 'utf8'
    })
    const users = JSON.parse(data)

    // Фильтрация (поиск по массиву)
    const result = users.filter( (user: User) => {
        if (number.length) {
            return user.email.includes(email) && user.number && user.number.includes(number)
        } else {
            return user.email.includes(email)
        }
    })
        
    return result
}