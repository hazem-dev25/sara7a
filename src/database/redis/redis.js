import { createClient } from "redis"
import { redisUrl } from "../../../config/index.js";

export const client = createClient({
  url: redisUrl
});



export const connectionRedis = async ()=>{
    try {
        await client.connect()
    console.log('redis is connected')
    } catch (error) {
        console.log('redis is not connected')
    }
}