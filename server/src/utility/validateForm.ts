export default (formBody: any) => {
    // Дефолтные значения
    let valid = true
    let errorMessages: String[] = []

    // Минимальная длина поля
    const fields = Object.keys(formBody)
    
    fields.forEach( (field) => {
        
        if (formBody[field] && formBody[field].length < 2) {
            valid = false
            errorMessages.push('Слишком короткое значение')
        }
        
    })

    // Максимальная длина поля
    fields.forEach( (field) => {
        if (formBody[field] && formBody[field].length > 50) {
            valid = false
            errorMessages.push('Слишком длинное значение')
        }
        
    })

    // Убрать повторы в массиве, новая структура "Set"
    errorMessages = Array.from(new Set(errorMessages));

    return {
        valid,
        errorMessages
    }
    
}