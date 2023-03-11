import "./connections.css";
import { useState } from "react";
import { useEffect } from "react";
import StudentHeader from "../studentHeader/studentHeader";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";



function Connections() {
  const nav = useNavigate("");

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  //encode JWTtoken and get current id user
  let token = localStorage.getItem("jwtToken");
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  let result = JSON.parse(jsonPayload);
  let current_id = result.sub;

  const deleteConnection =  async (id) => {
    console.log(requests);
      await fetch(`http://localhost:4000/connections/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
         return res.json();
        })
        .then(
          (data) => {
            console.log(data)
            setRequests(requests.filter(el => el.id != id))  
          },
          (error) => {
            setError(error.toString());
            console.log(error);
          }
        );
    };

    console.log(requests);

    const updateConnection =  async (id, status) => {
        await fetch(`http://localhost:4000/connections/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: status
        })
        })
          .then((res) => {
           return res.json();
          })
          .then(
            (data) => {
              requests.find(el => el.id == id).status = status
              nav("/connections")
            },
            (error) => {
              setError(error.toString());
              console.log(error);
            }
          );
      };


  useEffect(() => {
    (async () => {
      await fetch("http://localhost:4000/connections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
         return res.json();
        })
        .then(
          (data) => {
            setRequests(data);
            // console.log(data)
          },
          (error) => {
            setError(error.toString());
            console.log(error);
          }
        );
    })();
  }, []);



  
  return (
    <div>
      <div className="wrapper">
         < StudentHeader />
        
         <div className="send_container">
            <div>Sent requests</div>
           {requests.filter(el => el.status == "pending" && el.requester_id == current_id).map((el, index) => (
             <div id={el.id} key={index}  className="sent_card">
               <div > {el.responder_username}</div>
               <Button className="button " type="submit" onClick={() => deleteConnection(el.id)}> Delete</Button>
          </div>
           ))} 
        </div>


        <div>_________</div>


  
         <div className="inbox_container">
            <div>Incoming requests</div>
             {requests.filter(el => el.status == "pending" && el.responder_id == current_id).map((el, index) => (
             <div key={index}  className="inbox_card">
               <div> {el.responder_username}</div>
               <Button className="button " type="submit" onClick={() => updateConnection(el.id, 'approved')}> Accept</Button>
               <Button className="button " type="submit" onClick={() => updateConnection(el.id, 'rejected')}> Reject</Button>
          </div>
           ))} 
            </div>

          <div>_________</div>

         <div className="result_container">

         <div>Buddies</div>
         {requests.filter(el => el.status == "approved").map((el, index) => (
          <div key={index}>
              { (el.responder_id  == current_id) ?  (

              <div className="buddy_card">  
              <div> {el.requester_username}</div> 
              <div> Email :{el.requester_email}</div> 
              </div>
              ) : ( 
              <div className="buddy_card"> 
                    <div>  {el.responder_username}</div>
                     <div>Email: {el.responder_email}</div>
               </div>
              )}
         </div> 
         ))} 
        </div>

      </div>
    </div>
  );
}

export default Connections;
