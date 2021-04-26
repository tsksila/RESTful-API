import {FastifyInstance} from 'fastify'
import {handleUserMe} from '../handlers/user'
import  {verifyAdminAccess}from '../hooks/auth'
import {} from '../models/Users'
 
const userRouters  = async (app : FastifyInstance) => {

    app.get('/me' , {
        preHandler :[
            verifyAdminAccess
        ]
    } ,handleUserMe )

}

export default  userRouters ;