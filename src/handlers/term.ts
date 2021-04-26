
import Terms from "../models/Terms";
import { TermsSchemaWithDocument } from "../models/Terms/schema";
import { TermBodyRequest, TermParamRequest, TermWithRequestBodyAndParams } from "../types/handlers/term";
import { TermsSchema } from "../types/models/Terms";





export const handleCreateNewTerm = async (request : TermBodyRequest) :Promise<TermsSchemaWithDocument> => {


    const {year , term ,openSubject } = request.body

    const result = await Terms.CreateNewTerm({
        year, term , openSubject
    })


    return result

}

export const handleGetTermList = async (request : TermBodyRequest) :Promise<TermsSchema[]> => {

    const  terms = await Terms.GetTermList()
    return terms
}
export const handleGetTermByID = async (request : TermParamRequest) :Promise<TermsSchema> => {

    const {id} = request.params
    const result = Terms.GetTermByID(id) 
    return result

}
export const handleUpdateTermByID = async (request : TermWithRequestBodyAndParams) :Promise<String> => {

    const {id} = request.params
    const {year,term,openSubject} = request.body
    await Terms.UpdateTermByID(id , {year , term , openSubject})

    return "Updated"
}
export const handleDeletedTermByID = async (request : TermParamRequest) :Promise<string> =>{

    const {id} = request.params
    await Terms.DeleteCourseByID(id)

    return "Deleted"
    
}

export default {
    handleCreateNewTerm ,
    handleGetTermList,
    handleGetTermByID ,
    handleUpdateTermByID ,
    handleDeletedTermByID
}