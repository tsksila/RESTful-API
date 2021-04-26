import { Schema, Document, model } from 'mongoose'
import { UsersSchema } from '../../types/models/Users'

const collection = 'Users'

export interface UsersSchemaWithDocument extends UsersSchema , Document {
 // add more field
}

const usersSchema = new Schema  ({
    email :  {
        type : String, 
        unique : true ,
        required : true 
    },
    password :  {
        type : String, 
        required : true 
    },
    fullname : {
        type : String,
        required : true  
    },
    studentID :  {
        type : String, 
        unique : true ,
    },
    admin : {
        type : Boolean,
        default : false ,
       
    }
    
},{
    collection ,
    versionKey : false ,
    timestamps : true // create at update at
})

export default  model<UsersSchemaWithDocument>(collection , usersSchema)