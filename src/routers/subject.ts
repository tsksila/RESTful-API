import {FastifyInstance} from 'fastify'
import subjectHandler from '../handlers/subject'
import  {verifyAdminAccess , verifyAccessToken}from '../hooks/auth'

 
const subjectRouters  = async (app : FastifyInstance) => {

    const preHandler = [verifyAdminAccess]


     app.post('/' , {preHandler} ,  subjectHandler.handleCreateNewSubject )
     app.get('/' , { preHandler :[ verifyAccessToken ]} ,subjectHandler.handleGetSubjectList )
     app.get('/:id' , { preHandler :[ verifyAccessToken ]} ,  subjectHandler.handleGetSubjectByID )
     app.patch('/:id' , {preHandler} ,  subjectHandler.handleUpdateSubjectByID )
     app.delete('/:id' , {preHandler} ,  subjectHandler.handleDeleteSubjectLByID )


}

export default  subjectRouters ;