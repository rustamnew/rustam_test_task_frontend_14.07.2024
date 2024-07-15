import getUsers from "../utility/getUsers"

export default (req: any, res: any) => {

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