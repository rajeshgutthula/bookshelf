import { faGoogle, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Footer.css';

const Footer=()=>{
    return(
        <div>
             <div className="footer-icons">
                <FontAwesomeIcon icon={faGoogle}/>
                <FontAwesomeIcon icon={faTwitter}/>
                <FontAwesomeIcon icon={faInstagram}/>
                <FontAwesomeIcon icon={faYoutube}/>
            </div>
            <div className="footer">
                <p>Contact Us</p>
            </div>
        </div>
    )
}
export default Footer;