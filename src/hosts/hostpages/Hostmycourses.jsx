import React, { useEffect, useState } from 'react'
import Hostsidebar from '../hostcomponents/Hostsidebar'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { getAllHostCourseApi, getAllusersApi } from '../../services/allApi'
import Usersheader from '../../users/userscomponents/Usersheader'
import Addcourse from '../hostcomponents/Addcourse'
import { serverUrl } from '../../services/serverUrl'

function Hostmycourses() {

  const [courseliststatus, setcourseliststatus] = useState(true)
  const [usersstatus, setusersstatus] = useState(false)

  const [addcourse, setaddcourse] = useState(false)

  const [hostCourses, setHostCourses] = useState([])

  const [allUserDetails , setAllUserDetails] = useState({})
//function to get courses hosted by user
  const hostAllCourses = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllHostCourseApi(reqHeader)
    //console.log(result);
    if (result.status == 200) {
      setHostCourses(result.data)
    }
    else {
      console.log("Something went wrong");

    }

  }

  //console.log(hostCourses);
  
  //function to get all users
  const getallusers = async()=>{
    const result = await getAllusersApi()
    console.log(result);
    if(result.status == 200){
      setAllUserDetails(result.data)
    }


    
  }
  console.log(allUserDetails);
  

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem("token")
      hostAllCourses(token)
      getallusers()
    }

  }, [])

  return (
    <>
      <Usersheader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-green-100 flex flex-col items-center shadow-2xl md:mt-20'>
          <Hostsidebar />
        </div>
        <div className=''>
          <h1 className='text-3xl font-bold text-center my-5  md:mt-30'>All Courses</h1>
          {/* tab */}
          <div className='flex justify-between items-center my-5 mx-6'>

            <div className='flex'>
              <p onClick={() => { setcourseliststatus(true), setusersstatus(false), setaddcourse(false) }} className={courseliststatus ? 'p-4 text-green-800 rounded  border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-green-800 rounded border-b  border-gray-200 cursor-pointer'}>Course List</p>

              <p onClick={() => { setcourseliststatus(false), setusersstatus(true), setaddcourse(false) }} className={usersstatus ? 'p-4 text-green-800 rounded border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-green-800 rounded border-b  border-gray-200 cursor-pointer'}>Users</p>

            </div>
            <div className='flex justify-content-end'>
              <Addcourse />
            </div>



          </div>


          {(courseliststatus && hostCourses > 0) && <div className='flex my-8 w-full justify-center items-center'>

            <input type="text" placeholder='Courses' className='border border-gray-200 placeholder:gray-200 p-2 md:w-1/4 w-1/2' />

            <button className='bg-green-900 text-white py-2 px-3 shadow hover:border hover:border-green-900 hover:text-green-900 hover:bg-white'>Search</button>

          </div>}
          {courseliststatus &&
            <div className='md:grid grid-cols-3 gap-5 md:mx-20 mx-5 mb-5'>

              {/* Courselists - host */}
              {hostCourses?.length > 0 ?
                hostCourses?.map((item, index) => (
                  <div>
                    <div className='me-2 p-5 flex justify-center items-center flex-col rounded shadow-lg' key={index}>
                      <div className='flex justify-start'>
                        <img src={item?.courseimageurl} alt="no image" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                      </div>
                      <h1 className='text-xl font-bold mt-3 text-center'>{item?.coursename.slice(0, 25)}...</h1>
                      <h2 className='text-lg font-semibold'>{item?.institutename}</h2>
                      <div className='flex justify-start flex-col mt-3'>
                        <p><FontAwesomeIcon icon={faLocationDot} className='me-2 text-blue-800' /><span className='font-semibold'>Location: </span>{item?.location}</p>
                        <p><FontAwesomeIcon icon={faCircleCheck} className='me-2 text-blue-500' /><span className='font-semibold'>Mode: </span>{item?.mode}</p>

                      </div>

                      {/* <button className='bg-green-600 p-2 text-white w-full hover:border hover:border-green-800 hover:bg-white hover:text-green-700 mt-3'>Approve</button> */}

                      {item?.courseapprovedstatus == "approved" ? <div className='flex justify-between w-full'>
                        <p className='text-green-800 mt-3 text-lg'>Aprroved</p>
                        <img src="https://png.pngtree.com/png-vector/20221126/ourmid/pngtree-isolated-on-a-white-background-a-vector-symbol-of-a-green-tick-icon-representing-a-checkmark-vector-png-image_42552088.jpg" alt="" style={{ width: '50px', height: '50px' }} /></div> :
                        <div className='flex justify-between w-full mt-4'>
                           <p className='text-yellow-500 text-lg'>Pending</p>
                          <img src="https://static.vecteezy.com/system/resources/thumbnails/017/172/375/small_2x/warning-message-concept-represented-by-exclamation-mark-icon-exclamation-symbol-in-circle-png.png" alt="" style={{ width: '30px', height: '30px' }} /></div>

                      }
                    </div>
                  </div>
                )) :
                <p className='text-2xl text-red-900'>No Courses..You can add your courses</p>

              }

            </div>
          }

          {usersstatus &&
            <div className='md:grid grid-cols-3 gap-3 mx-10'>

             {allUserDetails?.length>0 ?
             allUserDetails?.map((item , index)=>(
                 <div key={index} className='bg-white shadow-2xl rounded-b-3xl p-2 mb-3'>
                
                <div className='flex  justify-between items-center gap-2'>
                  <div>
                    <img src= {item?.profile == "" ? "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png":`${serverUrl}/upload/${item.profile}`} alt="no image" style={{ height: "50px", borderRadius: '50%' }} />
                     
                  </div>
                  <div className='ms-3'>
                    <h3 className='text-green-800 text-xl'>{item?.username}</h3>
                    
                  </div>
                </div>
              </div>
             )):
             <p>No Users</p>
             }



            </div>}



        </div>


      </div>



      <Footer />

    </>
  )
}

export default Hostmycourses