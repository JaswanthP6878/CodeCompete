import {useNavigate} from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1> Home page</h1>
            <button onClick={() => navigate('/newgame')}>new game</button>
            <button onClick={() => navigate('/joingame')}>join game</button>
        </div>
    );

}

export default Home;