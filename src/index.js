import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import indexRouter from './router/index.js'
const app= express()

const __dirname= dirname(fileURLToPath(import.meta.url))
console.log(join(__dirname , 'views'))
app.set('views', join(__dirname,'views'))
app.use(indexRouter)

app.use(express.static(join(__dirname,'public')))

//D:\Movies_app\src\views

app.set('view engine', 'ejs')



app.listen(3000)
console.log("El servidor está siendo escuchado en el puerto: ",3000)