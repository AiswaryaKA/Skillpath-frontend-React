import React, { useEffect, useState } from 'react'
import Usersheader from '../userscomponents/Usersheader'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCircleCheck, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getAllCoursesApi } from '../../services/allApi'

function Explore() {

    //store token
    const [token, setToken] = useState("")
    //to store result
    const [allCourses, setAllCourses] = useState([])
    const [tempArray, setTempArray] = useState([])
    //to search 
    const [searchKey, setSearchKey] = useState("")
    console.log(searchKey);

    //to get all courses
    const getAllCourse = async (searchKey, tok) => {

        //create reqheader
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        }
        const result = await getAllCoursesApi(searchKey, reqHeader)
        //console.log(result);

        if (result.status == 200) {
            setAllCourses(result.data)
            setTempArray(result.data)
        }

    }
    // console.log(allCourses);

    //to filter based on category
    const filter = (data) => {
        if (data == 'all') {
            setAllCourses(tempArray)
        }
        else {
            setAllCourses(tempArray.filter((item) => item.category.toLowerCase() == data.toLowerCase()))


        }
    }
    //filter based on location
    // const filterLocation = (data) => {
    //     setAllCourses(allCourses.filter((item) => item.location.toLowerCase() == data.toLowerCase()))
    // }




    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)
            getAllCourse(searchKey, tok)
        }
    }, [searchKey])
    return (
        <>
            <Usersheader />

            {/* logged in */}
            {token && <section className='min-h-screen bg-white'>
                <div className='flex justify-center items-center flex-col'>
                    <h1 className='mt-35 text-3xl font-bold mb-5'>Find Your Courses<FontAwesomeIcon icon={faAngleDown} className='ms-2' /></h1>

                    <div className='flex my-1 mx-10 w-full justify-center items-center px-30'>
                        <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Here you can search your courses based on location , mode , coursename...' className='w-full px-6 py-2 border rounded border-gray-800' />
                        {/* <div className='flex justify-center items-center mt-6'>
                            <button className='bg-green-600 px-3 py-4 text-white font-bold'>Search</button>
                        </div> */}
                    </div>
                </div>

                <div className='md:grid grid-cols-[1fr_4fr] md:px-10 px-5 mt-8'>

                    {/* filter - category */}
                    <div className='shadow p-5 bg-amber-100 rounded-t-2xl'>
                        <h3 className='font-bold text-xl'>Category</h3>

                        <div className='mt-5' onClick={() => filter('all')}>
                            <input type="radio" id='all' className='accent-green-800' name='filter' />
                            <label htmlFor='all' className='ms-3 text-lg font-semibold'>All Courses</label>
                        </div>

                        <div className='mt-5' onClick={() => filter('coding')}>
                            <input type="radio" id='coding' className='accent-green-800' name='filter' />
                            <label htmlFor='coding' className='ms-3 text-lg font-semibold'>Coding</label>
                        </div>
                        <div className='mt-3' onClick={() => filter('business')}>
                            <input type="radio" id='business' className='accent-green-800' name='filter' />
                            <label htmlFor='business' className='ms-3 text-lg font-semibold'>Business</label>
                        </div>
                        <div className='mt-3' onClick={() => filter('accountancy')}>
                            <input type="radio" id='accountancy' className='accent-green-800' name='filter' />
                            <label htmlFor='accountancy' className='ms-3 text-lg font-semibold'>Accountancy</label>
                        </div>
                        <div className='mt-3' onClick={() => filter('designing')}>
                            <input type="radio" id='designing' className='accent-green-800' name='filter' />
                            <label htmlFor='designing' className='ms-3 text-lg font-semibold'>Designing</label>
                        </div>
                        {/* location filter */}
                        {/* <h3 className='font-bold text-xl mt-10'>Location</h3>

                        <div className='mt-3' onClick={() => filterLocation('kochi')}>
                            <input type="radio" id='kochi' className='accent-green-800' name='filterlocation' />
                            <label htmlFor='kochi' className='ms-3 text-lg font-semibold'>Kochi</label>
                        </div>
                        <div className='mt-3' onClick={() => filterLocation('thrissur')}>
                            <input type="radio" id='thrissur' className='accent-green-800' name='filterlocation' />
                            <label htmlFor='thrissur' className='ms-3 text-lg font-semibold'>Thrissur</label>
                        </div>
                        <div className='mt-3' onClick={() => filterLocation('kozhikode')}>
                            <input type="radio" id='kozhikode' className='accent-green-800' name='filterlocation' />
                            <label htmlFor='kozhikode' className='ms-3 text-lg font-semibold'>Kozhikode</label>
                        </div> */}
                    </div>
                    {/* All - Courses */}
                    <div className='shadow p-5'>

                        <div className='md:grid grid-cols-3 '>
                            {
                                allCourses?.length > 0 ?
                                    allCourses?.map((item, index) => (
                                        <div className='me-2 p-5 flex justify-center items-center flex-col rounded shadow-lg my-10' key={index} hidden={item?.courseapprovedstatus == 'pending' || item?.courseapprovedstatus == 'seatsfilled'}>
                                            <div className='flex justify-start'>
                                                <Link to={`/viewdetails/${item?._id}`}> <img src={item?.courseimageurl} alt="no image" style={{ width: '200px', height: '200px' }} className='rounded' /></Link>
                                            </div>
                                            <h1 className='text-xl font-bold mt-3'>{item?.coursename.slice(0, 15)}...</h1>
                                            <h2 className='text-lg font-semibold'>{item?.institutename}</h2>
                                            <div className='flex justify-start flex-col mt-3'>
                                                <p><FontAwesomeIcon icon={faLocationDot} className='me-2 text-blue-800' /><span className='font-semibold'>Location: </span>{item?.location}</p>
                                                <p><FontAwesomeIcon icon={faCircleCheck} className='me-2 text-blue-500' /><span className='font-semibold'>Mode: </span>{item?.mode}</p>
                                                <p><FontAwesomeIcon icon={faStar} className='me-2 text-amber-300' /><span className='font-semibold'>Fee :$</span><span className='text-red-900 font-bold'>{item?.coursefee}</span></p>
                                            </div>

                                            <div className='w-full '><Link to={`/viewdetails/${item?._id}`}> <button className='bg-green-800 border px-3 py-2 rounded-full w-full mt-5 text-white font-bold hover:bg-white hover:text-green-800 hover:border-green-800'>View Details</button></Link></div>
                                        </div>
                                    )) :
                                    <p className='flex text-2xl text-red-800 font-bold'>No Books</p>
                            }


                        </div>


                    </div>
                </div>





            </section>
            }


            {/* not logged in */}
            {!token &&
                <div className='flex justify-center items-center flex-column'>
                    <div className='mt-30'>
                        <Link to={'/login'}> <h3 className='font-semibold text-2xl text-center'>Please <span className='text-red-800 font-bold'>Login</span></h3></Link>
                        <img src="https://cdn-icons-gif.flaticon.com/6569/6569164.gif" alt="no image" style={{ width: '300px', height: '300px' }} />
                    </div>
                </div>}

            <Footer />

        </>
    )
}

export default Explore