import { Schema, Document, model } from 'mongoose'
import { ArticlesSchema } from '../../types/models/Articles'

const collection = 'Articles'

export interface ArticlesSchemaWithDocument extends ArticlesSchema , Document {
 // add more field
}

const articlesSchema = new Schema  ({
    title :  {
        type : 'string', 
        required : true 
    },
    content :  {
        type : 'string', 
        required : true 
    },
    author : {
        type : Schema.Types.ObjectId ,
        ref : 'Users' ,
        required : true
    },
    status: {
        type: 'string' ,
        default : 'active' ,
        enum:['active','inactive','deleted']
    }
   
    
},{
    collection ,
    versionKey : false ,
    timestamps : true // create at update at
})

export default  model<ArticlesSchemaWithDocument>(collection , articlesSchema)