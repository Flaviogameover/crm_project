import logo from '../images/crm-logo.png';
import {useNavigate} from 'react-router-dom';


export const Nav = () => {

    const navigate = useNavigate();
    return (
        <nav>
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
            <div className="controls-container">
                <div className="icon" onClick={()=>navigate('/ticket')}>&#65291;</div>
                <div className="icon" onClick={()=>navigate('/')}>((</div>
                <div className="icon"></div>
            </div>
        </nav>
    );
}