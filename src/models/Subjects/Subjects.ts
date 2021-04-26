import Subject ,{SubjectsSchemaWithDocument } from './schema'
import { SubjectsSchema} from '../../types/models/Subjects'
import customError from '../../utils/custom-error'
import SubjectError from '../../errors/subject'




export const createNewSubject = async (doc : SubjectsSchema) : Promise<SubjectsSchemaWithDocument> =>{

   const subject = new Subject(doc)

   return subject.save()
}

export const getSubjectList = async (condition : object = {}) : Promise <SubjectsSchema[]> => {

    const subjects =  Subject
    .find ({
        ...condition ,
    })
    .sort({
        createAt:-1
    })
    .lean<SubjectsSchema[]> ()
    return subjects

}


export const getSubjectByID = async (SubjectID : string) :Promise<SubjectsSchema> => {
    try {
        
      const subject = await Subject
      .findOne ( {
          _id : SubjectID,
      })
      .lean<SubjectsSchema>()
  
  
      if(!subject) {
          customError(SubjectError.SubjectIdInvalId)
      }
  
      return  subject
  
    } catch (error) {
  
      if(error.kind === 'ObjectId') {
          customError(SubjectError.SubjectIdInvalId)
      }else if (error.name === 'CustomError') {
          return error
      }
     return customError(SubjectError.SubjectSomethingWentWrong)
        
    }
  
  } 



  export const updateSubjectByID = async (SubjectID : string ,doc : SubjectsSchema) :Promise<boolean> => {
    
    try {
        Object.keys(doc).filter(key => doc[key] ?? delete doc[key]) 
         
        const result = await Subject
        .updateOne({
            _id : SubjectID ,
        },{
            $set : {
                ...doc
            }
        })

        if(!result.nModified)  {
            return customError(SubjectError.SubjectCantUpdate)
        }  
 
 
        return true
 
    } catch (error) {
         if(error.kind === 'ObjectId') {
             customError(SubjectError.SubjectIdInvalId)
         }else if (error.name === 'CustomError') {
             return error
         }
        return customError(SubjectError.SubjectSomethingWentWrong)
    } 
 
 }

 export const deleteSubjectById = async(subjectID : string) : Promise<boolean> => {

    try {
        await Subject
        .deleteOne({
            _id:subjectID
        })

        return true
        
    } catch (error) {
        
        return customError(SubjectError.SubjectSomethingWentWrong)
    }

}



export default  {

    createNewSubject,
    getSubjectList,
    getSubjectByID,
    updateSubjectByID,
    deleteSubjectById

}


