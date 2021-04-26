import fastify , {FastifyServerOptions} from 'fastify'
import fastifyCors from 'fastify-cors'
import authRouters from './routers/auth'
import userRouters from './routers/user'
import articleRouters from './routers/article'
import subjectRouters from './routers/subject'
import courseRouters from './routers/course'
import termRouters from './routers/term'
import { CustomError } from './utils/custom-error'


declare module 'fastify' {
    interface FastifyRequest {
        userID ? :string
        admin ?:boolean
    }
}

const buildApp = (options : FastifyServerOptions) => {

 const app = fastify(options)

 app.register(fastifyCors)
 app.get('/' , async () => 'OK')
 app.register(authRouters , {prefix :'/auth'})
 app.register(userRouters ,{prefix :'/users'})
 app.register(articleRouters ,{prefix :'/articles'})
 app.register(subjectRouters ,{prefix :'/subject'})
 app.register(courseRouters ,{prefix :'/course'})
 app.register(termRouters ,{prefix :'/term'}  )


 app.setErrorHandler ((error , req , res ) => {
    const customError : CustomError = error

    res
    .status(customError.statusCode ?? 500)
    .send({
        error : {
            message:customError.message ,
            code : customError.code,
            data : customError.data
        }
    })
 } )


 return app ;
}

export default  buildApp ;