import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import "./signUp.css";
import {country } from "../../data/country";
import {languageList } from "../../data/languagesList";
import {levels} from "../../data/levels";
import Logo from '../logo/logo';

function SignUp() {
  const nav = useNavigate();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

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
    const {dob, fullname, username, email, password, gender, language, level, nationality, bio} = form;
    const newErrors ={};

    if(!dob || dob === "") newErrors.dob = "Please enter your date birth"
    else if(calcAge(dob) < 18) newErrors.dob = "You need to be at least 18 years"
    if(!fullname || fullname === "") newErrors.fullname = "Please enter your fullname"
    else if( /^[a-zA-Z ]*$/.test(fullname) != true) newErrors.fullname = "Please enter correct fullname"
    if(!username || username === "") newErrors.username = "Please enter your username"
    else if( username.length > 13) newErrors.username = "Your username must be contain at most 13 characters"
    if(!email || email === "") newErrors.email = "Please enter your email"
    else if(  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) != true) newErrors.email = "Please enter correct email format"
    if(!password || password === "") newErrors.password = "Please enter your password"
    else if( password.length < 5) newErrors.password = "Your password must be contain at least 5 characters"
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
    register();
  }
 }


async function register() {
     await fetch('http://localhost:4000/sign-up', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          full_name: form.fullname,
          username: form.username,
          password: form.password,
          email: form.email,
          description: form.bio,
          gender: form.gender,
          date_of_birth: form.dob,
          nationality: form.nationality,
          language: languageList.find(element => element.name === form.language).id,
          language_level: levels.find(element => element.name === form.level).id

      })
  })
  .then((response) => {
     if (response.status === 400) {
      document.querySelector(".exist_container").classList.add("visible");
      setTimeout(() => {nav("/login")}, 4000);
      throw new Error('Something went wrong');
     }
     if (response.status === 200) {
      return response.json()  
     }
  })
  .then(data => {
    localStorage.setItem('jwtToken', data.jwtToken);
    nav("/profile_created")
    setTimeout(() => {nav("/login")}, 4000)
  })
  .catch(error => console.log(error))
}

  return (
    <div className="wrapper">
    <div className="signup_wrapper">
      <Logo />
      <div className="signup__content">
         <h3>Create your profile</h3>
         <h4 className="exist_container">User already exist!</h4>
    <Form >
          
      <Row className="mb-2">
        <Form.Group as={Col} controlId="fullname">
          <Form.Label>First and last name</Form.Label>
          <Form.Control
            onChange={(e) => setField("fullname", e.target.value)}
            value={form.fullname} 
            isInvalid={!!errors.fullname}
            type="text"
            placeholder="First and last name" 
          />
          <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
        </Form.Group>


         <Form.Group as={Col} controlId="username">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              onChange={(e) => setField("username", e.target.value)}
              value={form.username} 
              isInvalid={!!errors.username}
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

     
       
      <Row className="mb-2">
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
              onChange={(e) => setField("email", e.target.value)}
              value={form.email} 
              isInvalid={!!errors.email}
              type="email" 
              placeholder="Enter email" 
           />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
       
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            onChange={(e) => setField("password", e.target.value)}
            value={form.password} 
            isInvalid={!!errors.password}
            placeholder="Password" 
            autoComplete='off'
           />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
      </Row>


      <Row className="mb-2">
        <Form.Group as={Col} controlId="nationality">
        <Form.Label>Nationality</Form.Label>
        <Form.Control 
          onChange={(e) => setField("nationality", e.target.value)}
          value={form.nationality} 
          isInvalid={!!errors.nationality}
          placeholder="Select nationality"
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
          onChange={(e) => setField("gender", e.target.value)}
          value={form.gender} 
          isInvalid={!!errors.gender}
          placeholder="Select Gender"
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
          onChange={(e) => setField("language", e.target.value)}
          value={form.language} 
          isInvalid={!!errors.language}
          placeholder="Select Language"
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
          onChange={(e) => setField("level", e.target.value)}
          value={form.level} 
          isInvalid={!!errors.level}
          placeholder="Select Level"
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
            onChange={(e) => setField("dob", e.target.value)}
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
            onChange={(e) => setField("bio", e.target.value)}
            value={form.bio} 
            isInvalid={!!errors.bio}
            as="textarea" 
            rows={2} 
             />
            <Form.Control.Feedback type="invalid">{errors.bio}</Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Button className="button signup_login_button" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
    </div>
    </div>
    </div>
  );
}

export default SignUp;
