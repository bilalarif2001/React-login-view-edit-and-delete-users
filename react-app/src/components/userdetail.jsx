import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Userdetail(props) {

  const username= useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  let filteredUser=data.filter((user) => {
    return(user.name===username.username)}) // UseParams returns an object, so here username.username is used


  return (
    <div>
    <div className="bg-dark" style={{width:"100%",height:"100%",position:"absolute"}}>
    <h1 className="text-center text-white">User Details</h1>
    <h4 className="text-white ms-3">Currently Viewing {username.username}</h4>
  
   <div className="container bg-white">
   <table className="table mt-5 shadow-lg table-striped table-hover text " style={{fontSize: "15px", fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif', color: "#Ff0043"}}>
       <thead className=" text-dark">
         <tr>
           <th scope="col">#</th>
           <th scope="col">Name</th>
           <th scope="col">Email</th>
           <th scope="col">Date of Birth</th>
           <th scope="col">Gender</th>
         </tr>
       </thead>
       <tbody id="table">
         {(filteredUser.map(data=>(<tr key={data.id}>
      <th scope="row">{data.id}</th>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.birthday}</td>
      <td>{data.gender}</td>
      <td></td>
    </tr>)))}
 
    
       </tbody>
     </table>

</div>
  </div>
  </div>
  );
}

export default Userdetail;
