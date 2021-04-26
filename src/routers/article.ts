import {FastifyInstance} from 'fastify'
import articleHandlers from '../handlers/article'
import  {verifyAccessToken}from '../hooks/auth'
import {} from '../models/Users'
 
const articleRouters  = async (app : FastifyInstance) => {
    const preHandler = [verifyAccessToken]


    app.post('/' , { preHandler } ,articleHandlers.handleCreateNewArticles)
    app.get('/' , { preHandler } ,articleHandlers.handleGetArticles )
    app.get('/:id' , { preHandler } ,articleHandlers.handleGetArticlesByID )
    app.patch('/:id' , { preHandler } ,articleHandlers.handlePathUpdateArticlesByID )
    app.delete('/:id' , { preHandler } ,articleHandlers.handleDeleteArticlesByID )
    
}

export default  articleRouters ;