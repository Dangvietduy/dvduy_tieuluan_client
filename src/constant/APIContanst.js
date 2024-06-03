export const ConstanstAPI = {
    LOGIN: {
        url: "http://localhost:8080/auth/login",
        method: "POST"
    },
    CHANGE_PASSWORD: {
        url: "http://localhost:8080/auth/password",
        method: "POST"
    },
    FORGET_PASSWORD: {
        url: "http://localhost:8080/auth/forgetpassword",
        method: "POST"
    },
    INFO_ACCOUNT_STUDENT: {
        url: "http://localhost:8080/student",
        method: "GET"
    },
    INFO_ACCOUNT_TEACHER: {
        url: "http://localhost:8080/teacher",
        method: "GET"
    },
    GET_LIST_STUDENT: {
        url: "http://localhost:8080/manager/liststudent",
        method: "GET"
    },
    GET_LIST_STUDENT_SEARCH: {
        url: "http://localhost:8080/manager/student/search",
        method: "POST"
    },
    GET_INFO_STUDENT: {
        url: "http://localhost:8080/student/infor",
        method: "GET"
    },
    INSERT_STUDENT: {
        url: "http://localhost:8080/manager/student",
        method: "POST"
    },
    UPDATE_STUDENT: {
        url: "http://localhost:8080/student/update",
        method: "PUT"
    },
    DELETE_STUDENT: {
        url: "http://localhost:8080/manager/student",
        method: "DELETE"
    },
    GET_LIST_INTERNSHIP: {
        url: "http://localhost:8080/student/internship/list",
        method: "GET"
    },
    GET_SEARCH_LIST_INTERNSHIP: {
        url: "http://localhost:8080/manager/intern/search",
        method: "POST"
    },
    CREATE_INTERNSHIP: {
        url: "http://localhost:8080/manager/intern",
        method: "POST"
    },
    UPDATE_INTERNSHIP: {
        url: "http://localhost:8080/manager/intern/update",
        method: "PUT"
    },
    CREATE_INTERNSHIP_STUDENT: {
        url: "http://localhost:8080/student/internshipStudent/create",
        method: "POST"
    },
    UPDATE_INTERNSHIP_STUDENT: {
        url: "http://localhost:8080/student/internshipStudent/update",
        method: "PUT"
    },
    DELETE_INTERNSHIP: {
        url: "http://localhost:8080/manager/internship/deleted",
        method: "DELETE"
    },
    GET_LIST_TEACHER: {
        url: "http://localhost:8080/manager/listteacher",
        method: "GET"
    },
    GET_SEARCH_LIST_TEACHER: {
        url: "http://localhost:8080/manager/teacher/search",
        method: "POST"
    },
    INFO_TEACHER: {
        url: "http://localhost:8080/manager/teacher",
        method: "GET"
    },
    GET_LIST_INTERNSHIP_TEACHER: {
        url: "http://localhost:8080/teacher/listInternship",
        method: "GET"
    },
    INSERT_TEACHER: {
        url: "http://localhost:8080/manager/teacher",
        method: "POST"
    },
    UPDATE_TEACHER: {
        url: "http://localhost:8080/teacher/update",
        method: "PUT"
    },
    DELETE_TEACHER: {
        url: "http://localhost:8080/manager/teacher",
        method: "DELETE"
    },
    GET_INFO_INTERNSHIP_STUDENT: {
        url: "http://localhost:8080/student/internshipStudent",
        method: "GET"
    },
    DELETE_INTERNSHIP_STUDENT: {
        url: "http://localhost:8080/student/internshipStudent",
        method: "DELETE"
    },
    GET_INFO_INTERNSHIP: {
        url: "http://localhost:8080/teacher/internship",
        method: "GET"
    },
    GET_EVALUATE_STUDENT: {
        url: "http://localhost:8080/student/evaluate",
        method: "GET"
    },
    GET_REPORT_STUDENT: {
        url: "http://localhost:8080/student/report",
        method: "GET"
    },
    DOWNLOAD_REPORT_STUDENT: {
        url: "http://localhost:8080/teacher/report/download",
        method: "GET"
    },
    POST_REPORT_STUDENT: {
        url: "http://localhost:8080/student/report",
        method: "POST"
    },
    DELETE_REPORT_STUDENT: {
        url: "http://localhost:8080/student/report",
        method: "DELETE"
    },
    GET_ATTENDANCE_STUDENT: {
        url: "http://localhost:8080/student/attendance",
        method: "GET"
    },
    GET_LIST_ATTENDANCE_STUDENT: {
        url: "http://localhost:8080/student/attendance/list",
        method: "GET"
    },
    CREATE_EVALUATE_STUDENT: {
        url: "http://localhost:8080/teacher/evaluate/create",
        method: "POST"
    },
    UPDATE_EVALUATE_STUDENT: {
        url: "http://localhost:8080/teacher/evaluate/update",
        method: "PUT"
    },
    GET_DATA_STATISTICAL: {
        url: "http://localhost:8080/manager/statistical",
        method: "POST"
    },
    GET_LIST_COMPANY: {
        url: "http://localhost:8080/manager/listcompany",
        method: "GET"
    },
    GET_LIST_COMPANY_SEARCH: {
        url: "http://localhost:8080/manager/company/search",
        method: "POST"
    },
    GET_INFO_COMPANY: {
        url: "http://localhost:8080/company/infor",
        method: "GET"
    },
    INSERT_COMPANY: {
        url: "http://localhost:8080/manager/company",
        method: "POST"
    },
    UPDATE_COMPANY: {
        url: "http://localhost:8080/manager/company/update",
        method: "PUT"
    },
    DELETE_COMPANY: {
        url: "http://localhost:8080/manager/company",
        method: "DELETE"
    }


    ,
    GET_LIST_MAJOR: {
        url: "http://localhost:8080/manager/listmajor",
        method: "GET"
    },
    GET_LIST_MAJOR_SEARCH: {
        url: "http://localhost:8080/manager/major/search",
        method: "POST"
    },
    GET_INFO_MAJOR: {
        url: "http://localhost:8080/major/infor",
        method: "GET"
    },
    INSERT_MAJOR: {
        url: "http://localhost:8080/manager/major",
        method: "POST"
    },
    UPDATE_MAJOR: {
        url: "http://localhost:8080/manager/major/update",
        method: "PUT"
    },
    DELETE_MAJOR: {
        url: "http://localhost:8080/manager/major",
        method: "DELETE"
    },




    GET_LIST_CLASS: {
        url: "http://localhost:8080/manager/listClasses",
        method: "GET"
    }
    ,
    GET_LIST_CLASS_SEARCH: {
        url: "http://localhost:8080/manager/classes/search",
        method: "POST"
    },
    GET_INFO_CLASS: {
        url: "http://localhost:8080/classes/",
        method: "GET"
    },
    INSERT_CLASS: {
        url: "http://localhost:8080/manager/classes",
        method: "POST"
    },
    UPDATE_CLASS: {
        url: "http://localhost:8080/manager/classes/update",
        method: "PUT"
    },
    DELETE_CLASS: {
        url: "http://localhost:8080/manager/classes",
        method: "DELETE"
    },
}

