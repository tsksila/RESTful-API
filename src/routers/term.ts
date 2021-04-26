import {FastifyInstance} from 'fastify'
import  {verifyAdminAccess , verifyAccessToken}from '../hooks/auth'

import termHandles from '../handlers/term'

 
const courseRouters  = async (app : FastifyInstance) => {

    const preHandler = [verifyAdminAccess]


     app.post('/' , {preHandler} , termHandles.handleCreateNewTerm )
     app.get('/' , { preHandler :[ verifyAccessToken ]} , termHandles.handleGetTermList)
     app.get('/:id' , { preHandler :[ verifyAccessToken ]} ,termHandles.handleGetTermByID )
     app.patch('/:id' , {preHandler} ,  termHandles.handleUpdateTermByID)
     app.delete('/:id' , {preHandler} , termHandles.handleDeletedTermByID )
    


}

export default  courseRouters  ;