import { faRegistered, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Usersheader from '../users/userscomponents/Usersheader'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { googleLoginApi, loginApi, registerApi } from '../services/allApi'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'



function Auth({ register }) {
  //for register
  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const navigate = useNavigate()

  //function for register
  const handleRegister = async () => {
    //console.log('Inside');
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('please fill the complete details')
    }
    else {
      //console.log('proceed');

      const result = await registerApi({
        username,
        email,
        password
      })
      console.log(result);

      if (result.status == 200) {
        toast.success('Register successfull')
        setuserDetails({
          username: "",
          email: "",
          password: ""

        })
        navigate('/login')
      }
      else if (result.status == 409) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: ""

        })
      }
      else {
        toast.error('Something went wrong')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }

  }

  //function to login
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('Please enter the complete details')
    } else {
      //console.log('proceed');
      //api
      const result = await loginApi({ email, password })
      console.log(result);

      if (result.status == 200) {
        toast.success('Login successfull')
        //store user data in sessionstorage 
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        //store token in sessionstorage
        sessionStorage.setItem("token", result.data.token)

        setTimeout(() => {
          if (result.data.existingUser.role == "admin") {
            navigate('/adminprofile')
          }
          else {
            navigate('/')
          }
        }, 3000);
      }
      else if (result.status == 401) {
        toast.warning('Incorrect username or password')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else if (result.status == 404) {
        toast.warning('Account does not exists')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went wrong')({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  //function to google-login
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    //API call
    const result = await googleLoginApi({ username: details.name, email: details.email, password: 'googlepassword', photo: details.picture })//password is dummy
    console.log(result);

    if (result.status == 200) {
      toast.success('Login Successfull')
      //store user data in sessionstorage 
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
      //store token in sessionstorage
      sessionStorage.setItem("token", result.data.token)

      setTimeout(() => {
        if (result.data.existingUser.email == "skillpathadmin@gmail.com") {
          navigate('/adminprofile')
        }
        else {
          navigate('/')
        }
      }, 3000);

    }
    else {
      toast.error('Something went wrong')
    }


  }

  return (
    <>
      <Usersheader />
      {register ? <section className='flex justify-center items-center min-h-screen z-0'>

        <div className='flex justify-center items-center bg-amber-500 mt-30 mb-20'>
          <div className='md:grid grid-cols-2 bg-amber-50 shadow-2xl'>

            <div className='bg-amber-300 p-10 md:rounded-r-4xl items-center justify-center shadow-2xl'>

              <div className='flex justify-center items-center'> <h1 className='font-bold text-2xl md:text-3xl md:mt-30'><FontAwesomeIcon icon={faRegistered} bounce style={{ color: "#000000", }} className='fa-x me-3' />Register Here!</h1></div>

              <div className='flex justify-center items-center'> <p className='font-semibold mt-5'>Already Have An Account?</p></div>
              <div className='flex justify-center items-center'> <Link to={'/login'}><button className='text-green-700 font-bold  px-5 py-2 mt-5 underline text-2xl hover:text-green-900 hover:italic'>Login</button></Link></div>

            </div>

            <div className='p-5 w-full'>
              <div className='flex justify-center items-center mt-5'>
                <input type="text" onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} placeholder='username' className='w-full border border-black p-3 rounded' />


              </div>

              <div className='flex justify-center items-center mt-4'>

                <input type="text" onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} placeholder='email' className='w-full border border-black  p-3 rounded' />

              </div>

              <div className='flex justify-center items-center mt-4'>

                <input type="text" onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} placeholder='password' className='w-full border border-black  p-3 rounded' />
              </div>
              <div className='flex justify-center items-center mt-10'>
                <button type='button' onClick={handleRegister} className='w-full bg-green-600 text-white font-bold px-3 py-2'>Register</button>
              </div>
              
            </div>
          </div>
        </div>

      </section>
        :
        <section className='flex justify-center items-center min-h-screen z-0'>

          <div className='flex justify-center items-center bg-amber-500 mt-35 mb-20'>
            <div className='md:grid grid-cols-2 bg-amber-50 shadow-2xl'>

              <div className='p-5 w-full'>
                <div className='flex justify-center items-center mt-4'>

                  <input type="text" onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} placeholder='email' className='w-full border border-black  p-3 rounded' />
                </div>

                <div className='flex justify-center items-center mt-4'>

                  <input type="text" onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} placeholder='password' className='w-full border border-black  p-3 rounded' />
                  {/* eyestatus */}
                  {/* <FontAwesomeIcon icon={faEye} />
                  <FontAwesomeIcon icon={faEyeSlash} /> */}

                </div>

                <div className='flex justify-center items-center mt-4'>
                  <button type='button' onClick={handleLogin} className='w-full bg-green-600 text-white font-bold px-3 py-2'>Login</button>
                </div>
                <hr />
                <div className='flex justify-center items-center flex-col mt-2'>
                  <p>Or</p>
                  <p className='text-red-900'>Login as a user here!</p>
                </div>
                <div className='flex justify-center items-center mt-4'>
                  {/* Google-login */}
                  <GoogleLogin width={500}
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      toast.error('Login Failed');
                    }}
                  />
                </div>
              </div>

              <div className='bg-amber-300 p-10 md:rounded-l-4xl items-center justify-center shadow-2xl'>

                <div className='flex justify-center items-center'> <h1 className='font-bold text-2xl md:text-3xl md:mt-25'><FontAwesomeIcon icon={faSquareCheck} bounce style={{ color: "#000000", }} className='me-3' />Login Here!</h1></div>

                <div className='flex justify-center items-center'> <p className='font-semibold mt-5'>New User?</p></div>
                <div className='flex justify-center items-center'> <Link to={'/register'}><button className='text-green-700 font-bold  px-5 py-2 mt-5 underline text-2xl hover:text-green-900 hover:italic'>Register</button></Link></div>

              </div>


            </div>
          </div>

        </section>}

      <ToastContainer theme='colored' position='top-center' autoClose={1000} hideProgressBar />
      <Footer />
    </>
  )
}

export default Auth