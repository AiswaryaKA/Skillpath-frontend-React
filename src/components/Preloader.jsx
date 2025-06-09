import React from 'react'

function Preloader() {
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-3 '>
            <div></div>
            <div  className='flex justify-center items-center'>
                <img src="https://usagif.com/wp-content/uploads/loading-9.gif" />
                
            </div>
            <div></div>
            

        </div>

    </div>
    
    </>
  )
}

export default Preloader