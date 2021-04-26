

import Articles from '../models/Articles'
import {ArticleBodyRequest , ArticleParamRequest ,ArticleWithRequestBodyAndParams} from '../types/handlers/article'
import {ArticlesSchemaWithDocument} from '../models/Articles/schema'
import { ArticlesSchema } from '../types/models/Articles';


//import  customError from '../utils/custom-error'
//import {AuthJWTError} from '../errors/auth'


export const handleGetArticles= async (request : ArticleBodyRequest):Promise <ArticlesSchema[]>  =>{

    //const {condition} = request.query
    const articles = await Articles.getArticles()

    return articles
}

export const handleGetArticlesByID = async (request : ArticleParamRequest):Promise <ArticlesSchema> =>{

    const {id} = request.params
    const articles = await Articles.getArticlesByID(id)

    return articles
}

export const handleCreateNewArticles= async (request : ArticleBodyRequest) : Promise <ArticlesSchemaWithDocument> =>{

    const {userID} = request
    const {title,content,status} =  request.body
 
    const article = await Articles.createNewArticle ({
        title,
        content ,
        status : status ?? 'active' ,
        author : userID
    })
 
     return article
}

export const handlePathUpdateArticlesByID = async (request : ArticleWithRequestBodyAndParams) : Promise<string> =>{

    const {id} = request.params
    const {userID} = request
    const {title , content , status} = request.body


    await Articles.updateArticlesByID( id , {
        title ,
        content ,
        status : status ?? 'active',
        author : userID
    })

    return 'OK'
}


export const handleDeleteArticlesByID = async (request : ArticleParamRequest): Promise<string> =>{
    const {id} = request.params
    await Articles.softDeleteArticleById(id)
    return 'OK'
}

export default {
    handleGetArticles,
    handleGetArticlesByID,
    handleCreateNewArticles,
    handlePathUpdateArticlesByID,
    handleDeleteArticlesByID
}
