import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function Auth(props) {
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const email = localStorage.getItem("email");
  console.log(email);

  useEffect(() => {
    if (email) {
      setisLogin(true);
    } else {
      setisLogin(false);
      
        //alert("Please Login First")
        //navigate("/login");
        toast.error("You Must Login First",{position:"top-center",
        autoClose:1000,onClose:()=>{
          navigate("/login");
        }
      })
    }
  }, [email]);

  return (
  <div>
    {isLogin && props.children}
  <ToastContainer/>
  </div>
  );
}

export default Auth;
