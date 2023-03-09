import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./studentCard.css";
// import image from "../../images/Profile-PNG-File.png"


function StudentCard(props) {

  let avatar = `https://api.multiavatar.com/${props.students["username"]}.svg`

  return (
    <Card className="student_card" id={props.students["id"]}>
      <Card.Img variant="top" src={avatar}  width="160" height="140" />
      <Card.Body className="card_body">
        <Card.Title className="card_title">{props.students["username"]}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.students["nationality"]}</Card.Subtitle>
        <Card.Subtitle className="mb-3 text-muted">{props.students["language_name"]} - {props.students["levels"]}</Card.Subtitle>
        <Card.Text>{props.students["description"]}</Card.Text>
        <Button className="button send_button" type="submit">
          Send Request
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
