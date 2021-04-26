export  interface TermsSchema {
    year : Number 
    term : String 
    openSubject : Array<SubjectInfo>
    

}
export interface SubjectInfo {
        subjectID: String
        teacher : String
        timeTable : Array <datetime>
}

export interface datetime {
        stime: Number
        etime: Number
        room : String
        day : String
        description : String
}