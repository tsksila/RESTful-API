
import { ArticlesSchema } from '../../types/models/Articles'
import customError from '../../utils/custom-error'
import ArticalError from '../../errors/articles'
import Articals ,{ArticlesSchemaWithDocument } from './schema'



export const createNewArticle = async (doc : ArticlesSchema) : Promise<ArticlesSchemaWithDocument> =>{

   const article =   new Articals(doc)

   return article.save()
}


export const getArticles = async (condition : object = {}) : Promise <ArticlesSchema[]> => {
    const articles = Articals 
    .find ({
        ...condition ,
        status:'active'
    })
    .sort({
        createAt:-1
    })
    .lean<ArticlesSchema[]> ()
    return articles

}

export const getArticlesByID = async (articleID : string) :Promise<ArticlesSchema> => {
  try {
      
    const article = await Articals 
    .findOne ( {
        _id : articleID,
        status : 'active'
    })
    .lean<ArticlesSchema>()


    if(!article) {
        customError(ArticalError.ArticleIdInvalId)
    }

    return article

  } catch (error) {

    console.log(error)
    if(error.kind === 'ObjectId') {
        customError(ArticalError.ArticleIdInvalId)
    }else if (error.name === 'CustomError') {
        return error
    }
   return customError(ArticalError.ArticleSomethingWentWrong)
      
  }

} 


export const updateArticlesByID = async (articleID : string ,doc : ArticlesSchema) :Promise<boolean> => {
    
   try {
       Object.keys(doc).filter(key => doc[key] ?? delete doc[key])
        
       const result = await Articals
       .updateOne({
           _id : articleID ,
           status: {
              // $in:['active' , 'inactive']  
                $ne :'deleted'  // not equal
           }
       },{
           $set : {
               ...doc
           }
       })

    // return mongo object like 
    //   {
    //       n:1 ,
    //       nModified:1 ,  false edit  return 0
    //       ok :1
    //   }

       if(!result.nModified)  {
           return customError(ArticalError.ArticleCantUpdate)
       }  


       return true

   } catch (error) {
        if(error.kind === 'ObjectId') {
            customError(ArticalError.ArticleIdInvalId)
        }else if (error.name === 'CustomError') {
            return error
        }
       return customError(ArticalError.ArticleSomethingWentWrong)
   } 

}


export const softDeleteArticleById = async(articleID : string) : Promise<boolean> => {

    try {
        await Articals 
        .findByIdAndUpdate(articleID , {
            $set : {
                status : 'deleted'
            }
        })

        return true
        
    } catch (error) {
        
        return customError(ArticalError.ArticleSomethingWentWrong)
    }

}


export default  {
    getArticles,
    getArticlesByID,
    createNewArticle,
    updateArticlesByID,
    softDeleteArticleById

}


