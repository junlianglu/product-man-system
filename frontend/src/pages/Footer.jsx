import { Link } from 'react-router-dom';
import { 
    FaYoutube, 
    FaTwitter, 
    FaFacebook,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <div>
                    <a href="https://youtube.com" target='_blank' rel='noreferrer'><FaYoutube /></a>
                    <a href="https://twitter.com" target='_blank' rel='noreferrer'><FaTwitter /></a>
                    <a href="https://facebook.com" target='_blank' rel='noreferrer'><FaFacebook /></a>
                </div>
                <div>
                    <Link to='/privacy'>Privacy</Link>
                    <Link to='/terms'>Terms</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;