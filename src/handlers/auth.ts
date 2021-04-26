import {AuthLoginBodyRequest, AuthRegisterBodyRequest ,AuthLoginBodyResponse, AuthRefreshTokenRespone} from '../types/handlers/auth'
import Users from '../models/Users'
import {UsersSchemaWithDocument} from '../models/Users/schema'
import { FastifyRequest } from 'fastify'




export const handleLogin =  async (request : AuthLoginBodyRequest ):Promise<AuthLoginBodyResponse> => {
     const {email , password } = request.body
    
     const user =  await Users.userLogin(email ,password)

    return user ;
}

export const handleRegister = async (request : AuthRegisterBodyRequest ) :Promise<UsersSchemaWithDocument> =>{
    const {email , password ,fullname ,studentID ,admin} = request.body 

    const user = Users.createNewUser({
        email ,
        password,
        fullname,
        studentID,
        admin : admin ?? false
    })

    return user
}

export const handleRefreshToken = async (request :FastifyRequest ) : Promise<AuthRefreshTokenRespone> => {
    const  {userID ,admin} = request ;

    const accessToken = Users.generateAccessToken(userID ,admin)

    const response : AuthRefreshTokenRespone = {
        accessToken
    }

    return response
}

export default  {
    handleLogin ,
    handleRegister,
    handleRefreshToken
}