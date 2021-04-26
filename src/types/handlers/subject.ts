import {FastifyRequest} from 'fastify' ;



export type  SubjectBodyRequest = FastifyRequest <{

    Body: {
        shortname : string
        fullname : string
        credit: number
    }
}>


export type  SubjectParamRequest = FastifyRequest <{

    Params : {
        id : string
    }
}>


export type SubjectWithRequestBodyAndParams  =SubjectBodyRequest & SubjectParamRequest