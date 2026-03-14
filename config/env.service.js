import dontenv from 'dotenv'
dontenv.config({path: './config/.env'})



const host = process.env.DB_HOST

const key = process.env.DB_KEY

const port = process.env.DB_PORT

const mood = process.env.DB_MOOD

const jwtKey = process.env.DB_JWT_KEY

const jwtAdminKey = process.env.DB_JWT_ADMIN_KEY

const jwtUserKey = process.env.DB_JWT_USER_KEY

const jwtRefreshTokenAdmin = process.env.JWT_REFRESH_TOKEN_ADMIN

const jwtRefreshTokenUser = process.env.JWT_REFRESH_TOKEN_USER

const redisUrl = process.env.REDIS_URL

const app_password = process.env.APP_PASSWORD

const app_email = process.env.APP_EMAIL

export {
    host , 
    key , 
    port , 
    mood , 
    jwtKey  , 
    jwtAdminKey ,
    jwtUserKey ,
    jwtRefreshTokenAdmin ,
    jwtRefreshTokenUser , 
    redisUrl ,
    app_password ,
    app_email
}