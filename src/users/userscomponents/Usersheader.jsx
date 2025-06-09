import { faAddressCard, faBars, faBookOpen, faCircleInfo, faHouse, faPhone, faPowerOff, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userProfileUpdateStatusContext } from '../../../contex/Contextshare'
import { serverUrl } from '../../services/serverUrl'



function Usersheader() {

    const [status, setstatus] = useState(false)
    const [token, setToken] = useState("")
    const [dropdownStatus, setdropdownStatus] = useState(false)
    const [userDetl, setUserDetl] = useState({
        username: "",
        profile: "",
    })


    //contextshare
    const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)

    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem("token")
        setToken("")
        navigate('/')
    }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetl({ username: user.username, profile: user.profile })


        }
    }, [userProfileUpdateStatus])
    return (
        <>
            <div className='md:grid grid-cols-3 p-2 md:p-3 bg-white shadow fixed w-full z-50'>
                <div className='flex md:flex-row'>
                    <img src="../public/images/logobg.png" alt="logo" style={{ width: '60px', height: '60px' }} />
                    <Link to={'/'}>
                        <div className='flex flex-col'>
                            <p className='md:text-xl text-lg font-bold transition'>SkillPath</p>
                            <p className='text-xs font-medium'>Build <span className='text-amber-400'>Skills.</span> <span className='text-green-500'>Start</span> Here.</p>
                        </div>
                    </Link>
                </div>
                <div className='md:hidden flex justify-between items-center bg-amber-400 px-4'>
                    <button onClick={() => setstatus(!status)} className='text-2xl '><FontAwesomeIcon icon={faBars} style={{ color: "#000000", }} /></button>

                    {!token ? <Link to={'/login'}><button className='px-3 py-2 hover:text-amber-300 text-green-800 hover:border hover:border-amber-400 me-5 rounded'>Login</button></Link>
                        :
                        <div className='md:hidden'>
                            <div className='flex'>
                                <p onClick={() => setdropdownStatus(!dropdownStatus)} class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50" >
                                    <p className='italic text-green-900'>{userDetl.username}</p>
                                    <img src={userDetl.profile == "" ? "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png" : `${serverUrl}/upload/${userDetl.profile}`} alt="no image" style={{ width: '30px', height: '30px' }} className='mx-3 rounded-full' />
                                </p>

                                {dropdownStatus && <div class="absolute right-0 z-10 mt-15 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div class="py-1" role="none">

                                        <Link to={'/profile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' />Profile</p></Link>
                                        <Link to={'/hostprofile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faUserPlus} className='me-2' />Become A Host</p></Link>

                                        <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

                                    </div>
                                </div>}
                            </div>
                        </div>}




                </div>
                <div className='md:flex justify-center items-center bg-amber-100 md:bg-white'>
                    <ul className={status ? 'md-flex' : 'md:flex justify-center hidden '}>
                        <Link to={'/'}> <li className='mx-4 mt-3 md:mt-0 text-green-800 hover:text-amber-400 hover:underline'><FontAwesomeIcon icon={faHouse} className='me-1 text-xs' />Home</li></Link>
                        <Link to={'/about'}><li className='mx-4 mt-3 md:mt-0 text-green-800 hover:text-amber-400 hover:underline'><FontAwesomeIcon icon={faCircleInfo} className='me-1 text-xs' />About</li></Link>
                        <Link to={'/explore'}><li className='mx-4 mt-3 md:mt-0 text-green-800 hover:text-amber-400 hover:underline'><FontAwesomeIcon icon={faBookOpen} className='me-1 text-xs' />Courses</li></Link>
                        <Link to={'/contact'}><li className='mx-4 mt-3 md:mt-0 text-green-800 hover:text-amber-400 hover:underline'><FontAwesomeIcon icon={faPhone} className='me-1 text-xs' />Contact</li></Link>

                        <button className='md:hidden rounded px-3 py-2 mx-2 my-2 bg-amber-700 text-white font-bold'>Register</button>
                    </ul>


                </div>

                <div className='md:flex justify-end items-center hidden'>


                    {!token ? <Link to={'/login'}><button className='px-3 py-2 hover:text-amber-300 text-green-800 hover:border hover:border-amber-400 me-5 rounded'>Login</button></Link>
                        :
                        <div className='flex'>
                            <p onClick={() => setdropdownStatus(!dropdownStatus)} class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50" >
                                <p className='italic text-green-800'>{userDetl.username}</p>
                                <img src={userDetl.profile == "" ? "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png" : `${serverUrl}/upload/${userDetl.profile}`} alt="no image" style={{ width: '30px', height: '30px' }} className='mx-3 rounded-full' />
                            </p>

                            {dropdownStatus && <div class="absolute right-0 z-10 mt-15 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div class="py-1" role="none">

                                    <Link to={'/profile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' />Profile</p></Link>
                                    <Link to={'/hostprofile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faUserPlus} className='me-2' />Become A Host</p></Link>

                                    <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

                                </div>
                            </div>}
                        </div>}

                </div>
            </div>



        </>
    )
}

export default Usersheader