import { useNavigate } from 'react-router-dom';
import styles from './Error.module.css';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.errorPage}>
            <h1>Oops, something went wrong!</h1>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    );
}

export default Error;