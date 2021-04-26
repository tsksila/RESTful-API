import {FastifyRequest} from 'fastify' ;



export type  TermBodyRequest = FastifyRequest <{

    Body: {
        year: Number 
        term : String
        openSubject : Array <{
            subjectID : String 
            teacher :String
            timeTable:Array<{
                stime:Number
                etime:Number
                room : String
                day : String
                description : String
            }>
        }>
    }
}>


export type  TermParamRequest = FastifyRequest <{

    Params : {
        id : string
    }
}>


export type TermWithRequestBodyAndParams  =TermBodyRequest & TermParamRequest