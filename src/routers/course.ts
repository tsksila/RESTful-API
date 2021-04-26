import {FastifyInstance} from 'fastify'
import  {verifyAdminAccess , verifyAccessToken}from '../hooks/auth'

import courseHandles from '../handlers/course'

 
const courseRouters  = async (app : FastifyInstance) => {

    const preHandler = [verifyAdminAccess]


     app.post('/' , {preHandler} , courseHandles.handleCreateCourse )
     app.get('/' , { preHandler :[ verifyAccessToken ]} , courseHandles.handleGetCourseList)
     app.get('/:id' , { preHandler :[ verifyAccessToken ]} ,courseHandles.handleGetCourseByID )
     app.patch('/:id' , {preHandler} ,  courseHandles.handleUpdateCourse )
     app.patch('/:id/:clid' ,{preHandler} , courseHandles.handleUpdateCourseListByID )
     app.delete('/:id' , {preHandler} , courseHandles.handleDeleteCourse  )
    


}

export default  courseRouters  ;