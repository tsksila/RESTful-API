import {CustomErrorParams} from '../utils/custom-error'



export  const ArticleSomethingWentWrong : CustomErrorParams = {

    message : 'Something went wrong'  ,
    code : 'ART000' ,
    statusCode : 400
}

export  const ArticleIdInvalId : CustomErrorParams = {

    message : 'Object ID invalid'  ,
    code : 'ART001' ,
    statusCode : 400
}

export  const ArticleCantUpdate : CustomErrorParams = {

    message : 'Update false'  ,
    code : 'ART002' ,
    statusCode : 400
}



export default {
    ArticleIdInvalId,
    ArticleSomethingWentWrong,
    ArticleCantUpdate 
}