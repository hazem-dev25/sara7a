import multer  from "multer";
import fs from 'node:fs'







export const multerSend = ({custompath} = {custompath: 'general'})=>{
    const storage = multer.diskStorage({
        destination: function(req , file , cb){
            let filePath = `uploads/${custompath}`
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath , {recursive: true})
            }

            cb(null , filePath )
        } ,

        filename: function(req ,file , cb){
           let prefix = Date.now()
           let fileName = `${prefix}_${file.originalname}`

            cb(null , fileName)
        }
    })
    return multer({storage})
}


