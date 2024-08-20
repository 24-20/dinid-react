import { Outlet,useNavigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
const GlobalContext = createContext<{user:{name:string, birthday:string,img:string,dagenstall:string,id:string}| undefined,setUser:Function}|undefined>(undefined)

const GlobalLayout = () => {

  const [user, setUser] = useState<{name:string, birthday:string,img:string,dagenstall:string,id:string}| undefined>(undefined)
  const navigate = useNavigate()

  useEffect(()=>{
    if (!user?.name && user) {
      navigate('/onboarding')
    }
    if (user?.name) {
      navigate("/f")
    }
  },[user])

  return (
    <div className=' w-screen h-fit overflow-hidden hide-scrollbar  '>
        <GlobalContext.Provider value={{user, setUser}}>
          <Outlet />
        </GlobalContext.Provider>
    </div>
  )
}
export {GlobalContext}
export default GlobalLayout