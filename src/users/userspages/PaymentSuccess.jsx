import React from 'react'
import Usersheader from '../userscomponents/Usersheader'
import { Link } from 'react-router-dom'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../../components/Footer'

function PaymentSuccess() {
  return (
    <>
    <Usersheader/>
    
    <div>
        <div className='md:flex justify-center items-center p-5  '>
            

            <div className='md:grid grid-cols-3'>
                <div></div>
                <div className='flex justify-content-center items-center flex-col shadow-xl text-center rounded p-5 mt-23'>
                    <img src="https://static.wixstatic.com/media/d509f2_40639edcd3414e038b43579c9c1bbc71~mv2.gif" className='w-full' alt="no image" style={{width:'250px' , height:"200px"}}/>
                    <h1 className='font-bold text-2xl text-green-800'>Congratulations ! Your Payment is successfull</h1>
                    <p className='text-center text-xs'>Thankyou for connecting with <span className='font-bold'>SKillpath </span>. Hope you have a good time with us</p>
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

export default PaymentSuccess