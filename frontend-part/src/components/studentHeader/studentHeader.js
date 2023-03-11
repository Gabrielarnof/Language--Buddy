import "./studentHeader.css"
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
import Logo from "../logo/logo";
import DropdownButtons from '../dropdownButtons/dropdownButtons';

function StudentHeader() {
    const nav = useNavigate();

    return (      
            <div className="wrapper">
               <div className="main_header">
                     <Logo />
                     <div className="button_container">
                        <Button className="button request_button" type="submit" onClick={() => nav("/connections")} > Connections</Button>
                        <Button className="button people_button" type="submit" onClick={() => nav("/people")} > People</Button>
                        <DropdownButtons />
                    </div>
               </div>
            </div>     
    )
}

export default StudentHeader;