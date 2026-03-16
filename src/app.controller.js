import express from 'express'
import { connectionDB } from './database/index.js'
import { router } from './modules/auth/auth.controller.js'
import {MessageRouter} from '../src/modules/messages/message.controller.js'
import { port } from '../config/index.js'
import { globalErrorHandler } from './common/utils/reseponce/index.js'
import {userRouter} from './modules/users/users.controller.js'
import { connectionRedis} from './database/redis/index.js'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'



export const bootstrab = async ()=>{
    const app = express()
    
    app.use(express.json())
    
    app.use(cors({
    origin: 'localhost:3000',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization' , 'form-data']
    }))
    app.use(rateLimit({
        windowMs: 1 * 60 * 1000, // minute
        limit: (req ,res)=>{
            console.log(req.ip)
            
            return 2 // 2 requests per minute per IP
        },
        statusCode: 500 ,
        legacyHeaders: false,
        message: 'Too many requests from this IP, please try again after a minute'
    }))
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
            }
        }
    }))

    app.use(router)
    app.use(MessageRouter)
    app.use(userRouter)
    
    await connectionDB()
    
    await connectionRedis()
    
    app.use('/uploads', express.static('uploads'))
    
    app.use('{$dummy}' , (req , res)=>{
        res.json({message: "invalid route"})
    })
    
    app.use(globalErrorHandler)

    app.listen(port , ()=>{
        console.log('server is running succ')
    })

    
}