import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./studentCard.css";
import { useNavigate } from "react-router-dom";
import config from '../../config'


function StudentCard(props) {
  const nav = useNavigate();

  let avatar = `https://api.multiavatar.com/${props.students["username"]}.svg`;

  let token = localStorage.getItem("jwtToken");

  async function createConnection(id) {
    await fetch(`${config.baseUrl}/connections`, {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json',
         Authorization: "Bearer " + token,
     },
     body: JSON.stringify({
         responder_id: id
     })
 })
 .then((response) => {
    if (response.status === 400) {
     throw new Error('Something went wrong');
    }
    if (response.status === 200) {
     return response.json()  
    }
 })
 .then(data => {
   nav("/connections")
 })
 .catch(error => console.log(error))
}


  

  return (
    <Card className="student_card" id={props.students["id"]}>
      <Card.Img variant="top" src={avatar}  width="160" height="140" />
      <Card.Body className="card_body">
        <Card.Title className="card_title">{props.students["username"]}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.students["nationality"]}</Card.Subtitle>
        <Card.Subtitle className="mb-3 text-muted">{props.students["language_name"]} - {props.students["levels"]}</Card.Subtitle>
        <Card.Text className="description_card">{props.students["description"]}</Card.Text>
        <Button className="button send_button" type="submit" onClick={() => createConnection(props.students["id"])}>
        Buddy up!
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
