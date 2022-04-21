import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

//fazer o login e atualizar a database

export const ModalLogin = () => {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([
        "user_ticket",
        "token_ticket",
    ]);
    const handleSubmit = async(e) =>{
        e.preventDefault();
    
        const {email,password} = e.target;
    
        const data = {
            email: email.value,
            password: password.value
        };
    
        const response = await axios.post("http://localhost:8000/login",data);
        const success = response.status === 201;
        if(success){
            const {session,user} = response.data.info;
            setCookie("token_ticket",session);
            setCookie("user_ticket",user);
            window.location.reload();
        }
    };
    return (
        <div className="modal-login">
            <div className="modal-login-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="remember"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="remember"
                            >
                                Check me out
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
