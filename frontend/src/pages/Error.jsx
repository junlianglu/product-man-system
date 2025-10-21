import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Oops, something went wrong!</h1>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    );
}

export default Error;