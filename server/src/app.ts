import express, { Request, Response } from 'express';
import cors from 'cors'

import searchUsers from "./functions/searchUsers"


// Порт
const PORT = 3001

// Задержка запросов (ms)
const DELAY = 5000

// Инициализация
const app = express();


// Использовать JSON
app.use(express.json()) 


// Использовать CORS
const WHITELIST = [
    'http://localhost:3000', 
    'http://localhost:5173', 
    //https://..
]
const corsOptions = {
    credentials: true,

    origin: function(origin, callback) {
        if (WHITELIST.indexOf(origin) !== -1 || !origin) { // !origin если запрос с того же источника, на котором находится скрипт
            callback(null, true)
        } else {
            callback(new Error(`Not allowed by CORS`))
        }
    }
}
app.use(cors(corsOptions));


// Роуты
app.get('/', async (req: Request, res: Response) => {
    // @ts-ignore
    res.end('Welcome to API')
})

app.post('/api/search', (req: Request, res: Response) => {
    //Задержка перед выполнением
    setTimeout(() => {
        searchUsers(req, res) 
    }, DELAY);
});


// Слушать порт
app.listen(PORT);