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
import HostRoomPage from "./Pages/HostRoomPage";
import ShopPage from"./Pages/ShopPage";
import CommunityPage from"./Pages/CommunityPage";
import withAuth from "./hoc/withAuth"
import Posting from "./Pages/Posting";
import PostPage from "./Pages/PostPage";
import ProblemInsertpage from "./Pages/ProblemInsertpage";
import changeID from "./Pages/changeID";
import changePWD from "./Pages/changePWD";
function App() {
  return (
    <div style={{minWidth:'710px'}}>

      <Navbar/>

      <div style={{paddingTop:'20px' ,minHeight: 'calc(100vh -80px)' }}> 
        <Routes>
          <Route exact path="/" element={withAuth(LandingPage,null)}/>
          <Route exact path="/login" element={ withAuth(LoginPage,false) }/>
          <Route exact path="/signup" element={ withAuth(SignupPage,false) } />
          <Route exact path="/host" element={ withAuth(HostRoomPage,true) } />
          <Route exact path="/shop" element={ withAuth(ShopPage,true) } />
          <Route exact path="/community" element={ withAuth(CommunityPage,null) } />
          <Route exact path="/posting" element={ withAuth(Posting,null) } /> 
          <Route  path={"/PostPage/:post_id"} element={ withAuth(PostPage,null)} />
          <Route  path={"/ProblemInsertpage"} element={ withAuth(ProblemInsertpage,true,true)} />
          <Route exact path="/changeID" element={ withAuth(changeID,true) } /> 
          <Route exact path="/changePWD" element={ withAuth(changePWD,true) } /> 
        </Routes>
      </div>

      <Footer/>
      
    </div>
  );
}

export default App;
