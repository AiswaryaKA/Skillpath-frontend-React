import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../../contex/Contextshare'

function Adminheader() {

    //to update profile
    const [adminDetl, setAdminDetl] = useState({
        username: "",
        profile: ""
    })

    //to store token
    const [token, setToken] = useState("")

    //contextShare to update profile
    const { adminProfileUpdateStatus } = useContext(adminProfileUpdateStatusContext)

    //to logout
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem("token")
        setToken("")
        navigate('/')
    }

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        if (user) {
            setAdminDetl({ username: user.username, profile: user.profile })
        } else {
            setAdminDetl({ username: "", profile: "" }) // fallback to empty values
        }
    }, [adminProfileUpdateStatus])

    return (
        <>
            <div className='md:grid grid-cols-2 p-2 md:p-3 z-50 bg-amber-100 shadow fixed w-full'>
                {/* Logo */}
                <div className='flex md:flex-row'>
                    <img src="../public/images/logobg.png" alt="logo" style={{ width: '60px', height: '60px' }} />
                    <Link to={'/'}>
                        <div className='flex flex-col'>
                            <p className='md:text-xl text-lg font-bold transition'>SkillPath</p>
                            <p className='text-xs font-medium'>Build <span className='text-amber-400'>Skills.</span> <span className='text-green-500'>Start</span> Here.</p>
                        </div>
                    </Link>
                </div>

                <div className='md:flex md:justify-end items-center justify-center hidden'>
                    <button onClick={logout} className='px-5 py-2 rounded bg-green-900 text-white font-bold hover:bg-amber-400 hover:text-lg'>Logout</button>
                </div>
            </div>

            {/* Small screen */}
            <div className='w-full bg-green-900 fixed top-18 z-50 flex justify-between md:justify-end items-center px-5 py-3'>
                <div>
                    <img src={adminDetl.profile == "" ? "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png" : `${serverUrl}/upload/${adminDetl.profile}`} alt="no image" style={{ width: '50px', height: '50px' }} className='mx-3 rounded-full md:hidden' />
                    <h1 className='md:text-center text-xs md:text-xl font-bold text-white'>Welcome {adminDetl.username}...</h1>
                </div>
                <div>
                    {/* Larger screen */}
                    <img src={adminDetl.profile == "" ? "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png" : `${serverUrl}/upload/${adminDetl.profile}`} alt="no image" style={{ width: '80px', height: '80px' }} className='mx-3 rounded-full hidden md:flex' />
                </div>
                <button onClick={logout} className='md:hidden px-5 py-2 rounded bg-green-900 text-white font-bold hover:bg-amber-400 hover:text-lg border border-white hover:text-amber-500'>Logout</button>
            </div>

        </>
    )
}

export default Adminheader