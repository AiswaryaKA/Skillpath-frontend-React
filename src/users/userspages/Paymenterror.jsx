import React from 'react'
import Usersheader from '../userscomponents/Usersheader'
import { Link } from 'react-router-dom'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Paymenterror() {
  return (
    <>
    <Usersheader/>
    
    <div>
        <div className='md:flex justify-center items-center p-5  '>
            

            <div className='md:grid grid-cols-3'>
                <div></div>
                <div className='flex justify-content-center items-center flex-col shadow-xl text-center rounded p-10 mt-20'>
                    <img src="https://epay.upnm.edu.my/assets/img/cards/fail_anim.gif"   className='w-full' alt="no image" style={{width:'250px' , height:"200px"}}/>
                    <h1 className='font-bold text-2xl text-red-800'>Sorry ! Your payment is unsuccesfull</h1>
                    <p className='text-center text-xs'>We apologize for the inconvience caused and appreciate your visit to <span className='font-bold'>Skillpath</span></p>
                    <Link to={'/explore'}> <button className='bg-green-800 px-6 py-3 text-white rounded my-5 hover:bg-white hover:border hover:border-green-800 hover:text-green-800 font-medium'><FontAwesomeIcon icon={faBackward} className='me-2'/>Find more Courses</button></Link>

                </div>
                <div></div>

            </div>

             

        </div>

    </div>

    <Footer/>
    
    
    </>
  )
}

export default Paymenterror