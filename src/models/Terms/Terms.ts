import Terms , {TermsSchemaWithDocument} from './schema'
import customError from '../../utils/custom-error'
import TermError from '../../errors/terms'
import {TermsSchema} from '../../types/models/Terms'



export const  CreateNewTerm = async (doc : TermsSchema ) : Promise <TermsSchemaWithDocument> => {

    const term = new Terms(doc)
    return term.save()

}

export const GetTermList = async (condition : object = {}) :Promise <TermsSchema[]> =>{

    const result = Terms
    .find({
        ...condition
    })
    .sort({
        createAt:-1
    })
    .lean<TermsSchema[]>()


    return result 
}

export const GetTermByID = async (TermID : string) : Promise <TermsSchema> =>{
 try {
     
    const result = await Terms
    .findOne({
        _id : TermID
    })
    .lean<TermsSchema>()

    if(! result ) {
        customError(TermError.IdInvalId)
    }

    return result

 } catch (error) {
     if(error.kind === 'ObjectId') {
        customError(TermError.IdInvalId)
     }else if (error.name === 'CustomError') {
         return error
     }
     return customError(TermError.SomethingWentWrong)
 }

}


export const UpdateTermByID =async (TermID : string , doc : TermsSchema ) : Promise <boolean> => {

    try {
        Object.keys(doc).filter(key => doc[key] ?? delete doc[key]) 

        const result = await Terms
        .updateOne({
            _id : TermID
        } , {
            $set : {
                ...doc
            }
        })

        if(!result.nModified) {
            return customError(TermError.CantUpdate)
        }
        
        return true

    } catch (error) {

        if(error.kind === 'ObjectId') {
            customError(TermError.IdInvalId)
        }else if (error.name === 'CustomError') {
            return error
        }
       return customError(TermError.SomethingWentWrong)
        
    }
    
}

export const DeleteCourseByID = async(TermID : string) :Promise <boolean> => {

    try {
        
        await Terms 
        .deleteOne({
            _id:TermID
        })

        return true

    } catch (error) {
        return customError(TermError.SomethingWentWrong)
    }
    
}




export default {
    CreateNewTerm ,
    GetTermList,
    GetTermByID,
    UpdateTermByID,
    DeleteCourseByID
}