import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './users/userspages/Home'
import Auth from './pages/Auth'
import PageNotFound from './pages/PageNotFound'
import Preloader from './components/Preloader'
import { useEffect, useState } from 'react'
import Explore from './users/userspages/Explore'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './users/userspages/Profile'
import Viewdetails from './users/userspages/Viewdetails'
import Hostprofile from './hosts/hostpages/Hostprofile'
import Hostmycourses from './hosts/hostpages/Hostmycourses'
import Adminprofile from './admin/pages/Adminprofile'
import PaymentSuccess from './users/userspages/PaymentSuccess'
import Paymenterror from './users/userspages/Paymenterror'


function App() {

  const [isloading, setIsloading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsloading(true)
    }, 5500)
  }, [])

  return (
    <>
      <Routes>

        <Route path='/' element={isloading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/viewdetails/:id' element={<Viewdetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        {/* users */}
        <Route path='/profile' element={<Profile />} />

        {/* admin */}
        <Route path='/adminprofile' element={<Adminprofile />} />

        {/* Host */}
        <Route path='/hostprofile' element={<Hostprofile />} />
        <Route path='/hostmycourse' element={<Hostmycourses />} />

        {/* Payment-user */}
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/paymenterror' element={<Paymenterror />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

    </>
  )
}

export default App
