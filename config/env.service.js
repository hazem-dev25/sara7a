import dontenv from 'dotenv'
dontenv.config({path: './config/.env'})



const host = process.env.DB_HOST

const key = process.env.DB_KEY

const port = process.env.DB_PORT

const mood = process.env.DB_MOOD

const jwtKey = process.env.DB_JWT_KEY



export {
    host , 
    key , 
    port , 
    mood , 
    jwtKey 
}