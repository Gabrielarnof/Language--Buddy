import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function DropdownButtons() {
    return (
        <DropdownButton id="dropdown-basic-button" title="Profile">
          <Dropdown.Item href="/profile">Profile</Dropdown.Item>
          <Dropdown.Item href="/" onClick={()=> localStorage.removeItem("jwtToken")}>Log out</Dropdown.Item>
        </DropdownButton>
      );
}

export default DropdownButtons;
