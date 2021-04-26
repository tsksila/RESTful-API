
import { CoursesSchema } from '../../types/models/Courses'
import { Schema, Document, model } from 'mongoose'


const collection  = 'Courses' 

export interface CoursesSchemaWithDocument extends CoursesSchema , Document  {
}

const  courseSchema = new Schema( {
    
    faculty : {
        type : String ,
        required : true
    },
    major : {
        type : String,
        required : true 
    },
    year : {
        type : String ,
        required : true
    },
    totalCredit : {
        type : Number ,
        required :true ,
        min : 0 ,
        max : 200
    } ,
    courseList : [{
         subjectList : [{
             subjectId: { type : Schema.Types.ObjectId ,ref:"Subjects"  ,unique : true } 
         }] ,  
         selectNum:{type :Number , default : "1"  , min: 0 ,required : true },  // subjectList and selectNum = 0  free Elective
         totalCredit : {type : Number ,  default : "3"  , min: 0 ,required : true } 
    }]

},{
    collection ,
    versionKey : false ,
    timestamps : true // create at update at
})


export default model<CoursesSchemaWithDocument>(collection, courseSchema)