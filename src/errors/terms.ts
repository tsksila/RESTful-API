import {CustomErrorParams} from '../utils/custom-error'



export  const SomethingWentWrong : CustomErrorParams = {

    message : 'Something went wrong'  ,
    code : 'TRM000' ,
    statusCode : 400
}

export  const IdInvalId : CustomErrorParams = {

    message : 'Object ID invalid'  ,
    code : 'TRM001' ,
    statusCode : 400
}

export  const CantUpdate : CustomErrorParams = {

    message : 'Update false'  ,
    code : 'TRM002' ,
    statusCode : 400
}



export default {
    CantUpdate,
    IdInvalId,
    SomethingWentWrong
}