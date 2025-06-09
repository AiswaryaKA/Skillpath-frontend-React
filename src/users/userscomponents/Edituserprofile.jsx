import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { updateUserProfileApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { userProfileUpdateStatusContext } from '../../../contex/Contextshare'

function Edituserprofile() {

    const [offcanvasStatus, setoffcanvasStatus] = useState(false)

    //to updata profile
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        cPassword: "",
        profile: "",
        bio: ""
    })
    console.log(userDetails);

    //to work useeffect again
    const [upadateStatus, setUpdateStatus] = useState({})
    //to store profile image
    const [existinguserProfileImage, setExistinguserprofileImage] = useState("")
    //to store token
    const [token, setToken] = useState("")
    //to view profile
    const [preview, setPreview] = useState("")

    //contextShare
    const {setUserProfileUpdateStatus} = useContext(userProfileUpdateStatusContext)
    //function add details to update profile
    const handleFileAdd = (e) => {
        //console.log(e.target.files[0]);
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        //console.log(userDetails.profile);

        if (e.target.files[0] != "") {
            const url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    console.log(preview);
    //function to reset
    const handleReset = () => {

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)

            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({ username: user.username, password: user.password, cPassword: user.password, bio: user.bio })
            setExistinguserprofileImage(user.profile)

        }
        setPreview("")


    }

    //function to update
    const handleUpdate = async () => {
        const { username, password, cPassword, profile, bio } = userDetails
        console.log(username, password, cPassword, profile, bio);

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

                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key])
                    }
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateUserProfileApi(reqBody, reqHeader)
                    console.log(result);

                    if (result.status == 200) {
                        toast.success('Profile Updated Successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setUserProfileUpdateStatus(result.data)
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
                    const result = await updateUserProfileApi({ username, password, profile: existinguserProfileImage, bio }, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success('Profile Updated Successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setUserProfileUpdateStatus(result.data)
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

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)

            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({ username: user.username, password: user.password, cPassword: user.password, bio: user.bio })
            setExistinguserprofileImage(user.profile)

        }
    }, [upadateStatus])





    return (
        <>
            <div>
                {/* <button onClick={() => setoffcanvasStatus(true)} className='bg-amber-50 border border-green-800 hover:bg-green-800 text-green-800 hover:text-white font-bold rounded px-2 py-2'><FontAwesomeIcon icon={faPen} className=' me-2' />Profile</button> */}
                <button onClick={() => setoffcanvasStatus(true)} className='hover:text-green-800'><FontAwesomeIcon icon={faPen} className=' me-2 ' />Profile</button>
            </div>

            {offcanvasStatus &&
                <div>
                    {/* to make background light */}
                    <div onClick={() => setoffcanvasStatus(false)} className="fixed inset-0 bg-gray-500/75 transition-opacity"
                    ></div>
                    {/* offcavas content */}
                    <div className="bg-amber-50 min-h-screen w-90 z-50 fixed top-0 left-0">
                        {/* title od offcanvas */}
                        <div className="bg-green-900 text-white text-lg px-2 py-2 flex justify-between">
                            <h1>Edit User Profile</h1>
                            <FontAwesomeIcon onClick={() => setoffcanvasStatus(false)}
                                icon={faXmark} className='mt-2' />
                        </div>
                        <div className="flex justify-center items-center  flex-col">
                            <div className="relative">
                                <label htmlFor="hostprofilefile" className="relative cursor-pointer">
                                    <input onChange={(e) => handleFileAdd(e)} type="file" id="hostprofilefile" style={{ display: "none" }} />

                                    <div className='flex justify-start items-center flex-col mt-3'>
                                        {existinguserProfileImage == "" ? <img src={preview ? preview : "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"} style={{ borderRadius: '50%', width: '150px', height: '150px' }} /> :
                                            <img src={preview ? preview : `${serverUrl}/upload/${existinguserProfileImage}`} style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
                                        }

                                    </div>

                                    <div className="absolute bottom-2 right-2 bg-gray-500 text-white py-2 px-3 rounded-full">
                                        <FontAwesomeIcon icon={faPen} />
                                    </div>
                                </label>
                            </div>
                            <div className="mb-3 w-full mt-5 px-5">
                                <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder="Username" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
                            </div>

                            <div className="mb-3 w-full mt-5 px-5">
                                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder="Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
                            </div>

                            <div className="mb-3 w-full mt-5 px-5">
                                <input value={userDetails.cPassword} onChange={(e) => setUserDetails({ ...userDetails, cPassword: e.target.value })} type="text" placeholder="Confirm Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
                            </div>

                            <div className="mb-3 w-full mt-5 px-5">
                                <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} type="text" placeholder="Bio" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded"></textarea>
                            </div>

                            <div className="flex">
                                <button onClick={handleReset} type="button" className="bg-amber-600 text-black rounded py-2 px-5 hover:text-white ">Reset</button>
                                <button onClick={handleUpdate} type="button" className="bg-green-600 text-black rounded py-2 px-5 hover:text-white ms-3">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <ToastContainer theme='colored' position='top-center' autoClose={1500} />
        </>
    )
}

export default Edituserprofile