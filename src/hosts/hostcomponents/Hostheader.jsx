import { faAddressCard, faPowerOff, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Hostheader() {


    const [token, setToken] = useState("")
    console.log(token);
    const [dropdownStatus, setdropdownStatus] = useState(false)

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
        }
    }, [])

    return (
        <>
            <div className='md:grid grid-cols-2 p-2 md:p-3 bg-green-100 shadow fixed w-full'>
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

                     {!token ? <Link to={'/login'}><button className='px-3 py-2 hover:text-amber-300 text-green-800 hover:border hover:border-amber-400 me-5 rounded'>Login</button></Link>
                    :
                    <div className='hidden md:flex'>
                        <div className='flex'>
                            <p onClick={() => setdropdownStatus(!dropdownStatus)} class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-green-50" >
                                <p className='italic text-green-900'>Username</p>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqrXX_PYWGithwWNEkgs5PPJktUO6P7HmEGw&s" alt="no image" style={{ width: '30px', height: '30px' }} className='mx-3 rounded-full' />
                            </p>

                            {dropdownStatus &&
                             <div className='flex'>
                                 <div class="absolute right-0 z-20 mt-15 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div class="py-1" role="none">
    
                                        <Link to={'/profile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' />Profile</p></Link>
                                        <Link to={'/hostprofile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faUserPlus} className='me-2' />Become A Host</p></Link>
    
                                        <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>
    
                                    </div>
                                </div>
                             </div>
                            }
                        </div>
                    </div>}
                    

                </div>
            </div>
            <div className='w-full z-50 bg-green-900 fixed top-18 flex justify-between md:justify-center items-center px-5 py-3'>
                <h1 className='md:text-center text-xs md:text-xl font-bold text-white'>Welcome
                    ! Here you can post your new courses...
                </h1>
                {!token ? <Link to={'/login'}><button className='px-3 py-2 hover:text-amber-300 text-green-800 hover:border hover:border-amber-400 me-5 rounded'>Login</button></Link>
                    :
                    <div className='md:hidden'>
                        <div className='flex'>
                            <p onClick={() => setdropdownStatus(!dropdownStatus)} class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50" >
                                <p className='italic text-green-900'>Username</p>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqrXX_PYWGithwWNEkgs5PPJktUO6P7HmEGw&s" alt="no image" style={{ width: '30px', height: '30px' }} className='mx-3 rounded-full' />
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

        </>
    )
}

export default Hostheader