import { Navigate, Outlet } from 'react-router-dom'
import { createContext,useContext } from 'react'

const userContext = createContext({level:false ,logged :()=>{}});
const PrivateRoutes = () => {
  let auth = useContext(userContext);
  console.log(auth.level);
return (
        auth.level ? <Navigate to ='/login' /> : <Outlet/> 
        // auth.level ? <Outlet/> : <Navigate to='/login'/> 

  )
}

export default PrivateRoutes;