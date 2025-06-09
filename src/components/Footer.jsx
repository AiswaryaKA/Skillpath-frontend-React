import { faFacebook, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className='md:grid grid-cols-3 bg-amber-100'>
                <div className='flex justify-center items-center flex-col p-6'>
                    <div className='flex md:flex-row'>
                        <div className='flex flex-col p-5'>
                           <Link to={'/'}> <p className='md:text-xl text-lg font-bold'>SkillPath</p></Link>
                            <p className='text-xs font-medium'>Build <span className='text-amber-400'>Skills.</span> <span className='text-green-500'>Start</span> Here.</p>
                            <p className='mt-4' style={{ textAlign: 'justify' }}>SkillPath is your go-to platform to find trusted institutes for learning new skills. Search, explore, and start your journey toward personal and professional growth.</p>
                        </div>

                    </div>
                </div>
                <div className='flex justify-center items-center flex-col p-6'>
                    <h1 className='mt-5 text-lg font-medium text-center'>Links</h1>
                    <ul className='mt-5 text-center'>
                        <Link to={'/explore'}><li>Explore</li></Link>
                       <Link to={'/contact'}> <li>Contact</li></Link>
                       <Link to={'/register'}> <li>Register</li></Link>
                       <Link to={'/login'}><li>Login</li></Link>
                    </ul>
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <h1 className='text-lg font-medium'>Connect with us</h1>
                    <div className='flex mt-5'>
                        <FontAwesomeIcon icon={faInstagram} className='ms-4' />
                        <FontAwesomeIcon icon={faFacebook} className='ms-4' />
                        <FontAwesomeIcon icon={faLinkedinIn} className='ms-4' />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer