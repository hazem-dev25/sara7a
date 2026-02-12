import express from 'express'
import { connectionDB } from './database/index.js'
import { router } from './modules/users/user.controller.js'
import { port } from '../config/index.js'
import { globalErrorHandler } from './common/utils/reseponce/index.js'


export const bootstrab = async ()=>{
    const app = express()
    
    app.use(express.json())

    app.use(router)

    app.use(globalErrorHandler)

    app.use('{$dummy}' , (req , res)=>{
        res.json({message: "invalid route"})
    })

    await connectionDB()

    app.listen(port , ()=>{
        console.log('server is running succ')
    })
}