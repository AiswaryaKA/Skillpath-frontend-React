import React, { useState } from 'react'


function LR() {
   const [isLogin, setIsLogin] = useState(false);

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-amber-100 p-4">
      <div className="relative w-full max-w-4xl bg-amber-50 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-700 ease-in-out">
        
        {/* Blue Side Panel with Slide Animation */}
        <div className={`absolute top-0 h-full w-full md:w-1/2 bg-amber-300 text-white flex flex-col justify-center items-center p-8 z-10 transition-all duration-700 ease-in-out ${isLogin ? 'left-0' : 'right-0 md:left-1/2'} rounded-3xl`}>

          <h2 className="text-2xl font-bold mb-2 text-black">{isLogin ? 'Hello Again!' : 'Welcome Back!'}</h2>
          <p className="mb-6 text-sm text-black">{isLogin ? 'New here?' : 'Already have an account?'}</p>
          
          <button
            className="py-2 px-6 rounded hover:bg-green-600 bg-green-500  transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>

        {/* Registration Form */}
        <div className={`w-full md:w-1/2 p-8 transition-opacity duration-500 ${isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100 z-20'}`}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Registration</h2>
          <form className="space-y-4">
            <div className="flex items-center border rounded px-3 py-2 bg-amber-50">
             
              <input type="text" placeholder="Username" className="bg-transparent outline-none w-full" />
            </div>
            <div className="flex items-center border rounded px-3 py-2 bg-amber-50">
             
              <input type="email" placeholder="Email" className="bg-transparent outline-none w-full" />
            </div>
            <div className="flex items-center border rounded px-3 py-2 bg-amber-50">
             
              <input type="password" placeholder="Password" className="bg-transparent outline-none w-full" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 my-4">or register with social platforms</p>
          <div className="flex justify-center gap-4">
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-google text-lg"></i>
            </button>
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-facebook-f text-lg"></i>
            </button>
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-pinterest text-lg"></i>
            </button>
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-linkedin-in text-lg"></i>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className={`w-full md:w-1/2 p-8 transition-opacity duration-500 ${isLogin ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <form className="space-y-4">
            <div className="flex items-center border rounded px-3 py-2 bg-gray-100">
              <i className="fas fa-envelope text-gray-500 mr-2"></i>
              <input type="email" placeholder="Email" className="bg-transparent outline-none w-full" />
            </div>
            <div className="flex items-center border rounded px-3 py-2 bg-gray-100">
              <i className="fas fa-lock text-gray-500 mr-2"></i>
              <input type="password" placeholder="Password" className="bg-transparent outline-none w-full" />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 my-4">or login with social platforms</p>
          <div className="flex justify-center gap-4">
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-google text-lg"></i>
            </button>
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-facebook-f text-lg"></i>
            </button>
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-pinterest text-lg"></i>
            </button>
            <button className="border p-2 rounded-full hover:bg-gray-100 transition">
              <i className="fab fa-linkedin-in text-lg"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default LR