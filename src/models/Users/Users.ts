import * as jwt from 'jsonwebtoken'
import * as bcrypt  from 'bcrypt'
import {UsersSchema} from '../../types/models/Users'
import Users , {UsersSchemaWithDocument} from './schema'
import customError from '../../utils/custom-error'
import authError from '../../errors/auth'
import config from '../../config'
import { AuthLoginBodyResponse } from '../../types/handlers/auth'


const generateHashPassword =  (password: string ) : string =>{ 

    const salt = bcrypt.genSaltSync(10) ;
    const hashPassword = bcrypt.hashSync(password , salt)
    return hashPassword ;

} 

const comparePassword = (password : string , existsPassword :string) :boolean => {
    
    const isPasswordCorrect = bcrypt.compareSync(password,existsPassword)
    if(!isPasswordCorrect) {
        customError(authError.AuthInvalidPassword)
    }
    return true ;
}

const generateAccessToken = (userID :string , admin:boolean) : string => {
    const token = jwt.sign({admin : admin} , config.secret.accessToken  , {
        expiresIn :'1d' ,
        audience : String(userID)
    })

    return token 
}


const mapUserResponseObject = (userID :string , user: UsersSchemaWithDocument ,accessToken ? :string) : AuthLoginBodyResponse => {
    const response : AuthLoginBodyResponse = {
        id :userID ,
        email : user.email ,
        fullname : user.fullname ,
        studentID : user.studentID ,
        admin : user.admin ,
        accessToken
    }

    return response
}



export const createNewUser  = async (doc : UsersSchema) :Promise<UsersSchemaWithDocument>  => {
    doc.password = generateHashPassword(doc.password) ;
    const user = new Users(doc)

    return  user.save()
}

export const userLogin = async (email : string , password :string ) : Promise<AuthLoginBodyResponse>  => {
     

    const user = await Users.findOne({email})

    if(!user) {
        customError(authError.AuthInvalidUsername)
    }

    comparePassword(password , user.password )
    const accessToken = generateAccessToken(user._id , user.admin )
    const response : AuthLoginBodyResponse = mapUserResponseObject(user._id , user ,accessToken)
    

    return response 

}

export const getUserById = async (userID :string) :Promise <AuthLoginBodyResponse> => {

    const user = await Users.findById(userID) 

    const response : AuthLoginBodyResponse = mapUserResponseObject(userID , user )

    return response 
}

export default  {
    createNewUser ,
    userLogin ,
    getUserById,
    generateAccessToken
}