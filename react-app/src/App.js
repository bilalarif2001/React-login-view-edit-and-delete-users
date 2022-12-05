import Login from "./components/login";
import Signup from "./components/signup";
import Error from "./components/error";
import Home from "./components/home";
import Edituser from "./components/edituser";
import Userdetail from "./components/userdetail";
import Auth from "./components/auth";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<Auth><Home /></Auth>}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/userdetail/:username" element={<Auth><Userdetail /></Auth>}/>
        <Route path="/edituser" element={<Auth> <Edituser /> </Auth>}/>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
