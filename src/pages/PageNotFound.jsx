import React from 'react'

function PageNotFound() {
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='md:grid md:grid-cols-2 '>
            <div className='flex justify-center items-center'>
                <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?t=st=1746948618~exp=1746952218~hmac=151f66d11330274547e704eb6505512b57d6088de581d76d2821f07b4c714376&w=900" alt="page not found" style={{width:'400px' , height:'450px'}}/>
            </div>
            <div  className='flex justify-center items-center flex-col'>
                
                <div className='text-center'>
                    <h1 className='text-4xl'>Oh!!Page Not Found</h1>
                    <div className='p-5 md:p-0'>
                        <p className='mt-5'>We couldn't find the page you are looking for.</p>
                        <p>It might have been moved or doestn't exist anymore.</p>
                    </div>
                    <button className='mt-4 mb-3 px-4 py-3 bg-amber-600 text-white rounded hover:border-amber-500 hover:bg-amber-300 hover:text-black'>Go Back Home</button>
                </div>
            </div>
            

        </div>

    </div>
    </>
  )
}

export default PageNotFound