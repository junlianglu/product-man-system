import { Link } from 'react-router-dom';
import { 
    FaYoutube, 
    FaTwitter, 
    FaFacebook,
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                <div className={styles.socialIcons}>
                    <a href="https://youtube.com" target='_blank' rel='noreferrer'><FaYoutube /></a>
                    <a href="https://twitter.com" target='_blank' rel='noreferrer'><FaTwitter /></a>
                    <a href="https://facebook.com" target='_blank' rel='noreferrer'><FaFacebook /></a>
                </div>
                <div className={styles.footerLinks}>
                    <Link to='/privacy'>Privacy</Link>
                    <Link to='/terms'>Terms</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;