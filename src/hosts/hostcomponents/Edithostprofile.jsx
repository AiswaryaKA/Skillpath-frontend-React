import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function Edithostprofile() {

    const [offcanvasStatus, setoffcanvasStatus] = useState(false)
    return (
        <>
            <div>
                <button   onClick={() => setoffcanvasStatus(true)} className="text-green-900 border border-green-900 rounded p-3 hover:bg-green-900 hover:text-white">

                    <FontAwesomeIcon icon={faPenToSquare} className='me-2'/>
                    Edit your profile
                </button>
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
                                icon={faXmark} className='mt-2'/>
                        </div>
                        <div className="flex justify-center items-center  flex-col">
                            <div className="relative">
                                <label htmlFor="hostprofilefile" className="relative cursor-pointer">
                                    <input type="file" id="hostprofilefile" style={{ display: "none" }} />

                                    <div className='flex justify-start items-center flex-col mt-3'>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqrXX_PYWGithwWNEkgs5PPJktUO6P7HmEGw&s" alt="no image" style={{ borderRadius: '50%', width: '150px', height: '150px' }} />

                                    </div>

                                    <div className="absolute bottom-2 right-2 bg-gray-500 text-white py-2 px-3 rounded-full">
                                        <FontAwesomeIcon icon={faPen} />
                                    </div>
                                </label>
                            </div>
                            <div className="mb-3 w-full mt-5 px-5">
                                <input type="text" placeholder="Username" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
                            </div>

                            <div className="mb-3 w-full mt-5 px-5">
                                <input type="text" placeholder="Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
                            </div>

                            <div className="mb-3 w-full mt-5 px-5">
                                <input type="text" placeholder="Confirm Password" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded" />
                            </div>

                            <div className="mb-3 w-full mt-5 px-5">
                                <textarea type="text" placeholder="Bio" className="w-full border border-gray-300 placeholder:bg-gray-200 p-2 rounded"></textarea>
                            </div>

                            <div className="flex">
                                <button type="button" className="bg-amber-600 text-black rounded py-2 px-5 hover:text-white ">Reset</button>
                                <button type="button" className="bg-green-600 text-black rounded py-2 px-5 hover:text-white ms-3">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}

export default Edithostprofile