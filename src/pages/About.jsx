import React from 'react'
import Usersheader from '../users/userscomponents/Usersheader'
import Footer from '../components/Footer'

function About() {
  return (
    <>
      <Usersheader />

      <div className='flex flex-col'>
        <h3 className='mt-35 text-center font-bold text-2xl'>About us</h3>
        <p className='text-center font-semibold'>Know more about us</p>
        <div className='md:grid grid-cols-2 mt-8 p-8'>

          <div className='flex justify-center items-center flex-col p-8'>
            <p className='font-medium' style={{ textAlign: 'justify' }}>SkillPath is your gateway to discovering skill-based learning opportunities tailored to your interests and goals.

              We believe that education doesn't just happen in schools—it happens wherever people are empowered to grow. Whether you’re looking to learn web development, graphic design, robotics, or music, SkillPath helps you find the right institute, explore verified courses, and enroll with ease.</p>

            <h3 className='font-semibold text-lg mt-10'> Our Mission</h3>
            <p className='font-medium p-8' style={{ textAlign: 'justify' }}>To bridge the gap between passionate learners and quality skill-based educators by building a trusted, accessible, and efficient discovery platform.

             Whether you're learning or teaching — SkillPath is where skills take shape.</p>
          </div>
          <div className=''>
            
              <div  className='flex justify-center items-center'><img src="https://img.freepik.com/premium-vector/online-learning-concept-vector-illustration_235222-1264.jpg" alt="no image" style={{width:'400px' , height:'400px'}} className=''/></div>
            
           
          </div>
        </div>

      </div>
      <Footer />

    </>
  )
}

export default About