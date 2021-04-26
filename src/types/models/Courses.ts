
export interface CoursesSchema {

    faculty  : string 
    major : string
    year : string 
    totalCredit : Number
    courseList  : Array<CourseListData>
}

export interface CourseListData  {
    subjectList : Array <{ subjectID : string }>
    selectNum :Number 
    totalCredit : Number
}