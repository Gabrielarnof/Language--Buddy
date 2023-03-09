import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import Logo from "../logo/logo";
import DropdownButtons from "../dropdownButtons/dropdownButtons";
import "./profile.css"
import DeleteProfileModal from "../deleteProfile/deleteProfile"; 

function Profile() {
  const nav = useNavigate();

  const [current_user, setCurrent] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


   //encode JWTtoken and get current id user
   let token = localStorage.getItem("jwtToken");
   let base64Url = token.split('.')[1];
   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
   let result = JSON.parse(jsonPayload)
   let current_id = result.sub;

  useEffect( () => {
    (async () => {
      try {
        await  fetch(`http://localhost:4000/users/${current_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
          } 
          })
         .then(res => {
          if (!res.ok) {
            nav("/login")
            throw new Error("Something bad with connection");
          }
          return res.json();
        })
         .then((data) => setCurrent(data));
      } catch (err) {
        console.error(err);
      }
    })();
 }, [current_id]);

 let ageW = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age =  today.getFullYear() - birthDate.getFullYear()
  let month =  today.getMonth() - birthDate.getMonth()
  if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  } 
  return age
}


    return (
        <div>
            <div className="wrapper">
              <div className="main_header">
                    <Logo />
                    <div className="button_container">
                      <Button className="button people_button" type="submit" onClick={()=> nav("/people")} >People</Button>
                      <DropdownButtons />
                    </div>
              </div> 
              
              <Card className="profile_card">
                <Card.Header>
                  <Card.Title style={{fontSize: 30}}>full name : {current_user["full_name"]}</Card.Title>
                  <Card.Title style={{fontSize: 30}}>username : {current_user["username"]}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle style={{fontSize: 30}} className="mb-4">Country: {current_user["nationality"]}</Card.Subtitle>
                  <Card.Subtitle style={{fontSize: 30}} className="mb-4">Age: {ageW(current_user["date_of_birth"])} </Card.Subtitle>
                  <Card.Subtitle style={{fontSize: 30}} className="mb-4">Gender: {current_user["gender"]} </Card.Subtitle>
                  <Card.Subtitle style={{fontSize: 30}} className="mb-4">Language:  {current_user["language_name"]}</Card.Subtitle>
                  <Card.Subtitle style={{fontSize: 30}} className="mb-4">Language level: {current_user["levels"]}</Card.Subtitle>
                </Card.Body>
                <Card.Footer> 
                  <Card.Text style={{fontSize: 30}}>Description:  {current_user["description"]}</Card.Text>
                </Card.Footer>
              </Card>
               
                <div className="profile_button_container">
                  <Button className="button edit_button" onClick={()=> nav("/edit_profile")}>Edit profile</Button>
                  <Button className="button delete_button" onClick={handleShow}>Delete profile and data</Button>
                </div> 

                <DeleteProfileModal handleClose={handleClose} show={show} />  
                  
            </div>
         </div>
       
    )
}

export default Profile;