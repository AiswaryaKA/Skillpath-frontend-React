import { faPlus, faSquarePlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { uploadCourseApi } from '../../services/allApi'

export default function Addcourse() {

  const [modalstatus, setmodalstatus] = useState(false)
  const [courseDetails, setCourseDetails] = useState({
    coursename: "", description: "", institutename: "", location: "", mode: "", duration: "", noofseats: "", syllabus: "", coursefee: "", category: "",institutelink:"" ,courseimageurl: "",
    uploadedImages: []
  })
  console.log(courseDetails);
  //to dispaly the image in the course details form
  const [preview, setPreview] = useState("")
  //to display small images in coursedetails form
  const [previewList, setPreviewList] = useState([])
  const [token, setToken] = useState("")


  //function to access uploaded image
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    //store uploaded images to the array
    const fileArray = courseDetails.uploadedImages
    fileArray.push(e.target.files[0])
    //update the state with the new array
    setCourseDetails({ ...courseDetails, uploadedImages: fileArray })

    //to convert images uploaded in array to url - URL.createObjectURL
    const url = URL.createObjectURL(e.target.files[0])
    console.log(url);

    setPreview(url)

    //push each image url to array
    const newArray = previewList
    newArray.push(url)
    setPreviewList(newArray)

  }

  //function to reset
  const handleReset = () => {
    setCourseDetails({
      coursename: "", description: "", institutename: "", location: "", mode: "", duration: "", noofseats: "", syllabus: "", coursefee: "", category: "", institutelink:"" ,courseimageurl: "",
      uploadedImages: []
    })
    setPreview("")
    setPreviewList([])
  }

  //function to submit

  const handleSubmit = async () => {
    const { coursename, description, institutename, location, mode, duration, noofseats, syllabus, coursefee, category,institutelink , courseimageurl, uploadedImages } = courseDetails

    if (!coursename || !description || !institutename || !location || !mode || !duration || !noofseats || !syllabus || !coursefee || !category || !institutelink ||!courseimageurl || uploadedImages.length == 0) {
      toast.info('Please fill the fields completely')
    }
    else {
      //create reqheader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      //create reqbody
      const reqBody = new FormData() //uploaded content should be sent in the form of formData

      for (let key in courseDetails) {
        if (key != 'uploadedImages') {
          reqBody.append(key, courseDetails[key])
        }
        else {
          courseDetails.uploadedImages.forEach((item) => {
            reqBody.append("uploadedImages", item)
          })
        }
      }
      //api call
      const result = await uploadCourseApi(reqBody, reqHeader)
      console.log(result);

      if (result.status == 401) {
        toast.warning(result.response.data)
        handleReset()
      }
      else if (result.status == 200) {
        toast.success('Course added successfully')
        handleReset()
      }
      else {
        toast.error('Something went wrong')
        handleReset()
      }

    }
  }


  //open modal
  const openModal = () => {
    setmodalstatus(true)
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  return (
    <>

      <div className='flex md:justify-center items-start justify-end'>
        <button onClick={() => openModal()}
          className="hover:text-green-900 border hover:border-green-900 rounded p-3 bg-green-900 text-white hover:bg-white"><FontAwesomeIcon icon={faPlus} className='me-2' />Add Course</button>
      </div>


      {modalstatus &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl"> {/* Wider modal */}

                {/* Title */}
                <div className="bg-green-900 p-4 flex sm:px-6 justify-between items-center">
                  <h1 className="text-white text-2xl font-bold">Course Details</h1>
                  <FontAwesomeIcon onClick={() => setmodalstatus(false)} icon={faXmark} className="text-white fa-2x cursor-pointer" />
                </div>

                {/* Body */}
                <div className="bg-amber-50 p-6 sm:p-10 mb-20 mt-5 sm:mt-10 mx-2 sm:mx-5 shadow-2xl">


                  <div className="flex flex-col md:flex-row gap-6 w-full">
                    {/* Left Side */}
                    <div className="w-full md:w-1/2 px-2">
                      <div className="mb-3">
                        <input value={courseDetails.coursename} onChange={(e) => setCourseDetails({ ...courseDetails, coursename: e.target.value })} type="text" placeholder="Course name" className="p-2  rounded bg-white placeholder:text-gray-600 w-full shadow " />
                      </div>
                      <div className="mb-3">
                        <textarea value={courseDetails.description} onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })} rows={5} placeholder="Description" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow  "></textarea>
                      </div>
                      <div className="mb-3">
                        <input value={courseDetails.institutename} onChange={(e) => setCourseDetails({ ...courseDetails, institutename: e.target.value })} type="text" placeholder="Institute name" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />
                      </div>
                      <div className="mb-3">
                        <input value={courseDetails.location} onChange={(e) => setCourseDetails({ ...courseDetails, location: e.target.value })} type="text" placeholder="Location" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow  " />
                      </div>
                      <div className="mb-3">
                        <input value={courseDetails.mode} onChange={(e) => setCourseDetails({ ...courseDetails, mode: e.target.value })} type="text" placeholder="Mode - Online/Offline" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />
                      </div>
                      <div className="mb-3 flex justify-center items-center w-full mt-10">
                        {!preview ? <label htmlFor="imagefile">
                          <input onChange={(e) => handleUpload(e)} type="file" name="" id="imagefile" style={{ display: 'none' }} />
                          <img src="https://static.vecteezy.com/system/resources/previews/016/314/480/non_2x/transparent-image-upload-free-png.png" alt="no image" style={{ width: '200px', height: '200px' }} />

                        </label>

                          :
                          <img src={preview} alt="no image" style={{ width: '200px', height: '200px' }} />
                        }


                      </div>
                      {preview && <div className='flex justify-center items-center'>

                        {previewList?.map((item, index) => (
                          <img src={item} alt="" key={index} style={{ width: '70px', height: '70px' }} className='mx-3 mb-3' />
                        ))
                        }


                        {previewList?.length < 3 && <label htmlFor="imagefile">
                          <input onChange={(e) => handleUpload(e)} type="file" name="" id="imagefile" style={{ display: 'none' }} />
                          <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3 text-green-900' />

                        </label>}





                      </div>}
                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/2 px-2">
                      <div className="mb-3">
                        <input value={courseDetails.duration} onChange={(e) => setCourseDetails({ ...courseDetails, duration: e.target.value })} type="text" placeholder="Duration" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />
                      </div>
                      <div className="mb-3">
                        <input value={courseDetails.noofseats} onChange={(e) => setCourseDetails({ ...courseDetails, noofseats: e.target.value })} type="text" placeholder="No of Seats" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />
                      </div>
                      <div className="mb-3">
                        <textarea value={courseDetails.syllabus} onChange={(e) => setCourseDetails({ ...courseDetails, syllabus: e.target.value })} rows={10} placeholder="Course Syllabus" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow "></textarea>
                      </div>
                      
                      <div className="mb-3">
                        <input value={courseDetails.institutelink} onChange={(e) => setCourseDetails({ ...courseDetails, institutelink: e.target.value })} type="text" placeholder="Institute Link" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />
                      </div>

                      <div className="mb-3">
                        <input value={courseDetails.courseimageurl} onChange={(e) => setCourseDetails({ ...courseDetails, courseimageurl: e.target.value })} type="text" placeholder="Imageurl" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />

                      </div>

                      <div className="mb-3">
                        <input value={courseDetails.coursefee} onChange={(e) => setCourseDetails({ ...courseDetails, coursefee: e.target.value })} type="text" placeholder="Course fee" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />

                      </div>
                       <div className="mb-3">
                        <input value={courseDetails.category} onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })} type="text" placeholder="Category" className="p-2 bg-white rounded placeholder:text-gray-600 w-full shadow " />

                      </div>

                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-200 px-4 py-3 flex flex-col sm:flex-row-reverse sm:justify-end gap-2 sm:gap-4 sm:px-6">
                  <button onClick={handleSubmit} className="bg-green-900 px-6 py-2 rounded font-semibold text-white hover:bg-green-950">Submit</button>
                  <button onClick={handleReset} className="bg-gray-600 px-6 py-2 rounded text-white font-semibold hover:bg-gray-900">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>

  )
}
