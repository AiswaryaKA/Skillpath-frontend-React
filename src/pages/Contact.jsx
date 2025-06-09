import React from 'react'
import Usersheader from '../users/userscomponents/Usersheader'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

function Contact() {
  return (
    <>
      <Usersheader />

      <div className='flex justify-center items-center flex-col'>
        <h1 className='text-2xl text-center font-bold hover:text-amber-500 mt-35'>Connect with us</h1>
        <div className='flex justify-center items-center'>
          <p className='text-sm md:text-lg font-semibold text-center text-green-800'>We're here to help you on your learning journey.</p>
        </div>

      </div>

      <div className='md:grid grid-cols-3 gap-6 p-10 mt-5'>
        <div className='bg-amber-100 rounded-2xl shadow-md p-6 mt-5 md:mt-0'>
          <h3 className='font-semibold mb-3 text-green-800'>General Inquiries</h3>
          <Link><p className='font-semibold text-amber-800'><FontAwesomeIcon icon={faEnvelope} className='me-2' />skillpath@gmail.com</p></Link>
          <p className='mt-3 font-semibold text-amber-800'><FontAwesomeIcon icon={faPhone} />+91 9935-2366-89</p>
        </div>
        <div className='bg-amber-100 rounded-2xl shadow-md p-6 mt-5 md:mt-0'>
          <h3 className='font-semibold mb-3 text-green-800'>Partner with Us</h3>
          <p className='mt-2'>Let us help you connect with thousands of motivated learners!</p>
          <Link><p className='mt-3 font-semibold text-amber-800'><FontAwesomeIcon icon={faEnvelope} className='me-2' />skillpathpartnership@gmail.com</p></Link>
        </div>
        <div className='bg-amber-100 rounded-2xl shadow-md p-6 mt-5 md:mt-0'>
          <h3 className='font-semibold mb-3 text-green-800'>Technical Support</h3>
          <p className='mt-2'>Experiencing an issue? We're ready to assist.</p>
          <Link><p className='mt-3 font-semibold text-amber-800'><FontAwesomeIcon icon={faEnvelope} className='me-2' />helpskillpath@gmail.com</p></Link>
        </div>
      </div>

     <div className='md:grid grid-cols-2'>
      <div className=' rounded-2xl p-6 mt-5 md:mt-0'>
          <div className='flex  flex-col shadow p-10 rounded'>
              <h3 className='font-bold text-2xl'><FontAwesomeIcon icon={faEnvelope} className='me-2'/>Send Us a Message</h3>
                <form action="">
                  <div className='flex justify-center-safe items-center mt-10'>
                    <input type="text" placeholder='Your Name' className='w-full p-3 bg-amber-50 rounded-2xl'/>
                  </div>
                  <div className='flex justify-center-safe items-center mt-3'>
                    <input type="text" placeholder='Your Email' className='w-full p-3 bg-amber-50 rounded-2xl'/>
                  </div>
                  <div className='flex justify-center-safe items-center mt-3'>
                    <input type="text" placeholder='Subject' className='w-full p-3 bg-amber-50 rounded-2xl'/>
                  </div>
                  <div className='flex justify-center-safe items-center mt-3'>
                    <textarea rows={3} cols={60} name="" id="" placeholder='Your Message' className='bg-amber-50 p-3'></textarea>
                  </div>
                  <div className='flex justify-center-safe items-center mt-6'>
                    <button className='bg-green-700 text-white font-bold w-full p-3 rounded'>Send Message</button>
                  </div>
                </form>
            </div>
      </div>
      <div className=' rounded-2xl p-6 mt-5 md:mt-0 flex justify-center items-center'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.541959083406!2d76.30948063038214!3d10.008897992126684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1747206931648!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"style={{width:'600px' , height:'400px'}}></iframe>
      </div>
                  
     </div>
      



      <Footer />
    </>
  )
}

export default Contact