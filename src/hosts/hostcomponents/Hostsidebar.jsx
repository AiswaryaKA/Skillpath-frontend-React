import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardUser, faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { userProfileUpdateStatusContext } from '../../../contex/Contextshare'
import { serverUrl } from '../../services/serverUrl'

function Hostsidebar() {

  //to update profile
  const [userDetl, setUserDetl] = useState({
    username: "",
    profile: "",
  })
  console.log(userDetl);
  
  const [token, setToken] = useState("")

  const navigate = useNavigate()


  //contextshare
  const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)


  const filter = (data) => {
    if (data == 'dashboard') {
      navigate('/hostprofile')
    }
    else if (data == 'courses') {
      navigate('/hostmycourse')
    }
    else {
      navigate('*');
    }

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

      <div className='p-10 flex justify-start items-start flex-col mt-35 md:mt-0'>
        <div className='flex justify-start items-center flex-col'>

          <img src={userDetl.profile == "" ? "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png" : `${serverUrl}/upload/${userDetl.profile}`} style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
          <h3 className='mt-5 font-medium'>{userDetl.username}</h3>
        </div>
        <div className='my-5 mt-15'>
          <div className='mb-3'>
            <p onClick={() => filter('dashboard')} className='cursor-pointer'><FontAwesomeIcon icon={faHouseUser} className='me-2' />Dashboard</p>
          </div>

          <div className='mb-3'>
            <p onClick={() => filter('courses')} className='cursor-pointer'><FontAwesomeIcon icon={faChalkboardUser} className='me-2' />My Courses</p>
          </div>



        </div>
      </div>


    </>
  )
}

export default Hostsidebar