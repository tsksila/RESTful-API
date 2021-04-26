import {SubjectsSchema} from '../../types/models/Subjects'
import { Schema, Document, model, } from 'mongoose'



const collection = "Subjects" 

export  interface SubjectsSchemaWithDocument extends  SubjectsSchema ,Document  {
}

const SubjectSchema = new Schema    ({

    shortname : {
        type : String ,
        unique : true ,
        required : true 
    } ,
    fullname :  {
        type : String ,
        required : true
    }
    ,
    credit : {
        type : Number ,
        required : true
    }

},{
    collection ,
    versionKey : false ,
    timestamps : true // create at update at
})

export default  model<SubjectsSchemaWithDocument>(collection , SubjectSchema)

