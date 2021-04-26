import {FastifyRequest} from 'fastify' ;



export type  ArticleBodyRequest = FastifyRequest <{

    Body: {
        title : string
        content : string
        status: string
    }
}>


export type  ArticleParamRequest = FastifyRequest <{

    Params : {
        id : string
    }
}>


export type ArticleWithRequestBodyAndParams  = ArticleBodyRequest & ArticleParamRequest