import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Error from './Components/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import StudentProfile from './Components/StudentProfile';
import ProfileForm from './Components/ProfileForm';
import PrivateRoutes from './Components/PrivateRoutes';
import Authority from './Components/Authority';
import Complaintpage from './Components/complaintpage';
import Intro from './Components/Intro';
import Watch from './Components/Watch';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/StudentProfile" element={<StudentProfile />} />
            <Route path="/ProfileForm" element={<ProfileForm />} />
          </Route>

          <Route path="/" element={<Login />} />
          <Route path="/Intro" element={<Intro/>}></Route>
          <Route path="/authority" element={<Authority />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/watch" element={<Watch />}></Route>
          <Route path="/complaintpage" element={<Complaintpage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
