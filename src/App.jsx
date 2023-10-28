import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import RegisterUser from './pages/user-pages/RegisterUser';
import ForgotPassword from './pages/user-pages/ForgotPassword';
import UpdatePassword from './pages/user-pages/UpdatePassword'; 
import ForgotInfo from './pages/user-pages/ForgotInfo';
import Info from './pages/user-pages/Info';
import UserVerification from './pages/user-pages/UserVerification';
import LoginUser from './pages/user-pages/LoginUser';
import PasswordVerify from './pages/user-pages/PasswordVerify';
import PrivateRoute from './pages/user-pages/PrivateRoute';
import Main from './pages/gmail.page/Main';
import Emails from './pages/gmail.page/MaterialUI/Components/Emails';
import ViewEmail from './pages/gmail.page/MaterialUI/common/ViewEmail';
import SuccessPage from './pages/user-pages/SuccessPage';
import RoutePage from './pages/user-pages/RoutePage';

function App() {
   

  return (
    <BrowserRouter>
    <Routes>
    <Route  path='/' element={<PrivateRoute element={<PrivateRoute element={<RoutePage/>}/>}/>}/>
      <Route  path='/main/:category' element={<PrivateRoute element={<Main/>}/>}/>
      <Route path='/viewemail/:id' element={<PrivateRoute element={<ViewEmail/>}/>}/>
      <Route path='/emails' e element={<PrivateRoute element={<Emails/>}/>}/>
      <Route path='/login' element={<LoginUser/>} />
      <Route path='/register' element={<RegisterUser/>} />
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/updatePassword' element={<UpdatePassword/>}/>
      <Route path='/userverification' element={<UserVerification/>}/>
      <Route path='/forgotInfo' element={<ForgotInfo/>}/>
      <Route path='/info' element={<Info/>}/>
      <Route path='/success' element={<SuccessPage/>}/>
      <Route path='/verifyForgotPassword' element={<PasswordVerify/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
