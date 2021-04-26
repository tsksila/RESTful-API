
import {SubjectBodyRequest , SubjectParamRequest ,SubjectWithRequestBodyAndParams} from '../types/handlers/subject'
import {SubjectsSchemaWithDocument} from '../models/Subjects/schema'
import {SubjectsSchema} from '../types/models/Subjects'
import Subjects  from '../models/Subjects/Subjects'


export const  handleCreateNewSubject = async (request : SubjectBodyRequest)  : Promise <SubjectsSchemaWithDocument> => {


        const {shortname , fullname,credit} =  request.body
     
        const subject = await Subjects.createNewSubject({
            shortname ,
            fullname ,
            credit 
        })
     
        return subject
    
    

}

export const  handleGetSubjectList = async (request : SubjectBodyRequest) :Promise <SubjectsSchema[]> => {

        const subjects = await  Subjects.getSubjectList()
        return subjects 

}

export const  handleGetSubjectByID = async (request : SubjectParamRequest) :Promise <SubjectsSchema> => {

        const {id} = request.params

        const subject = await Subjects.getSubjectByID(id)

         return subject

}

export const  handleUpdateSubjectByID = async (request : SubjectWithRequestBodyAndParams) : Promise<string> => {


    const {id} = request.params
    const {shortname, fullname , credit} = request.body


    await Subjects.updateSubjectByID( id , {
        shortname ,
        fullname ,
        credit
    })

    return 'OK'

}

export const  handleDeleteSubjectLByID = async (request :SubjectParamRequest) : Promise<String> => {

    const {id} = request.params
    await Subjects.deleteSubjectById(id)

    return 'OK'

}

export default {

    handleCreateNewSubject,
    handleGetSubjectList,
    handleGetSubjectByID,
    handleUpdateSubjectByID,
    handleDeleteSubjectLByID
}




