import * as dotenv from 'dotenv'


dotenv.config()
const  config =  {

   /**  default is .env */ 
    env : process.env.NODE_ENV || 'development' ,
    port : process.env.PORT || 3000 ,
    mongodb : {
        uri : process.env.MONGO_URI 
    },
    secret : {
        accessToken : process.env.SECRET_ACCESS_TOKEN
    }

}

export default  config ;
