import {model ,Schema ,Document} from 'mongoose'
import {TermsSchema} from '../../types/models/Terms'


const collection = "Terms" 

export  interface TermsSchemaWithDocument extends TermsSchema , Document  {

}

const  TermSchema = new Schema ( {

    year : {
        type: Number,
        min : 2000
    },
    term : {
        type: String ,
        enum:['1','2','s']
    },
    openSubject: [{
                subjectID: {
                    type : Schema.Types.ObjectId ,
                    ref:"Subjects" ,
                    required:true
                },
                teacher : { type:String ,   required : true   },
                timeTable : [{
                    stime : {type:Number  ,min : 0, required : true},
                    etime : {type:Number  ,min : 0, required : true},
                    room : {type : String , required : true},
                    day :  {
                        type:String ,
                        enum:['Mon' ,'Tue' ,'Wed' ,'Thu' , 'Fri' ,'Sat','Sun'] ,
                        required : true
                    },
                    description : String

                }]
    }]


},{
    collection ,
    versionKey : false ,
    timestamps : true // create at update at
})


export  default   model<TermsSchemaWithDocument>(collection ,TermSchema)