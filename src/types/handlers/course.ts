import {FastifyRequest} from 'fastify' ;



export type  CourseBodyRequest = FastifyRequest <{

    Body: {
        faculty : string
        major : string
        year : string
        totalCredit: number
        courseList  : Array<{
            subjectList : Array <{subjectID : string}>
            selectNum :Number ,
            totalCredit : Number
        }>
    }
}>


export type CourseListBodyRequest = FastifyRequest <{
        
    Body : {
        subjectList :Array <{subjectID : string}>
        selectNum : Number ,
        totalCredit : Number
    }
}>

export type   CourseParamRequest = FastifyRequest <{

    Params : {
        id : string
        clid : string
    }
}>





export type  CourseWithRequestBodyAndParams  = CourseBodyRequest &  CourseParamRequest

export type  CourseListWithRequestBodyAndParams  = CourseListBodyRequest &  CourseParamRequest