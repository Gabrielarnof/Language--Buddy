import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./signIn.css";
import Logo from "../logo/logo";

function SignIn() {
  const nav = useNavigate();

  const [emails, setEmail] = useState("");
  const [passwords, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleEmailInput(event) {
    setEmail(event.target.value);
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    login();
   }
  

async function login() {
      await fetch('http://localhost:4000/sign-in', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({   
          password: passwords,
          email: emails,
      })
  })
  .then(data => {
    if (data.status === 401) {
      setError(true);
      document.querySelector(".invalid_container").classList.add("visible");
    } 
    if (data.status === 200) {
      return data.json()  
     } 
  })
  .then(response => {
    window.localStorage.setItem('jwtToken', response.jwtToken);
    nav("/people");
  })
  .catch(error => console.log(error))
}

  return (
    <div className="wrapper">
      <div className="signin__wrapper">
        <Logo />
        <div className="signin__content">
          <h3>Login to your account</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" value={emails} onChange={handleEmailInput}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={passwords} onChange={handlePasswordInput} />
            </Form.Group>

            <h4 className="invalid_container">Please, check your email or password!</h4>

            <Button
              variant="primary"
              type="submit"
              className="button signin_login_button"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
