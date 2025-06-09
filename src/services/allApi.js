import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//Register API - content type-application/json
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register` , reqBody )
}

//Login API
export const loginApi = async(reqBody)=>{
    return await commonApi('POST' , `${serverUrl}/login` , reqBody)
}

//GoogleLogin API
export const googleLoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/google-login` , reqBody)
}

//get home courses
export const getHomeCoursesApi = async()=>{
    return await commonApi('GET' ,`${serverUrl}/all-home-courses`)
}

//----------------------------------------------------------------------------
//--------------------------Host----------------------------------------------

//upload a course by host
export const uploadCourseApi = async(reqBody ,reqHeader )=>{
    return await commonApi('POST' , `${serverUrl}/add-courses` , reqBody , reqHeader)
}

//to get all courses
export const getAllCoursesApi = async(searchKey , reqHeader)=>{
    //query parameter - baseurl?key=value
    return await commonApi('GET' , `${serverUrl}/all-courses?search=${searchKey}` , "" , reqHeader)
}

//to view course
export const getACourseApi = async(id)=>{
    //path parameter
    return await commonApi('GET' , `${serverUrl}/view-course/${id}`)
}
//to get approved courses at host page
export const getAllHostCourseApi = async(reqHeader)=>{
    return await commonApi('GET' , `${serverUrl}/host-all-courses` , "" , reqHeader)
}

//api to make payment for enrolled
export const enrolledbyPaymentApi = async(reqBody , reqHeader)=>{
    return await commonApi('POST' , `${serverUrl}/enrollment`, reqBody , reqHeader)
}
//api to get enrolled courses
export const getEnrolledCoursesApi = async(reqHeader)=>{
    return await commonApi('GET' , `${serverUrl}/get-enrolled-courses`, "" , reqHeader)
}
//api to update the profile
export const updateUserProfileApi =async(reqBody , reqHeader)=>{
    return await commonApi('PUT' , `${serverUrl}/user-profile-update` , reqBody , reqHeader)
}

//api to bookmark
export const bookmarkApi = async(reqBody , reqHeader)=>{
    return await commonApi('PUT' , `${serverUrl}/bookmark` , reqBody , reqHeader)
}

//api to get bookmarkedlist
export const getBookMarkedApi = async(reqHeader)=>{
    return await commonApi('GET' ,` ${serverUrl}/get-bookmarked` ,"" , reqHeader)
}

//api to get all users
export const getAllusersApi = async()=>{
    return await commonApi('GET' , `${serverUrl}/get-all-users`)
}

//api to delete enrolled course
export const deleteEnrolledCourseApi = async(id)=>{
    return await commonApi('DELETE' , `${serverUrl}/delete-user-enrolledcourse/${id}`)
}

//--------------------Admin--------------------------------

//to get all courses admin
export const getAllCoursesAdminApi = async(reqHeader)=>{
    return await commonApi('GET' ,`${serverUrl}/admin-all-course`, "" , reqHeader)
}

//api to approve course
export const approveCoursesApi = async(reqBody , reqHeader)=>{
    return await commonApi('PUT' , `${serverUrl}/approve-courses` , reqBody , reqHeader)
}

//api to update the profile
export const updateAdminProfileApi =async(reqBody , reqHeader)=>{
    return await commonApi('PUT' , `${serverUrl}/admin-profile-update` , reqBody , reqHeader)
}