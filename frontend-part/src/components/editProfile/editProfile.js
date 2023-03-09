import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {country } from "../../data/country";
import {languageList } from "../../data/languagesList";
import {levels} from "../../data/levels";
import Logo from '../logo/logo';


function EditProfile() {
    const nav = useNavigate();

    const [errors, setErrors] = useState({});
    const [current_user, setCurrent] = useState({});

    const [form, setForm] = useState({});

    const calcAge = (dateString) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age =  today.getFullYear() - birthDate.getFullYear()
      let month =  today.getMonth() - birthDate.getMonth()
      if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--
      } 
      return age
    }

    //encode JWTtoken and get current id user
    let token = localStorage.getItem("jwtToken");
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    let result = JSON.parse(jsonPayload)
    let current_id = result.sub;
 

    const setField = (field, value) => {
      setForm ({
        ...form, 
        [field]: value
      })
  
      if(!!errors[field])
      setErrors({
        ...errors,
        [field]: null
      })
    }
  
    const validateForm = () => { 
      const {dob, fullname, username, gender, language, level, nationality, bio} = form;
      const newErrors ={};
  
      if(!dob || dob === "") newErrors.dob = "Please enter your date birth"
      else if(calcAge(dob) < 18) newErrors.dob = "You need to be at least 18 years"
      if(!fullname || fullname === "") newErrors.fullname = "Please enter your fullname"
      else if( /^[a-zA-Z ]*$/.test(fullname) != true) newErrors.fullname = "Please enter correct fullname"
      if(!username || username === "") newErrors.username = "Please enter your username"
      else if( username.length > 13) newErrors.username = "Your username must be contain at most 13 characters"
      if(!gender || gender === "Select Gender") newErrors.gender = "Please enter your gender"
      if(!language || language === "Select Language") newErrors.language = "Please enter your language"
      if(!level || level === "Select Level") newErrors.level = "Please enter your level"
      if(!nationality || nationality === "Select nationality") newErrors.nationality = "Please enter your nationality"
      if(!bio || bio === "") newErrors.bio = "Please enter your date bio"
  
      return newErrors
    }
  
   
   const handleSubmit = e => {
    e.preventDefault();
    const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0) {
       setErrors(formErrors)
    } else {
        
      edit();
    }
   }
  
  
  async function edit() {
       await fetch(`http://localhost:4000/users/${current_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify({
            full_name: form.fullname,
            username: form.username,
            description: form.bio,
            gender: form.gender,
            date_of_birth: form.dob,
            nationality: form.nationality,
            language: languageList.find(element => element.name === form.language).id,
            language_level: levels.find(element => element.name === form.level).id
  
        })
    })
    .then((response) => {
       if (response.status === 200) {
        return response.json()  
       }
    })
    .then(data => {
        // console.log(data)
        setCurrent(data)
        nav("/profile")
    })
    .catch(error => console.log(error))
  }


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
           .then(data => setCurrent(data));
        } catch (err) {
          console.error(err);
        }
      })();
   }, [current_id]);


  
    return (
      <div className="wrapper">
      <div className="edit_wrapper">
        <Logo />
        <div className="edit__content">
           <h3>Edit Profile</h3>
      <Form >
            
        <Row className="mb-2">
          <Form.Group as={Col} controlId="fullname">
            <Form.Label>First and last name</Form.Label>
            <Form.Control
              onChange={(e) => setField("fullname", e.target.value || current_user.full_name)}
              value={form.fullname }
              isInvalid={!!errors.fullname}
              type="text"
              placeholder={current_user["full_name"]}
            />
            <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
          </Form.Group>
  
  
           <Form.Group as={Col} controlId="username">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                onChange={(e) => setField("username", e.target.value || current_user.username)}
                value={form.username} 
                isInvalid={!!errors.username}
                type="text"
                placeholder={current_user["username"]}
                aria-describedby="inputGroupPrepend"
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
  
  
        <Row className="mb-2">
          <Form.Group as={Col} controlId="nationality">
          <Form.Label>Nationality</Form.Label>
          <Form.Control 
            onChange={(e) => setField("nationality", e.target.value || current_user.nationality)}
            value={form.nationality} 
            isInvalid={!!errors.nationality}
            placeholder={current_user["nationality"]}
            as="select" 
            type="select" 
            >
              <option>Select nationality</option>
              {country.map((element, index) => {
                return (
                  <option value={element.en_short_name} key={index}>
                    {element.en_short_name}
                   </option>
                   );
                })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
          </Form.Group>
  
  
          <Form.Group as={Col} controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control 
            onChange={(e) => setField("gender", e.target.value || current_user.gender)}
            value={form.gender} 
            isInvalid={!!errors.gender}
            placeholder={current_user["gender"]}
            as="select" 
            type="select" 
            >
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
          </Form.Group>
        </Row>
  
        <Row className="mb-2">
          <Form.Group as={Col} controlId="language">
          <Form.Label>Language you can speak</Form.Label>
          <Form.Control 
            onChange={(e) => setField("language", e.target.value || current_user.language)}
            value={form.language} 
            isInvalid={!!errors.language}
            placeholder={current_user["language"]}
            as="select" 
            type="select"
              >
                <option>Select Language</option>
                {languageList.map((element, index) => {
                  return (
                   <option value={element.name} key={index}> {element.name}</option>
      );
    })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.language}</Form.Control.Feedback>  
          </Form.Group>
      
          <Form.Group as={Col} controlId="level">
          <Form.Label>Language Level</Form.Label>
          <Form.Control 
            onChange={(e) => setField("level", e.target.value || current_user.language_level)}
            value={form.level} 
            isInvalid={!!errors.level}
            placeholder={current_user["language_level"]}
            as="select" 
            type="select" 
              >
                <option>Select Level</option>
              {levels.map((element, index) => {
                  return (
                    <option value={element.name} key={index}>{element.name}</option>
                  )
                })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.level}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-2">
        <Form.Group as={Col} controlId="dob">
            <Form.Label>Birthday</Form.Label>
            <Form.Control 
              type="date"
              onChange={(e) => setField("dob", e.target.value || current_user.date_of_birth)}
              value={form.dob} 
              isInvalid={!!errors.dob}
          
             />
            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
          </Form.Group>
        </Row>
  
        <Row className="mb-3">
          <Form.Group as={Col} controlId="bio">
            <Form.Label>BIO</Form.Label>
            <Form.Control 
              onChange={(e) => setField("bio", e.target.value || current_user.description)}
              value={form.bio} 
              isInvalid={!!errors.bio}
              as="textarea" 
              rows={2} 
              placeholder={current_user["description"]}
               />
              <Form.Control.Feedback type="invalid">{errors.bio}</Form.Control.Feedback>
          </Form.Group>
  
        </Row>
  
        <Button className="button signup_login_button" type="submit" onClick={handleSubmit}>Save</Button>
        <Button className="button signup_login_button" type="submit" onClick={() => nav("/profile")}>Cancel</Button>
      </Form>
      </div>
      </div>
      </div>
    );
}

export default EditProfile