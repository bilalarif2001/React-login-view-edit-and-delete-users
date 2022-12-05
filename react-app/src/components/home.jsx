import React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function Home(props) {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const [response,setResponse]= useState(false)

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, [response]);

  function logout() {
    //Removes all Local storage data.
    toast.info("successfully Logged Out",{position:"top-center",autoClose:2000, onClose: () => {
      localStorage.clear();
      navigate("/login");
    }})
  }

  function editprofile() {
    navigate("/edituser");
  }

 /*  function submit(dataID) {
    let message = window.confirm("Are you Sure you want to delete this user?");
    if (message) {
      console.log("yes");
    } else console.log("no");
  } */

  function deleteUser(dataID) {
    let message = window.confirm("Are you Sure you want to delete this user?");
    if (message) {
      if (dataID == currentUser) {
        DeleteMethod(dataID);
        localStorage.clear();
        toast.info("You have sucessfully deleted yourself",{onClose:()=>{navigate("/login")}});
      } else {
        DeleteMethod(dataID);
        toast.info("User has been successfully deleted");
      }

    } else navigate("/home");

    
  }

  function DeleteMethod(dataID) {
    fetch(`http://localhost:5000/users/${dataID}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) {
        setResponse(true);
      }
    });
  }

  return (
    <div>
      <div
        className="bg-dark"
        style={{ width: "100%", height: "100%", position: "absolute" }}
      >
        <h1 className="text-center text-white">Welcome to Homepage</h1>
        <h4 className="text-white ms-3">
          HELLO {localStorage.getItem("name").toUpperCase()}
        </h4>
        <button className="btn btn-warning ms-3" onClick={logout}>
          Logout
        </button>
        <button className="btn btn-danger ms-3" onClick={editprofile}>
          Edit Profile
        </button>
        <div className="container bg-white">
          <table
            className="table mt-5 shadow-lg table-striped table-hover text "
            style={{
              fontSize: "15px",
              fontFamily:
                "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
              color: "#Ff0043",
            }}
          >
            <thead className=" text-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Gender</th>
                <th scope="col">View Details</th>
                <th scope="col">Delete User</th>
              </tr>
            </thead>
            <tbody id="table">
              {data.map((data) => (
                <tr key={data.id}>
                  <th scope="row">{data.id}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.birthday}</td>
                  <td>{data.gender}</td>
                  <td>
                    <Link
                      to={`/userdetail/${data.name}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </td>
                  <td>
                     <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(data.id)}
                    >
                      Delete
                    </button> 
                     
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Home;
