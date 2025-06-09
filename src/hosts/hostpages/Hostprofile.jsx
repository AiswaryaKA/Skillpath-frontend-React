import React from 'react'
import Hostsidebar from '../hostcomponents/Hostsidebar'
import { faBook, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Edithostprofile from '../hostcomponents/Edithostprofile'
import Addcourse from '../hostcomponents/Addcourse'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Usersheader from '../../users/userscomponents/Usersheader'

function Hostprofile() {

  //chart data
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]

  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 2400
    },
    {
      "name": "Group B",
      "value": 4567
    },
    {
      "name": "Group C",
      "value": 1398
    },
    {
      "name": "Group D",
      "value": 9800
    },
    {
      "name": "Group E",
      "value": 3908
    },
    {
      "name": "Group F",
      "value": 4800
    }
  ];
  return (
    <>
       <div className='w-full z-0 bg-green-900 fixed top-20 flex justify-between md:justify-center items-center px-5 py-2'>
        <h1 className='md:text-center text-xs md:text-lg font-bold text-white'>Welcome
          ! Here you can post your new courses...
        </h1>
      </div>
      <Usersheader />
     
      <div className='md:grid grid-cols-[1fr_4fr] '>
        <div className='bg-green-100 flex flex-col items-center md:mt-30 shadow-2xl'>
          <Hostsidebar />
        </div>

        <div className='p-10 mt-30'>
          <div className='md:grid grid-cols-3'>
            <div className="px-5">
              <div className='bg-orange-900 p-4 flex rounded text-white'>
                <FontAwesomeIcon icon={faBook} className='fa-2x' />
                <div className='text-center px-5'>
                  <h1 className='text-lg'>My Courses</h1>
                  <h1 className='text-3xl font-bold'>100+</h1>
                </div>
              </div>
            </div>
            <div className="px-5 mt-5 md:mt-0">
              <div className='bg-green-900 p-4 flex rounded text-white'>
                <FontAwesomeIcon icon={faUsers} className='fa-2x' />
                <div className='text-center px-5'>
                  <h1 className='text-lg'>Users</h1>
                  <h1 className='text-3xl font-bold'>100+</h1>
                </div>
              </div>
            </div>
            <div className="px-5  mt-5 md:mt-0">
              <div className='bg-amber-400 p-4 flex rounded text-white'>
                <FontAwesomeIcon icon={faUserTie} className='fa-2x' />
                <div className='text-center px-5'>
                  <h1 className='text-lg'>Enrolled</h1>
                  <h1 className='text-3xl font-bold'>100+</h1>
                </div>
              </div>
            </div>
          </div>


          <div className='md:grid grid-cols-2 mt-10'>
            <div className='w-full h-50'>

              <ResponsiveContainer width='100%' height='100%'> {/*to make the barchart responsive with parent tag */}
                <BarChart data={data}> {/*indicate the chart -data attribute hold the data to be displayed*/}
                  <CartesianGrid strokeDasharray="3 3" /> {/*grid dash - 3px 3px gap */}
                  <XAxis dataKey="name" /> {/* represent x-axis*/}
                  <YAxis />{/*represnt y-axis - realted to the data displayed */}
                  <Tooltip />{/*indicates the data - square */}
                  <Legend />{/*data fetch with the help of legend*/}
                  <Bar dataKey="pv" fill="#138d75" />{/*indicate the bar datakey - data to display fill - color */}
                  <Bar dataKey="uv" fill="#82ca9d" />{/*indicate the bar datakey - data to display fill - color */}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='w-full h-50'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart width={530} height={200}>
                  <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#138d75" />{/*cx-cy-50% - it places horizontally and veritically center */}
                  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} fill="#82ca9d" label />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>


          <div className="md:flex justify-between mt-5 mb-5">
            <Addcourse />

            <Edithostprofile />
          </div>
        </div>
      </div>

    </>
  )
}

export default Hostprofile