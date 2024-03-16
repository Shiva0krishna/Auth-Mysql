import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Error from './Components/Error';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import Home from './Components/Home';
import StudentProfile from './Components/StudentProfile';
import ProfileForm from './Components/ProfileForm';
import PrivateRoutes from './Components/PrivateRoutes';
function App(){
  return(
      <BrowserRouter>
        <Routes>
          < Route  element={ <PrivateRoutes/>}>
          <Route path="/StudentProfile" element={<StudentProfile/>}></Route>
          <Route path='/ProfileForm' element={<ProfileForm/>}></Route>
          </Route>

          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;