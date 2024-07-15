<script setup>
import { ref } from 'vue'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'

import Button from 'primevue/button'

import LoaderSpin from './shared/LoaderSpin.vue'

const URL = 'http://localhost:3001' + '/api/search'

// Для показа анимации загрузки
const loading = ref(false)

// Сообщения об ошибке
const errorMessages = ref([])

// Поля формы
const emailModel = ref(null)
const numberModel = ref(null)

// Валидность Email
const emailValid = ref(null)

// Найденные пользователи
const usersFound = ref([])

// Обработка submit формы
async function onSubmit() {
    const valid = validateEmail()

    if (!valid) {
        return false
    } else {
        try {
            loading.value = true
            await sendForm()
        } catch (error) {
            errorMessages.value.push('Ошибка соединения')
        } finally {
            loading.value = false
        }
    }
}

// Валидация email по RegEx
function validateEmail() {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailModel.value)) {
        emailValid.value = true // OK

        return true
    } else {
        emailValid.value = false // Не валидный

        return false
    }
}

// Отправка запроса
async function sendForm() {
    usersFound.value = [] //Сброс текущих пользователей
    errorMessages.value = [] //Сброс текущих ошибок

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailModel.value || null,
            number: numberModel.value || null
        })
    })

    const data = await response.json()

    if (data.users) {
        usersFound.value = data.users
    } else if (data.errorMessages) {
        errorMessages.value = data.errorMessages
    }
}
</script>

<template>
    <div class="form-block">
        <h2>Поиск пользователя</h2>

        <form @submit.prevent="onSubmit()">
            <InputText
                v-model="emailModel"
                placeholder="Email"
                type="email"
                required
                @blur="validateEmail"
                :invalid="emailValid === false"
            />

            <InputMask v-model="numberModel" mask="?99-99-99" placeholder="Номер (опционально)" />

            <Button label="Поиск" type="submit" />
        </form>
    </div>

    <LoaderSpin v-if="loading === true" />

    <div class="list" v-if="usersFound.length">
        <h3>Найдено по запросу:</h3>

        <div class="item" v-for="(item, index) in usersFound" :key="index">
            <span class="title" v-if="item.email">{{ item.email }}</span>
            <span class="subtitle" v-if="item.number">{{ item.number }}</span>
        </div>
    </div>

    <div class="errorMessages">
        <span v-for="(error, index) in errorMessages" :key="index">{{ error }}</span>
    </div>
</template>

<style scoped lang="scss">
h2 {
    margin-bottom: 1rem;
}
h3 {
    margin-bottom: 0.8rem;
}

.form-block {
    border: 1px solid rgba($color: #000000, $alpha: 0.2);
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;

    form {
        display: flex;
        flex-direction: column;

        width: 100%;
        max-width: 24rem;

        input {
            margin-bottom: 1rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.list {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 20rem;

    .item {
        display: flex;
        flex-direction: column;

        border: 1px solid rgba($color: #000000, $alpha: 0.25);
        margin-bottom: 1rem;

        & > * {
            padding: 0.3rem 0.8rem;

            border-bottom: 1px solid rgba($color: #000000, $alpha: 0.15);
        }
        .title {
            font-size: 1.2rem;
            margin-bottom: 0.2rem;
        }
        .subtitle {
            font-size: 1rem;
        }
    }
}

.errorMessages {
    color: red;
}
</style>
