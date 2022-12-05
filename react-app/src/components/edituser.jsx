import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function Edituser(props) {
  const [data, setData] = useState([]);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [Birthday, setBirthday] = useState(localStorage.getItem("birthday"));
  const [gender, setGender] = useState(localStorage.getItem("gender"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const userID = localStorage.getItem("id");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((json) => setData(json));

    //localStorage.setItem("userdata", JSON.stringify(data));
    //setTempdata(JSON.parse(localStorage.getItem("userdata")))
    //setTempdata(localStorage.getItem("userdata"));
  }, []);

  // Selecting Gender Radio button
  function genderSelect(e) {
    setGender(e.target.value);
  }

  function submit(e) {
    e.preventDefault(); // Prevents page refresh on submit
    if (
      name === "" ||
      gender === "" ||
      Birthday === "" ||
      email === "" ||
      password === ""
    ) {
      toast.error("Fields cannot be Empty",{ autoClose:2000});
    } else {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("gender", gender);
      localStorage.setItem("birthday", Birthday);

      const user = {
        id: userID,
        name: name,
        gender: gender,
        birthday: Birthday,
        email: email,
        password: password,
      };
      fetch(`http://localhost:5000/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Data has been updated Successfully",{position:"top-center",
            autoClose:2000,onClose:()=>{
              navigate("/home");
            }
          })
         
        }
      });
    }
  }

  return (
    <div className="bg-dark" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <div className="mt-5 w-50 mx-auto bg-white p-5 rounded-3">
        <div className="container">
          <h1 className="mb-4 display-7 text-sm-center text-lg-start text-md-start text-center">
            Edit Profile
          </h1>
          <form onSubmit={submit} className="row g-3">

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Enter your Full Name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <label className="form-label">Birthday</label>
              <input
                type="date"
                className="form-control"
                defaultValue={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12" style={{ width: "100%" }}>
              
              <label className="form-label">Gender</label>
              <br />
              <input
                className=""
                type="radio"
                id="male"
                value={"Male"}
                checked={gender === "Male"}
                onChange={genderSelect}
                required
              />
              &nbsp;Male &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                className=""
                type="radio"
                id="female"
                value={"Female"}
                checked={gender === "Female"}
                onChange={genderSelect}
                required
              />
              &nbsp;Female
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control "
                required
                placeholder="Email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control "
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12 text-sm-center text-lg-start text-md-start text-center">
              <button type="submit" className="btn btn-danger px-5 mt-2"onClick={submit} id="btn">
                update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Edituser;