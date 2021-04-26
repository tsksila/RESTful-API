import {CustomErrorParams} from '../utils/custom-error'



export  const CourseSomethingWentWrong : CustomErrorParams = {

    message : 'Something went wrong'  ,
    code : 'COS000' ,
    statusCode : 400
}

export  const CourseIdInvalId : CustomErrorParams = {

    message : 'Object ID invalid'  ,
    code : 'COS001' ,
    statusCode : 400
}

export  const CourseCantUpdate : CustomErrorParams = {

    message : 'Update false'  ,
    code : 'COS002' ,
    statusCode : 400
}



export default {
    CourseCantUpdate,
    CourseIdInvalId,
    CourseSomethingWentWrong
}