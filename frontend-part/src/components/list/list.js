import "./list.css"
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
import StudentCard from "../studentCard/studentCard";
// import { state } from "../../data/students";

function List() {
  const nav = useNavigate();

  const cards = async () => {
    await fetch('http://localhost:4000/users')
    .then((response) => {
   
        if (response.status === 200) {
            return response.json()
        } else {
           return "messsagr"
        }
    })
    .then((data) =>  data)
}

    return (
        <div>
            <div className="wrapper">
                <div className="main_header">
                    <Logo />
                    <div className="button_container">
                    <Button className="button profile_button" type="submit">Profile</Button>
                    <Button className="button logout_button" type="submit" onClick={() => nav("/")}>Logout</Button>
                    </div>
                </div>

                <Button className="button filter_button" type="submit">Filter</Button>
            
                <div className="card-container">
                    {cards.map((card) => {
                        return <StudentCard card={card} key={Math.random()} />;
                    })}
                </div>
              
            </div>
        </div>
       
    )
}

export default List;