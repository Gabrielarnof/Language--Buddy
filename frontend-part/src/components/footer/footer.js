import React from "react";
import "./footer.css"
import logo_languagelab_transparent from '../../images/logo_languagelab_transparent.png';
import logo_occ from '../../images/logo_occ.png';
import logo_Transparent_Migracode from '../../images/logo_Transparent_Migracode.png';

function Footer() {
    return (
        <footer>
          <div className="wrapper">

            <div className="footer-wrapper">

              <div className="language-selector">
                <p>Select Language:</p>
                  <select>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
              </div>
             
              <nav>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </nav>

             <div className="logos">
                <ul>
                  <li><a href="https://openculturalcenter.org/language-lab/"> <img  className="lab" src={logo_languagelab_transparent} alt="Language lab logo" width="100%" height="60"  /></a></li>
                  <li><a href="https://openculturalcenter.org/"> <img  className="occ" src={logo_occ} alt="logo OCC"  width="100%" height="60"/></a></li>
                  <li><a href="https://migracode.openculturalcenter.org/"><img  className="migracode" src={logo_Transparent_Migracode} alt= "logo Migracode" width="100%" height="60"/></a></li>
                </ul>
             </div>
      
            </div>
            
            <div className="copyright">
               <p> &copy;{new Date().getFullYear()} Language Buddy | All rights reserved</p>
            </div>
          
          </div>
      </footer>
    )
}

export default Footer;