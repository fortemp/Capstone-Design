import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from"./Pages/SignupPage";
import Footer from "./components/Footer/Footer";
import HostPockerPage from "./Pages/HostPockerPage";
import withAuth from "./hoc/withAuth"
function App() {
  return (
    <div style={{minWidth:'730px'}}>

      <Navbar/>

      <div style={{paddingTop:'20px' ,minHeight: 'calc(100vh -80px)' }}> 
        <Routes>
          <Route exact path="/" element={withAuth(LandingPage,null)}/>
          <Route exact path="/login" element={ withAuth(LoginPage,false) }/>
          <Route exact path="/signup" element={ withAuth(SignupPage,false) } />
          <Route exact path="/host" element={ withAuth(HostPockerPage,true) } />
        </Routes>
      </div>

      <Footer/>
      
    </div>
  );
}

export default App;
