import React, { useContext, useEffect, useState } from 'react'
import Usersheader from '../userscomponents/Usersheader'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircleCheck, faLocationDot, faPen, faSquareCheck, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import Edituserprofile from '../userscomponents/Edituserprofile'
import { deleteEnrolledCourseApi, getBookMarkedApi, getEnrolledCoursesApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { userProfileUpdateStatusContext } from '../../../contex/Contextshare'
import { Link } from 'react-router-dom'

function Profile() {
  const [bookmarked, setbookmarked] = useState(true)
  const [enrolledstatus, setenrolledstatus] = useState(false)
  const [token, setToken] = useState("")
  const [enrolledCourseDetails, setEnrolledCourseDetails] = useState([])
  const [bookmarkedList, setBookmarkedList] = useState([])

  const [userDetl, setUserDetl] = useState({
    username: "",
    profile: "",
    bio: ""
  })

  //delete
  const [deleteEnrolledCourse , setDeleteEnrolledCourse] = useState("")

  //function to delete Enrolled Courses
  const deleteuserenrolledcourse = async(id) =>{
    const result = await deleteEnrolledCourseApi(id)
    console.log(result);
    setDeleteEnrolledCourse(result.data)
    
  }

  //contextshare
  const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)

  //function to display enrolled course
  const userEnrolled = async (token) => {

    //create reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getEnrolledCoursesApi(reqHeader)
    console.log(result);

    if (result.status == 200) {
      setEnrolledCourseDetails(result.data)
      console.log(result.data);

    }

  }
  //console.log(enrolledCourseDetails);

  //to get bookmarkedlist
  const getbookmarkLists = async()=>{

    const reqHeader = {
            "Authorization": `Bearer ${token}`
        }

    const result = await getBookMarkedApi(reqHeader)
    //console.log(result);

    if(result.status == 200){
      setBookmarkedList(result.data.bookmarked)
    }
    
  }
 // console.log(bookmarkedList);
  


  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     const token = sessionStorage.getItem("token")
  //     setToken(token)
      
  //     const user = JSON.parse(sessionStorage.getItem("existingUser"))
  //     setUserDetl({ username: user.username, profile: user.profile, bio: user.bio })
  //     if (enrolledstatus == true) {
  //       userEnrolled(token)
  //     }
  //     if(bookmarked == true ){
  //       getbookmarkLists()
  //     }

  //   }
  // }, [userProfileUpdateStatus,token, bookmarked, enrolledstatus])

  useEffect(() => {
  const tokenFromStorage = sessionStorage.getItem("token");
  if (tokenFromStorage) {
    setToken(tokenFromStorage);
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setUserDetl({ username: user.username, profile: user.profile, bio: user.bio });
  }
}, [userProfileUpdateStatus]);

useEffect(() => {
  if (token) {
    if (enrolledstatus) {
      userEnrolled(token);
    }
    if (bookmarked) {
      getbookmarkLists();
    }
  }
}, [token, bookmarked, enrolledstatus , deleteEnrolledCourse]);




  return (
    <>
      <Usersheader />
      <div className='flex justify-center items-center flex-col'>
        <div className='mt-25 flex justify-center items-center flex-col bg-amber-50 w-full'>
          <div className='md:grid grid-cols-[1fr_4fr] md:px-10 px-5'>
            <div className='flex justify-center items-center flex-col px-5 mt-10 mb-10'>
              <h1 className='font-bold italic text-2xl m-5 text-center'>User Profile</h1>
              <div className=''>
                <div className='bg-white' style={{ width: '100%', height: '30px', borderRadius: '50%' }}>
                  <img src={userDetl.profile == "" ? "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png" : `${serverUrl}/upload/${userDetl.profile}`} alt="no image" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                </div>
              </div>
            </div>

            <div className='flex justify-center items-start flex-col'>
              <h2 className='font-bold italic text-xl mt-18'>{userDetl.username}<FontAwesomeIcon icon={faCircleCheck} style={{ color: "#4686ec", fontSize: '10px' }} className='mb-2' /></h2>
              <p className='italic font-semibold text-xs md:text-lg mt-5 mb-3 md:mb-0' style={{ textAlign: 'justify' }}>{userDetl.bio}</p>


            </div>
          </div>
          <div className='w-full flex justify-end items-end px-15 mb-5'>
            <Edituserprofile />
          </div>
        </div>
      </div>

      {/* Tabs */}

      <div className='md:px-40'>
        {/* tab */}

        <div className='flex justify-center items-center my-5'>
          <p onClick={() => { setbookmarked(true); setenrolledstatus(false) }} className={bookmarked ? 'p-4 text-green-800 font-bold border-l border-t border-r border-b border-green-800 rounded cursor-pointer mx-3' : 'p-4 text-black border-b border-green-800 cursor-pointer'}><FontAwesomeIcon icon={faBookmark} className='me-2' />Bookmarked</p>

          <p onClick={() => { setbookmarked(false); setenrolledstatus(true) }} className={enrolledstatus ? 'p-4 text-green-800 font-bold border-l border-t border-r border-b border-green-800 rounded cursor-pointer mx-3' : 'p-4 text-black border-b border-green-800 cursor-pointer'}><FontAwesomeIcon icon={faSquareCheck} className='me-2' />Enrolled</p>

         
        </div>

        {bookmarked &&
          <div className='shadow p-5'>
            <div className='md:grid grid-cols-3 '>

              {bookmarkedList?.length>0 ?
              bookmarkedList?.map((item , index)=>(
                <div className='me-2 p-5 flex justify-center items-center flex-col rounded shadow-lg' key={index}>
                <div className='flex justify-start'>
                  <img src={item?.courseimageurl}alt="no image" style={{ width: '80px', height: '80px' , borderRadius:'50%' }} />
                </div>
                <h1 className='text-xl font-bold mt-3'>{item?.coursename.slice(0,15)}...</h1>
                <h2 className='text-lg font-semibold'>{item?.institutename}</h2>
                <div className='flex justify-start flex-col mt-3'>
                  <p><FontAwesomeIcon icon={faLocationDot} className='me-2 text-blue-800' /><span className='font-semibold'>{item?.location} </span></p>
                  <p><FontAwesomeIcon icon={faCircleCheck} className='me-2 text-blue-500' /><span className='font-semibold'>{item?.mode} </span></p>
                  
                </div>

                <div className='w-full'><Link  to={`/viewdetails/${item?._id}`}><button className='bg-green-600 px-3 py-2 rounded-full w-full mt-5 text-white font-bold hover:bg-amber-400'>View Details</button></Link></div>
              </div>
              )) :
              <p>No Bookmarks</p>
              }

            </div>
          </div>
        }

        {enrolledstatus &&

          <div className='md:grid grid-cols-3 gap-5 md:mx-20 mx-5 mb-5'>

            {enrolledCourseDetails?.length > 0 ?

              enrolledCourseDetails?.map((item, index) => (
                item?.courseid ? (<div>
                  <div key={item._id} className='me-2 p-5 flex justify-center items-center flex-col rounded shadow-lg' >
                   
                    <h1 className='text-xl font-bold mt-3 text-center'>{item?.courseid.coursename.slice(0,15)}...</h1>
                    <h2 className='text-lg font-semibold text-green-800'>{item?.courseid.institutename}</h2>
                    <div className='flex justify-start flex-col mt-3'>
                      <p><FontAwesomeIcon icon={faLocationDot} className='me-2' /><span className='font-semibold'></span>{item?.courseid.location}</p>
                      <p><FontAwesomeIcon icon={faCircleCheck} className='me-2' /><span className='font-semibold'></span>{item?.courseid.mode}</p>
                     {/* <Link  to={`/viewdetails/${item?.courseid}`}>
                        <p className='font-semibold'>View more details..</p>
  
                     </Link> */}
                    </div>

                    {/* <button className='bg-green-600 p-2 text-white w-full hover:border hover:border-green-800 hover:bg-white hover:text-green-700 mt-3'>Approve</button> */}

                    <div className='flex justify-between w-full'>
                      <img src="https://www.pngmart.com/files/23/Booked-PNG-File.png" alt="" style={{ width: '50px', height: '50px' }} />
                       <button type='button' className='mt-3 text-xl text-red-800'><FontAwesomeIcon icon={faTrash} onClick={()=>deleteuserenrolledcourse(item?._id)}/></button>
                      </div>

                      
                  </div>

                </div>):null)) :

              <p className='text-red-900 text-2xl'>No Courses Enrolled...</p>


            }




          </div>

        }
      </div>
      <Footer />

    </>
  )
}

export default Profile