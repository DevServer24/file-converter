import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import SignUpController from './controllers/sign-up.controllers'
import SignInController from './controllers/sign-in.controller'
dotenv.config()





const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors({




    origin: 'https://file-converter-nine.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']  // other headers you might want to allow

    

}))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/sign-up',SignUpController)
app.post('/sign-in', SignInController)

app.listen(port,() =>{
   
    console.log(`Server is running on port ${port}`)
})



export {app}