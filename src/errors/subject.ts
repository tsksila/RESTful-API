import {CustomErrorParams} from '../utils/custom-error'



export  const SubjectSomethingWentWrong : CustomErrorParams = {

    message : 'Something went wrong'  ,
    code : 'SUBJ000' ,
    statusCode : 400
}

export  const SubjectIdInvalId : CustomErrorParams = {

    message : 'Object ID invalid'  ,
    code : 'SUBJ001' ,
    statusCode : 400
}

export  const SubjectCantUpdate : CustomErrorParams = {

    message : 'Update false'  ,
    code : 'SUBJ002' ,
    statusCode : 400
}



export default {
    SubjectCantUpdate,
    SubjectIdInvalId,
    SubjectSomethingWentWrong
}