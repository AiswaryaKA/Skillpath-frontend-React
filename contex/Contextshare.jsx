import React, { createContext, useState } from 'react'

export const adminProfileUpdateStatusContext = createContext("")
export const userProfileUpdateStatusContext = createContext("")

function Contextshare({children}) {
    const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState({})

    const [userProfileUpdateStatus, setUserProfileUpdateStatus] = useState({})
    return (



        <userProfileUpdateStatusContext.Provider value={{ userProfileUpdateStatus, setUserProfileUpdateStatus }}>
            <adminProfileUpdateStatusContext.Provider value={{ adminProfileUpdateStatus, setAdminProfileUpdateStatus }}>

                {
                    children
                }

            </adminProfileUpdateStatusContext.Provider>
        </userProfileUpdateStatusContext.Provider>



    )
}

export default Contextshare