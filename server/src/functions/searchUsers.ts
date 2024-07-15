import getUsers from "../utility/getUsers"
import validateForm from '../utility/validateForm'

export default (req: any, res: any) => {

    const valid = validateForm(req.body)

    if (!valid.valid) {
        // Not valid form
        res.status(400)
        res.json({
            errorMessages: valid.errorMessages
        });
        return
    }

    // Получение номера без знаков маски
    let numberFixed = ''
    if (req.body.number) {
        numberFixed = req.body.number.replaceAll('-', '')
    }

    // Поиск пользователей по email и number
    const users = getUsers(req.body.email, numberFixed)
    
    //Ответ на запрос
    if (users.length) {
        // ОК
        res.status(200)
        res.json({
            users
        });
    } else {
        // Not Found
        res.status(404)
        res.json({
            errorMessages: ['Пользователи не найдены.']
        });
    }
}