import "./profile_created.css";
import speak from "../../images/speak.png";
import Logo from "../logo/logo";

function Profile_created() {
  return (
    <div>
      <div className="wrapper">
        <div className="page_wrapper">
          <Logo />
          <h3 className="page_name">Profile created</h3>
          <img className="page_img" src={speak} />
        </div>
      </div>
    </div>
  );
}

export default Profile_created;
