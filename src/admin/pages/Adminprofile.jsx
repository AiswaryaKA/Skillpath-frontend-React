import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCircleCheck, faEnvelope, faGear, faLocationDot, faMoneyCheckDollar, faPen, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import Adminheader from '../components/Adminheader'
import { approveCoursesApi, getAllCoursesAdminApi, updateAdminProfileApi, } from '../../services/allApi'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../../contex/Contextshare'

function Adminprofile() {

  const [homeStatus, setHomeStatus] = useState(false)
  const [courseStatus, setCourseStatus] = useState(false)
  const [settingStatus, setSettingStatus] = useState(false)
  const [newCourseStatus, setNewCourseStatus] = useState(false)
  const [hostdetails, setHostDetails] = useState(false)
  //to store token
  const [token, setToken] = useState("")
  const [approveStatus, setApproveBookStatus] = useState(false)
  //to store profile image
  const [existingadminProfileImage, setExistingadminprofileImage] = useState("")
  //to updata profile
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: "",
  })
  //console.log(adminDetails);
  //to work useeffect again when edting profile
  const [upadateStatus, setUpdateStatus] = useState({})
  //to view profile
  const [preview, setPreview] = useState("")
  //to store course details
  const [courseDetails, setCourseDetails] = useState([])
  //ContextShare to update profile
  const { setAdminProfileUpdateStatus } = useContext(adminProfileUpdateStatusContext)

  //Function to get all courses
  const getAllCoursesAdmin = async (token) => {
    //create reqheader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllCoursesAdminApi(reqHeader)
    console.log(result);

    if (result.status == 200) {
      setCourseDetails(result.data)
    }
  }
  //console.log(courseDetails);

  //function to approve course by admin
  const approveCourse = async (data) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await approveCoursesApi(data, reqHeader)
    console.log(result);

    if (result.status == 200) {
      setApproveBookStatus(!approveStatus)
    }
    else {
      toast.error('Something went wrong')
    }


  }

  //function to add profile photo as url
  const handleFileAdd = (e) => {
    // console.log(e.target.files[0]);
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    //console.log(adminDetails.profile);

    if (e.target.files[0] != "") {
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }


  }
  //console.log(preview);

  //function to reset
  const handleReset = () => {

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)

      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, profile: user.profile })
    }
    setPreview("")

  }

  //function to add details updated in profile
  const handleUpdate = async () => {
    const { username, password, cPassword, profile } = adminDetails
    console.log(username, password, cPassword, profile);

    if (!username || !password || !cPassword) {
      toast.info('Please add complete details')
    }
    else {

      if (password != cPassword) {
        toast.warning('Password Must Match')
      }
      else {

        if (preview) {

          const reqBody = new FormData()

          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const result = await updateAdminProfileApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('Profile Updated Successfully')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileUpdateStatus(result.data)
          }
          else {
            toast.error('Something went wrong')
            setUpdateStatus(result)
          }

        }
        else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await updateAdminProfileApi({ username, password, profile: existingadminProfileImage }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('Profile Updated Successfully')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileUpdateStatus(result.data)
          }
          else {
            toast.error('Something went wrong')
            setUpdateStatus(result)
          }

        }
      }



    }

  }

  useEffect(() => {
    setHomeStatus(true)
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
      getAllCoursesAdmin(token)

      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingadminprofileImage(user.profile)
    }
  }, [upadateStatus, approveStatus])


  return (
    <>
      <Adminheader />
      <div className='flex justify-center items-center flex-col'>
        <div className='mt-35 flex justify-center items-center flex-col  w-full'>
          <div className='md:flex justify-content-center align-items-center md:px-10 px-5 bg-white'>

            <div className=' mt-12 flex-col  mb-10 '>
              <div className='flex justify-end'>
                <div>
                  <button onClick={() => { setSettingStatus(true); setCourseStatus(false); setHomeStatus(false), setHostDetails(false) }} className={settingStatus ? 'md:mt-10 border border-green-800 rounded-2xl text-green-800 px-2 py-1 w-full mb-5 md:mb-0' : 'md:mt-10 border rounded-2xl text-black px-2 py-1 w-full mb-5 md:mb-0'}>Settings<FontAwesomeIcon icon={faGear} className='ms-2' /></button>
                </div>

              </div>
              {/* Tabs */}
              <div className='flex justify-start items-start'>
                <p onClick={() => { setHomeStatus(true); setCourseStatus(false); setSettingStatus(false), setHostDetails(false) }} className={homeStatus ? 'p-4 text-green-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Home</p>

                <p onClick={() => { setNewCourseStatus(true); setHomeStatus(false); setCourseStatus(true); setSettingStatus(false); setHostDetails(false) }} className={courseStatus ? 'p-4 text-green-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Courses</p>
              </div>

              <div>
                {/* Content */}
                {homeStatus &&
                  <div className='p-10'>
                    <div className='md:grid grid-cols-3'>
                      <div className='px-5 mt-5 md:mt-0'>
                        <div className='bg-blue-900 p-4 flex rounded text-white'>
                          <FontAwesomeIcon icon={faBook} className='fa-2x' />
                          <div className='text-center px-5'>
                            <h1 className='text-lg'>Total Number of Courses</h1>
                            <h1 className='text-3xl font-bold'>100+</h1>
                          </div>
                        </div>

                      </div>
                      <div className='px-5 mt-5 md:mt-0'>
                        <div className='bg-green-900 p-4 flex rounded text-white'>
                          <FontAwesomeIcon icon={faUsers} className='fa-2x' />
                          <div className='text-center px-5'>
                            <h1 className='text-lg'>Total Number of users</h1>
                            <h1 className='text-3xl font-bold'>100+</h1>
                          </div>
                        </div>

                      </div>
                      <div className='px-5 mt-5 md:mt-0'>
                        <div className='bg-amber-400 p-4 flex rounded text-white'>
                          <FontAwesomeIcon icon={faUserTie} className='fa-2x' />
                          <div className='text-center px-5'>
                            <h1 className='text-lg'>Total Number of Host</h1>
                            <h1 className='text-3xl font-bold'>100+</h1>
                          </div>
                        </div>

                      </div>
                    </div>





                  </div>}

                {courseStatus &&
                  <div>
                    <div className='flex justify-center items-center'>
                      <p onClick={() => { setNewCourseStatus(true); setHostDetails(false); setHomeStatus(false); setCourseStatus(true); setSettingStatus(false) }} className={newCourseStatus ? 'p-4 text-green-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>New Courses</p>

                      <p onClick={() => { setHostDetails(true); setNewCourseStatus(false); setHomeStatus(false); setCourseStatus(true); setSettingStatus(false) }} className={hostdetails ? 'p-4 text-green-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Course Details</p>
                    </div>

                    {newCourseStatus &&
                      <div className='md:grid grid-cols-3 gap-5 md:mx-20 mx-5 mb-5'>

                        {courseDetails?.length > 0 ?
                          courseDetails?.map((item, index) => (
                            <div className={item.courseapprovedstatus == 'seatsfilled' ? ' mb-20 md:mb-0 opacity-5' : 'mb-20 md:mb-0 '}>
                              <div className='me-2 p-5 flex justify-center items-center flex-col rounded shadow-lg ' key={index}>
                                <div className='flex justify-start'>
                                  <img src={item?.courseimageurl} alt="no image" style={{ width: '100px', height: '100px' }} className='rounded' />
                                </div>
                                <h1 className='text-xl font-bold mt-3 text-center'>{item?.coursename.slice(0, 20)}...</h1>
                                <h2 className='text-lg font-semibold'>{item?.institutename}</h2>
                                <div className='flex justify-start flex-col mt-3'>
                                  <p><FontAwesomeIcon icon={faLocationDot} className='me-2 text-blue-800' /><span className='font-semibold'>Location: </span>{item?.location}</p>
                                  <p><FontAwesomeIcon icon={faCircleCheck} className='me-2 text-blue-500' /><span className='font-semibold'>Mode: </span>{item?.mode}</p>
                                  <p className='text-red-900 font-medium'><FontAwesomeIcon icon={faMoneyCheckDollar} className='me-2 text-green-800' /><span className='font-semibold'>Fee:</span>${item?.coursefee}</p>
                                  <p><FontAwesomeIcon icon={faEnvelope} className='me-2 text-gray-800' /><span className='font-semibold'></span>{item?.userEmail}</p>
                                </div>

                                {item?.courseapprovedstatus == 'pending' && <button onClick={() => approveCourse(item)} className='bg-green-600 p-2  text-white w-full hover:border hover:border-green-800 hover:bg-white hover:text-green-700 mt-8'>Approve</button>}


                                {item?.courseapprovedstatus == 'approved' && <div className='flex justify-between w-full'>
                                  <button className=' p-2 text-green-800 w-full   mt-1 flex justify-between'>Approved<img src="https://png.pngtree.com/png-vector/20221126/ourmid/pngtree-isolated-on-a-white-background-a-vector-symbol-of-a-green-tick-icon-representing-a-checkmark-vector-png-image_42552088.jpg" alt="" style={{ width: '50px', height: '50px' }} /></button>
                                </div>}
                              </div>

                            </div>
                          )) :
                          <p className='text-red-800 text-xl'>No Courses</p>}




                      </div>
                    }
                  </div>}

                {settingStatus &&
                  <div className="flex flex-col items-center justify-center mt-2 px-4">
                    <div className="grid md:grid-cols-2 w-full max-w-6xl">
                      <div className="w-full flex flex-col items-center justify-center">
                        <form className="shadow-2xl rounded p-6 sm:p-10 m-3 sm:m-5 w-full max-w-xl">
                          <div className="my-3 px-3 sm:px-5">
                            <h2 className="mt-5 mb-5 font-bold text-xl sm:text-2xl text-center">Update your profile</h2>
                            <div className="relative z-0 flex justify-center">
                              <label htmlFor="hostprofilefile" className="relative cursor-pointer">
                                <input onChange={(e) => handleFileAdd(e)} type="file" id="hostprofilefile" style={{ display: "none" }} />
                                <div className="flex justify-center items-center z-0 flex-col mt-3">
                                  {existingadminProfileImage == "" ? <img
                                    src={preview ? preview : "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"}
                                    alt="no image"
                                    className="rounded-full w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] object-cover"
                                  /> :
                                    <img
                                      src={preview ? preview : `${serverUrl}/upload/${existingadminProfileImage}`}
                                      alt="no image"
                                      className="rounded-full w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] object-cover"
                                    />}
                                </div>
                                <div className="absolute bottom-2 right-2 bg-gray-500 text-white py-1 px-2 rounded-full">
                                  <FontAwesomeIcon icon={faPen} />
                                </div>
                              </label>
                            </div>
                          </div>

                          <div className="px-3 sm:px-5 mt-6">
                            <div className="my-3 mb-5">
                              <input value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" className="px-3 py-2 w-full border rounded border-gray-400" placeholder="username" />
                            </div>
                            <div className="my-3 mb-5">
                              <input value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" className="px-3 py-2 w-full border border-gray-400 rounded" placeholder="password" />
                            </div>
                            <div className="my-3 mb-5">
                              <input value={adminDetails.cPassword} onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" className="px-3 py-2 w-full border rounded border-gray-400" placeholder="confirm password" />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <button onClick={handleReset} type='button' className="bg-gray-500 text-black px-4 py-2 rounded hover:text-white hover:text-lg w-full sm:rounded-l sm:rounded-r-none">
                                Reset
                              </button>
                              <button onClick={handleUpdate} type='button' className="bg-amber-500 text-black px-4 py-2 rounded hover:text-white hover:text-lg w-full sm:rounded-r sm:rounded-l-none">
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className='md:flex justify-content-center align-items-center p-10 mt-5 md:mt-20'>

                        <p className='italic ' style={{ textAlign: 'justify' }}>
                          Dedicated to managing users, verifying listings, and maintaining platform quality. Ensuring a safe and seamless experience for all SkillPath members.

                          <br />
                          As the Admin of SkillPath, I oversee platform operations to ensure a smooth, secure, and high-quality experience for all users. From managing user accounts and verifying institute listings to resolving disputes and monitoring platform performance, my role is to maintain system integrity and support the growth of our learning ecosystem. My focus is on enabling trust, transparency, and excellence across every interaction on the platform.
                          <br />
                          <br />
                          Platform administrator focused on maintaining system integrity, approving quality listings, managing user accounts, and monitoring feedback to keep SkillPath growing in the right direction.
                        </p>
                      </div>
                    </div>
                  </div>}

                {hostdetails &&

                  <div className="w-full p-4 mt-10">
                    {/* Table for md and up */}
                    <div className="hidden md:block">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-green-900 text-white">
                            <tr>
                              <th className="px-6 py-3 text-left text-sm font-semibold">Serial No</th>
                              <th className="px-6 py-3 text-left text-sm font-semibold">Course Name</th>
                              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                              <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-100">
                            {courseDetails?.length > 0 ? (
                              courseDetails.map((item, index) => (
                                <tr key={index} className="hover:bg-violet-50 transition">
                                  <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{item?.coursename}</td>
                                  <td className="px-6 py-4 text-sm text-gray-600">{item?.userEmail}</td>
                                  <td className="px-6 py-4 text-sm text-gray-800">{item?.location}</td>
                                  <td className="px-6 py-4 text-sm">
                                    <span
                                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${item.courseapprovedstatus === "approved"
                                          ? "bg-green-100 text-green-800"
                                          : item.courseapprovedstatus === "pending"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                      {item.courseapprovedstatus}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="text-center py-4 text-red-500">
                                  No users
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Cards for mobile */}
                    <div className="block md:hidden space-y-4">
                      {courseDetails?.length > 0 ? (
                        courseDetails.map((item, index) => (
                          <div key={index} className="border border-green-900 shadow rounded p-4 bg-white">
                            <div className="mb-2">
                              <span className="font-semibold">#{index + 1}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Course:</span> {item?.coursename}
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Email:</span> {item?.userEmail}
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Location:</span> {item?.location}
                            </div>
                            <div>
                              <span className="font-semibold">Status:</span>{" "}
                              <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${item.courseapprovedstatus === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : item.courseapprovedstatus === "pending"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                              >
                                {item.courseapprovedstatus}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-red-600 text-center">No users</p>
                      )}
                    </div>
                  </div>}
              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={1000} transition={Bounce} hideProgressBar/>
      <Footer />
    </>
  )
}

export default Adminprofile