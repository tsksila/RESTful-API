
import Course , {CoursesSchemaWithDocument} from './schema'
import customError from '../../utils/custom-error'
import CourseError from '../../errors/courses'
import { CoursesSchema , CourseListData  } from '../../types/models/Courses'


export const  createCourse = async (doc : CoursesSchema) : Promise<CoursesSchemaWithDocument> => {

    const course = new Course(doc) 
    return course.save()
}

export const getCourseList = async (condition : object = {}) : Promise <CoursesSchema[]> => {

    const courses =  Course
    .find ({
        ...condition ,
    })
    .sort({
        createAt:-1
    })
    .lean<CoursesSchema[]> ()
    return courses

}


export const getCourseByID = async (CourseID : string) :Promise<CoursesSchema> => {
    try {
        
      const course = await Course
      .findOne ( {
          _id : CourseID,
      })
      .lean<CoursesSchema>()
  
  
      if(! course) {
          customError(CourseError.CourseIdInvalId)
      }
  
      return  course
  
    } catch (error) {
  
      if(error.kind === 'ObjectId') {
          customError(CourseError.CourseIdInvalId)
      }else if (error.name === 'CustomError') {
          return error
      }
     return customError(CourseError.CourseSomethingWentWrong)
        
    }
  
} 

export const updateCourseByID = async (CourseID : string ,doc : CoursesSchema) :Promise<boolean> => {
    
    try {
        Object.keys(doc).filter(key => doc[key] ?? delete doc[key]) 
         
        const result = await Course
        .updateOne({
            _id : CourseID ,
        },{
            $set : {
                ...doc
            }
        })

        if(!result.nModified)  {
            return customError(CourseError.CourseCantUpdate)
        }  
 
 
        return true
 
    } catch (error) {
         if(error.kind === 'ObjectId') {
             customError(CourseError.CourseIdInvalId)
         }else if (error.name === 'CustomError') {
             return error
         }
        return customError(CourseError.CourseSomethingWentWrong)
    } 
 
 }

 
export const updateCourseListByID = async (CourseID : string ,CLID :string ,doc : CourseListData) :Promise<boolean> => {
    
    try {
        
        Object.keys(doc).filter(key => doc[key] ?? delete doc[key]) 

        interface courseResponse extends CourseListData  {
            _id : string 
        }

         
        const coursedata = await Course.findById(CourseID)

        const editData =    coursedata.courseList.filter((data: courseResponse)=> {
           return  data._id == CLID
        }) 

        const anotherData =  coursedata.courseList.filter((data: courseResponse)=> {
            return  data._id != CLID
         }) 

        editData.map((data) =>{

            doc.subjectList ?  data.subjectList = doc.subjectList : data.subjectList 
            doc.selectNum ? data.selectNum = doc.selectNum : data.selectNum 
            doc.totalCredit ? data.totalCredit = doc.totalCredit :  data.totalCredit

        })
        

        const result = await Course
        .updateOne({
            _id : CourseID ,
        },{
            $set : {
                courseList : [ editData[0] ,...anotherData]
            }
        })
 

         if(!result.nModified)  {
            return customError(CourseError.CourseCantUpdate)
        }   
 
        return true
 
    } catch (error) {
         if(error.kind === 'ObjectId') {
             customError(CourseError.CourseIdInvalId)
         }else if (error.name === 'CustomError') {
             return error
         }
        return customError(CourseError.CourseSomethingWentWrong)
    } 
 
 }


 

 export const deleteCourseByID = async(courseID : string) : Promise<boolean> => {

    try {
        await Course
        .deleteOne({
            _id:courseID
        })

        return true
        
    } catch (error) {
        
        return customError(CourseError.CourseSomethingWentWrong)
    }

}




export default  {
    createCourse,
    getCourseList,
    getCourseByID,
    updateCourseByID,
    updateCourseListByID,
    deleteCourseByID
    

}