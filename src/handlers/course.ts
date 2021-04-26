import Courses from '../models/Courses'

import {CoursesSchema} from '../types/models/Courses'
import {CoursesSchemaWithDocument}from '../models/Courses/schema'
import {CourseBodyRequest,CourseParamRequest,CourseWithRequestBodyAndParams ,CourseListWithRequestBodyAndParams} from '../types/handlers/course' 


export const  handleCreateCourse = async (request : CourseBodyRequest) :Promise<CoursesSchemaWithDocument> => {
    const {faculty,major,year,totalCredit,courseList } = request.body ;
    const newcourse = Courses.createCourse({faculty,major,year,totalCredit,courseList})
    return newcourse
}

export const  handleGetCourseList = async (request : CourseBodyRequest) :Promise<CoursesSchema[]> => {

    const courses = await Courses.getCourseList()
    return courses
}
export const  handleGetCourseByID = async (request : CourseParamRequest):Promise<CoursesSchema> => {

    const {id} = request.params
    const course = await Courses.getCourseByID(id)
    return course

}
export const  handleUpdateCourse = async (request : CourseWithRequestBodyAndParams) :Promise<string> => {

    const {id} = request.params
    const {faculty , major ,year ,totalCredit,courseList} =request.body

    await Courses.updateCourseByID(id , {faculty,major,year,totalCredit,courseList} )

    return "OK"
}


export const handleUpdateCourseListByID = async (request : CourseListWithRequestBodyAndParams) :Promise<string> => {

    const {id ,clid} = request.params
    const {subjectList ,selectNum, totalCredit } = request.body

    await Courses.updateCourseListByID (id ,clid, {subjectList,selectNum, totalCredit} )

    return "OK"
}



export const  handleDeleteCourse = async (request : CourseParamRequest)  :Promise<string> => {

    const {id} = request.params
    await Courses.deleteCourseByID(id)
    return 'Deleted'
}



export default  {
    handleCreateCourse ,
    handleGetCourseList ,
    handleGetCourseByID,
    handleUpdateCourse,
    handleUpdateCourseListByID,
    handleDeleteCourse
}