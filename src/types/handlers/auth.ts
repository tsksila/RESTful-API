import {FastifyRequest} from 'fastify' ;



export type  AuthLoginBodyRequest = FastifyRequest <{

    Body: {
        email : string
        password : string
    }
}>

export type AuthRegisterBodyRequest = FastifyRequest <{

    Body : {
        email : string
        password : string 
        fullname : string 
        studentID : string
        admin : boolean
    }
}>


export interface AuthLoginBodyResponse {
    id : string
    email : string 
    fullname : string
    studentID : string
    admin : boolean
    accessToken ? : string
}

export interface AuthRefreshTokenRespone {
    accessToken:string
}