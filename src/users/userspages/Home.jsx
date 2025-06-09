import React, { useEffect, useState } from 'react'
import Usersheader from '../userscomponents/Usersheader'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBookmark, faBuildingColumns, faCircleCheck, faFilter, faLocationDot, faMagnifyingGlass, faPlay, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { getHomeCoursesApi } from '../../services/allApi'
import { Link } from 'react-router-dom'



function Home() {

    const [index, setIndex] = useState(0);
    //store home courses
    const [homeCourses, setHomeCourses] = useState([])
    //testimonilas
    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % 3);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + 3) % 3);
    };
    //Accordion
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    //function to get courses at home
    const getHomeCourses = async () => {
        const result = await getHomeCoursesApi()
        console.log(result);

        if (result.status == 200) {
            setHomeCourses(result.data)
        }

    }
    console.log(homeCourses);


    useEffect(() => {
        getHomeCourses()
    }, [])



    return (
        <>
            <Usersheader />

            {/* Hero Section */}
            {/* bg-gradient-to-br from-green-100 via-yellow-100 to-green-50 */}
            <section className='flex justify-center items-center '>
                <div className='md:grid grid-cols-2 p-20 mt-20'>
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className='md:text-3xl text-2xl text-center font-bold'>"Find the <span className='text-amber-400 md:text-5xl text-3xl hover:text-green-500'>Best Places</span> to Learn."</h1>
                        <p className='text-lg text-center mt-5 hover:text-gray-800' style={{ textAlign: 'justify' }}>Begin your journey towards growth and success with us.

                        </p>
                        <div className='md:flex justify-center items-center flex-row w-full '>
                            <Link to={'/explore'}><button className='px-5 py-2 rounded mt-5 bg-green-600 text-white font-bold hover:bg-amber-400 hover:text-lg w-full md:w-50'>Get Started</button></Link>
                            <Link to={'/explore'}><button className='md:ms-2 border border-amber-400 px-5 py-2 text-black font-bold mt-5 rounded hover:bg-amber-400 hover:text-lg w-full md:w-50'>Book Now</button></Link>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-5 md:mt-0'>


                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/student-has-submitted-his-exam-paper-on-time-illustration-download-in-svg-png-gif-file-formats--test-account-studies-examination-pack-stationary-illustrations-8217867.png" alt="no image" style={{ width: '300px', height: '350px' }} />


                    </div>

                </div>
            </section>

            {/* Categories */}
            <section className='flex justify-center items-center flex-col p-6 bg-amber-50'>
                <h3 className="text-center text-xl text-green-700 font-semibold mb-1 hover:text-amber-400 mt-20">Explore Here</h3>
                <h2 className="text-center text-xl md:text-3xl font-bold text-gray-800 mb-10">
                    Discover Where to Learn
                </h2>
                <div className='md:grid grid-cols-4 mt-10 mb-20'>

                    {homeCourses?.length > 0 ?
                        homeCourses?.map((item, index) => (
                            <div className='me-2 p-5 flex justify-center items-center flex-col rounded shadow-lg' key={index}>
                                <div className='flex justify-center'>
                                    <img src={item?.courseimageurl} alt="no image" style={{ width: '200px', height: '150px' }} />
                                </div>
                                <h1 className='text-xl font-bold mt-3 text-center'>{item?.coursename.slice(0, 15)}...</h1>
                                <h2 className='text-lg font-semibold'>{item?.institutename}</h2>
                                <div className='flex justify-start flex-col mt-3'>
                                    <p><FontAwesomeIcon icon={faLocationDot} className='me-2 text-blue-800' /><span className='font-semibold'>Location: </span>{item?.location}</p>


                                </div>
                            </div>
                        )) :
                        <p className='font-bold text-3xl'>No courses...</p>

                    }



                </div>

                <div className='mb-20'>
                    <Link to={'/explore'}> <button className='bg-green-800 text-white hover:bg-amber-50 border hover:border-green-800 hover:text-green-800 px-3 py-2 rounded'>Find Your Courses</button></Link>
                </div>
            </section>

            {/* How it works */}
            <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
                <h3 className="text-center  text-xl text-green-700 font-semibold mb-1 hover:text-amber-400">How It All Comes Together</h3>
                <h2 className="text-center text-xl md:text-3xl font-bold text-gray-800 mb-10">
                    Start your skill-building adventure.
                </h2>

                <div className='md:grid grid-cols-2 w-full mt-10 md-mt-0'>
                    <div className='flex justify-center  flex-col '>

                        <h3 className='font-semibold text-lg text-green-700'><FontAwesomeIcon icon={faMagnifyingGlass} className='me-2 ' />Search by Skill</h3>
                        <p className='text-gray-800 mt-3 mb-3 italic'>Find institutes by typing skills like web development, robotics, data science, etc.</p>

                        <h3 className='font-semibold text-lg text-green-700'><FontAwesomeIcon icon={faFilter} className='me-2' />Filter Results</h3>
                        <p className='text-gray-800 mt-3 mb-3 italic'>Narrow down results by location, mode (online/offline), or ratings.</p>

                        <h3 className='font-semibold text-lg text-green-700'><FontAwesomeIcon icon={faBuildingColumns} className='me-2' />View Institute Info</h3>
                        <p className='text-gray-800 mt-3 mb-3 italic'>You need to log in or create an account to book a seat.</p>


                    </div>
                    <div className='hidden md:flex justify-center items-center'>
                        <img src="https://png.pngtree.com/png-vector/20220718/ourmid/pngtree-corporate-website-abstract-concept-vector-illustration-png-image_5914526.png" alt="no image" style={{ width: '400px', height: '400px' }} />
                    </div>
                </div>

                <div className='md:grid grid-cols-2 w-full'>

                    <div className='flex justify-center items-center'>
                        <img src="https://png.pngtree.com/png-vector/20221022/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_6337611.png" alt="no image" />
                    </div>
                    <div className='flex justify-center flex-col mt-10 md-mt-0'>

                        <h3 className='font-semibold text-lg text-green-700'><FontAwesomeIcon icon={faArrowRightToBracket} className='me-2' />Login or Sign Up</h3>
                        <p className='text-gray-800 mt-3 mb-3 italic'>You need to log in or create an account to book a seat.</p>

                        <h3 className='font-semibold text-lg text-green-700'><FontAwesomeIcon icon={faBookmark} className='me-2' />Book a Seat</h3>
                        <p className='text-gray-800 mt-3 mb-3 italic'>Pay a small registration fee to reserve your spot in a course.</p>

                        <h3 className='font-semibold text-lg text-green-700'><FontAwesomeIcon icon={faCircleCheck} className='me-2' />Get Confirmation</h3>
                        <p className='text-gray-800 mt-3 mb-3 italic'>After payment, you’ll get a booking confirmation and contact info.</p>


                    </div>

                </div>

                <div className='flex justify-center items-center mt-10 mb-10'>
                    <Link to={'/explore'}><button className='px-5 py-2 rounded mt-5 bg-green-600 text-white font-bold hover:bg-amber-400 hover:text-lg'><FontAwesomeIcon icon={faCircleCheck} className='me-2' />Book Your Seats Now</button></Link>
                </div>
            </section>

            {/* Testimonals */}
            <section className="py-16 px-4 md:px-10 bg-gradient-to-br from-green-100 via-yellow-50 to-green-50 z-0">
                <h3 className="text-center  text-xl text-green-700 font-semibold mb-1 hover:text-amber-400">Testimonial</h3>
                <h2 className="text-center text-xl md:text-3xl font-bold text-gray-800 mb-10">
                    What The People Thinks About Us
                </h2>

                <div className="relative max-w-4xl mx-auto overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {/* Slide 1 */}
                        <div className="w-full flex-shrink-0 px-20 z-0">
                            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6">
                                <img
                                    src="https://randomuser.me/api/portraits/men/10.jpg"
                                    alt="Andrew"
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                                />
                                <div className="text-center md:text-left">
                                    <h4 className="text-xl font-semibold text-gray-800">Andrew Rathore</h4>
                                    <p className="text-sm text-green-600 mb-2">Executive</p>
                                    <div className="flex justify-center md:justify-start mb-2">
                                        <span className="text-yellow-400 text-xs"><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStarHalfStroke} /></span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        We are idea generators, goal seekers, challenge-thriving professionals, creators of unique internet projects, who deliver unconventional solutions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2 */}
                        <div className="w-full flex-shrink-0 px-20 z-0">
                            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6">
                                <img
                                    src="https://randomuser.me/api/portraits/women/22.jpg"
                                    alt="Sarah"
                                    className="w-24 h-24 rounded-full border-4 border-white  shadow-md"
                                />
                                <div className="text-center md:text-left">
                                    <h4 className="text-xl font-semibold text-gray-800">Sarah Johnson</h4>
                                    <p className="text-sm text-green-600 mb-2">Executive</p>
                                    <div className="flex justify-center md:justify-start mb-2">
                                        <span className="text-yellow-400 text-xs"><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStarHalfStroke} /></span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Combining the most advanced web technologies, we deliver high-quality, modern experiences to drive innovation and value.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="w-full flex-shrink-0 px-20 z-0">
                            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6">
                                <img
                                    src="https://randomuser.me/api/portraits/men/34.jpg"
                                    alt="David"
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                                />
                                <div className="text-center md:text-left">
                                    <h4 className="text-xl font-semibold text-gray-800">David Smith</h4>
                                    <p className="text-sm text-green-600 mb-2">Executive</p>
                                    <div className="flex justify-center md:justify-start mb-2">
                                        <span className="text-yellow-400 text-xs"><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStarHalfStroke} /></span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Our team focuses on result-oriented strategies and custom solutions to help your brand stand out in the digital world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                        <button
                            onClick={prevSlide}
                            className="p-5 rounded-full shadow-md text-green-950"
                        >
                           <FontAwesomeIcon icon={faPlay} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className=" p-5 rounded-full shadow-md text-green-950"
                        >
                           <FontAwesomeIcon icon={faPlay} />
                        </button>
                    </div>
                </div>

                {/* Indicator Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setIndex(0)}
                        className={`w-3 h-3 rounded-full ${index === 0 ? "bg-green-900" : "bg-gray-300"}`}
                    ></button>
                    <button
                        onClick={() => setIndex(1)}
                        className={`w-3 h-3 rounded-full ${index === 1 ? "bg-green-900" : "bg-gray-300"}`}
                    ></button>
                    <button
                        onClick={() => setIndex(2)}
                        className={`w-3 h-3 rounded-full ${index === 2 ? "bg-green-900" : "bg-gray-300"}`}
                    ></button>
                </div>
            </section>

            {/* Faqs */}
            <section className='flex justify-center items-center flex-col bg-gradient-to-br from-green-100 via-yellow-50 to-green-50'>
                <h3 className="text-center  text-xl text-green-700 font-semibold mb-1 hover:text-amber-400 mt-25">Frequently Asked Questions</h3>
                <h2 className="text-center text-xl md:text-3xl font-bold text-gray-800 mb-10">
                    Feel free to reach out to us!
                </h2>

                <div className='md:grid grid-cols-2'>
                    <div className='flex justify-center items-center'>
                        <img src="../public/images/faqs.png" alt="" style={{ width: '400px', height: '300px' }} />
                    </div>
                    <div>
                        <section className="py-20 px-6 sm:px-10 lg:px-20 text-gray-800">
                            <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">


                                <div className="space-y-6">
                                    {/* Accordion Item 1 */}
                                    <div>
                                        <button
                                            onClick={() => toggleAccordion(0)}
                                            className="w-full text-left text-lg font-semibold text-green-700 py-2 px-2 bg-amber-50 rounded-lg shadow-lg hover:shadow-xl transition"
                                        >
                                            How do I sign up?
                                        </button>
                                        {activeIndex === 0 && (
                                            <p className="text-gray-600 mt-2 px-6 italic font-medium">
                                                Signing up is easy! Just click on the "Sign Up" button on the top of the page and fill in your details.
                                            </p>
                                        )}
                                    </div>

                                    {/* Accordion Item 2 */}
                                    <div>
                                        <button
                                            onClick={() => toggleAccordion(1)}
                                            className="w-full text-left text-xl font-semibold text-green-700 py-2 px-2 bg-amber-50 rounded-lg shadow-lg hover:shadow-xl transition"
                                        >
                                            What courses are available?
                                        </button>
                                        {activeIndex === 1 && (
                                            <p className="text-gray-600 mt-2 px-6 italic font-medium">
                                                We offer a wide range of courses in various skills, from coding to music, design, and more. Explore them in our "Explore" section.
                                            </p>
                                        )}
                                    </div>

                                    {/* Accordion Item 3 */}
                                    <div>
                                        <button
                                            onClick={() => toggleAccordion(2)}
                                            className="w-full text-left text-xl font-semibold text-green-700 py-2 px-2 bg-amber-50 rounded-lg shadow-lg hover:shadow-xl transition"
                                        >
                                            Can I change my plan later?
                                        </button>
                                        {activeIndex === 2 && (
                                            <p className="text-gray-600 mt-2 px-6 italic font-medium">
                                                Yes! You can easily upgrade or downgrade your plan anytime from your dashboard.
                                            </p>
                                        )}
                                    </div>

                                    {/* Accordion Item 4 */}
                                    <div>
                                        <button
                                            onClick={() => toggleAccordion(3)}
                                            className="w-full text-left text-xl font-semibold text-green-700 py-2 px-2 bg-amber-50 rounded-lg shadow-lg hover:shadow-xl transition"
                                        >
                                            Is there a free trial?
                                        </button>
                                        {activeIndex === 3 && (
                                            <p className="text-gray-600 mt-2 px-6 italic font-medium">
                                                Yes, we offer a 7-day free trial on all plans. You can try before committing to a paid plan.
                                            </p>
                                        )}
                                    </div>

                                    {/* Accordion Item 5 */}
                                    <div>
                                        <button
                                            onClick={() => toggleAccordion(4)}
                                            className="w-full text-left text-xl font-semibold text-green-700 py-2 px-2 bg-amber-50 rounded-lg shadow-lg hover:shadow-xl transition"
                                        >
                                            How can I contact support?
                                        </button>
                                        {activeIndex === 4 && (
                                            <p className="text-gray-600 mt-2 px-6 italic font-medium">
                                                You can reach us by visiting the "Contact" page or sending us an email at support@skillpath.com.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </section>


            <Footer />
        </>
    )
}

export default Home