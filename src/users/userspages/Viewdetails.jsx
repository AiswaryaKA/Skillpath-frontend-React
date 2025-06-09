import React, { useEffect, useState } from 'react'
import Usersheader from '../userscomponents/Usersheader'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCamera, faImages, faShare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { bookmarkApi, enrolledbyPaymentApi, getACourseApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { loadStripe } from '@stripe/stripe-js'
import { toast, ToastContainer } from 'react-toastify'

function Viewdetails() {

  const [viewgallery, setviewgallery] = useState(false)
  //to store data of course 
  const [viewCourseDetails, setViewCourseDetails] = useState({})
  //to store enrollmodal details
  const [enrollDetails, setEnrollDetails] = useState({
    fullname: "",
    qualification: "",
    questions: ""
  })
  console.log(enrollDetails);
  const [token, setToken] = useState("")

  //bookmarked
  const [isBookmarked, setIsBookmarked] = useState(false)
  //enroll modal
  const [modalstatus, setmodalstatus] = useState(false)
  //view a course
  const { id } = useParams() //access data from parameter
  console.log(id);



  //open modal
  const openModal = () => {
    setmodalstatus(true)
  }

  //function to reset
  const handleReset = () => {
    setEnrollDetails({
      fullname: "",
      qualification: "",
      questions: ""
    })
  }

  //function to get a course
  const viewCourse = async (id) => {
    const result = await getACourseApi(id)
    console.log(result);

    if (result.status == 200) {
      setViewCourseDetails(result.data)
    }

  }
  console.log(viewCourseDetails);

  //function to make payment 

  const enrollbypayment = async () => {
    console.log(viewCourseDetails);
    const { fullname, qualification, questions } = enrollDetails
    //object-instance
    const stripe = await loadStripe('pk_test_51RSxysI2ZsleBLUMU4AhKQae9FRaDGlTRwcw3hsiukxEYuEgyNQPdwz5SpAbqhou44xQEOef4onkVNaC9LEiR3mw00qLCR50QL');
    if (!fullname || !qualification) {
      toast.warning('Please fill the fileds completely')
    }
    else {
      //data to be updated in backend
      const reqBody = {
        courseid: viewCourseDetails._id, hostemail: viewCourseDetails.userEmail, fullname, qualification, questions, enrollmentfee: 500

      }
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }

      const result = await enrolledbyPaymentApi(reqBody, reqHeader)
      console.log(result);

      const sessionId = result.data.sessionId

      const response = stripe.redirectToCheckout({
        sessionId: sessionId

      })

    }

  }

  //function to Bookmark
  const handleBookmark = async () => {
    const courseid = viewCourseDetails._id

    //create reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await bookmarkApi({ courseid }, reqHeader)
    console.log(result);

    if (result.status == 200) {
      const updatedBookmarked = result.data.bookmarked

      if (updatedBookmarked.includes(courseid)) {
        toast.success("Bookmarked")
        setIsBookmarked(true)
      }
      else {
        toast.success("Removed from bookmark")
        setIsBookmarked(false)
      }
    }
    else {
      toast.error("Something went wrong")
    }

  }


  useEffect(() => {
    viewCourse(id)
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
    }
  }, [])
  return (
    <>
      <Usersheader />
      <div className='flex justify-center items-center flex-col'>
        <h1 className='mt-35 font-bold text-3xl mb-3 text-center'>{viewCourseDetails?.coursename}<FontAwesomeIcon icon={faBookmark} className={isBookmarked ? 'ms-2 text-red-800' : 'ms-2 text-black'} onClick={handleBookmark} /></h1>
        <h3 className=' font-bold text-xl mb-3'>{viewCourseDetails?.institutename} - {viewCourseDetails?.location} <FontAwesomeIcon icon={faImages} className='ms-3' onClick={() => setviewgallery(true)} /></h3>
        <p className='text-lg mb-6'> <Link to={'https://www.luminartechnolab.com'} className='text-blue-600'>{viewCourseDetails?.institutelink}</Link></p>
        <div className='md:grid grid-cols-[4fr_1fr] md:px-10 px-5  mb-5'>

          <div className='w-full flex justify-start items-start flex-col p-10'>

            <h3 className='text-start font-bold text-black text-xl mb-5'>Course Overview</h3>
            <p className='text-start italic text-black text-lg mb-5' style={{ textAlign: 'justify' }}>{viewCourseDetails?.description}</p>
          </div>
          <div className='w-full p-10 shadow-2xl rounded bg-amber-50 hidden md:flex flex-col'>
            <img src={viewCourseDetails?.courseimageurl} alt="no image" className='rounded-2xl' />
            <div className='flex justify-center items-center flex-col '>
              <button className='font-bold bg-amber-500 text-white px-2 py-3 rounded w-full mt-8'><FontAwesomeIcon icon={faBookmark} className={isBookmarked ? 'me-2 text-red-800 text-xl' : 'me-2 text-white'} onClick={handleBookmark}/>Bookmark</button>
              <button onClick={() => openModal()} className='font-bold bg-green-800 text-white px-2 py-3 rounded w-full mt-5'><FontAwesomeIcon icon={faShare} className='me-2' />Enroll Now</button>
            </div>
          </div>


        </div>

        <div className='flex justify-start items-start flex-col px-20 mb-30'>
          <h3 className='text-start font-bold text-black text-xl mb-5'>SYLLABUS</h3>
          <p className='font-mono mb-6' style={{ textAlign: 'justify' }}>{viewCourseDetails?.syllabus}</p>

          <div className='flex justify-start items-start flex-col'>
            <p className='font-semibold text-lg'>Duration : {viewCourseDetails?.duration}</p>
            <p className='font-semibold text-lg'>Mode : {
              viewCourseDetails?.mode}</p>
            <p className='font-semibold text-lg'>Seats : {viewCourseDetails?.noofseats}</p>
            <h5 className='font-semibold text-xl  text-red-800 mb-10'>Price : ${viewCourseDetails?.coursefee}</h5>

            <div >
              <button onClick={() => openModal()} className='font-bold bg-green-800 text-white px-2 py-3 rounded w-full mt-5'><FontAwesomeIcon icon={faShare} className='me-2' />Enroll Now</button>
              <Link to={'/explore'}><button className='font-bold bg-gray-400 text-white px-2 py-3 rounded w-full mt-5'>Go Back</button></Link>
            </div>

          </div>

        </div>

      </div>

      {/* modal of gallery */}
      {viewgallery && <div className="fixed top-30 left-0 w-full  flex items-center justify-center ">
        <div className="bg-white md:w-200 w-100 h-200 md:h-80 rounded shadow-lg relative">
          <div className="flex justify-between px-4 py-5 bg-green-900 text-white rounded ">
            <h1>Gallery</h1>
            <button onClick={() => setviewgallery(false)} className="bg-black text-white font-extrabold px-3 rounded">X</button>
          </div>
          <div className="py-5 px-8 flex justify-center items-center md:flex-row flex-col">



            {
              viewCourseDetails?.uploadedimage.map((item) => (
                <div className='w-65 mx-auto p-2'>

                  <img
                    src={`${serverUrl}/upload/${item}`}
                    alt="Book"
                    className=" w-full rounded" style={{ width: '500px', height: '180px' }}
                  />
                </div>


              ))
            }






          </div>
        </div>
      </div>}

      {/* modal of enroll button */}
      {modalstatus &&
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title */}

                <div class="bg-amber-500 p-4 flex sm:px-6 justify-between">
                  <h1 className='text-white text-2xl font-semibold'>Enroll Now</h1>
                  <FontAwesomeIcon onClick={() => setmodalstatus(false)} icon={faXmark} className='text-white fa-2x' />
                </div>

                {/* body */}
                <div class="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <p className='font-semibold text-lg'>Fill the form and proceed to pay <span className='text-red-700'>$500</span></p>
                  <div className="grid grid-cols-2">
                    <div className='p-3'>
                      <div className="mb-3">
                        <input value={enrollDetails.fullname} onChange={(e) => setEnrollDetails({ ...enrollDetails, fullname: e.target.value })} type="text" placeholder='Full Name' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                      </div>
                      {/* <div className="mb-3">
                                            <input type="text"  placeholder='Email Id' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div> */}

                    </div>
                    <div className='p-3'>
                      <div className="mb-3">
                        <input value={enrollDetails.qualification} onChange={(e) => setEnrollDetails({ ...enrollDetails, qualification: e.target.value })} type="text" placeholder='Qualification' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                      </div>
                      {/* <div className="mb-3">
                                            <input type="text"  placeholder='Phone' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div> */}

                    </div>

                  </div>

                  <div className="mb-3 px-3 w-full">
                    <textarea value={enrollDetails.questions} onChange={(e) => setEnrollDetails({ ...enrollDetails, questions: e.target.value })} name="" id="" placeholder='Your Questions' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full'></textarea>
                  </div>
                  {/* <div className="mb-3 px-3 w-full">
                                    <p className='text-gray-400' >resume</p>
                                    <input type="file" id='fileInput' className='border border-gray-400 rounded placeholder-gray-500 w-full file:bg-gray-400 file:p-2 file:text-white' />
                                </div> */}
                </div>

                {/* footer of modal */}
                <div class="bg-gray-200 px-6 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button onClick={enrollbypayment} type="button" class="inline-flex w-full justify-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border-gray-300">Proceed to Pay</button>
                  <button onClick={handleReset} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black" >Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <ToastContainer theme='colored' position='top-center' autoClose={1500} />
      <Footer />
    </>
  )
}

export default Viewdetails