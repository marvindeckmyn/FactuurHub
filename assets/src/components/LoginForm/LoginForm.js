import React, {useState} from "react";
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state, setState] = useState({
        username : "",
        password : "",
        successMessage: null
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "username":state.username,
            "password":state.password,
        }

        axios.post(API_BASE_URL+'/signin', payload)
            .then(function(response) {
                if(response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login succesvol. Je wordt naar de startpagina gestuurd...'
                    }))
                    localStorage.setItem(ACCESS_TOKEN, `Bearer ${response.data.jwt}`);
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.code === 204){
                    props.showError("Username en wachtwoord matchen niet");
                }
                else {
                    props.showError("Username bestaat niet");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }

    const redirectToRegister = () => {
        props.history.push('/register');
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h1>Login</h1>
            <form>
                <div className="form-group text-left">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Vul je username in" value={state.username} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="password">Wachtwoord</label>
                    <input type="password" className="form-control" id="password" placeholder="Vul je wachtwoord in" value={state.password} onChange={handleChange} required/>
                </div>

                <div className="form-check"></div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Login</button>
            </form>

            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block': 'none' }} role="alert">
                {state.successMessage}
            </div>

            <div className="registerMessage">
                <span>Heb je nog geen account?</span>
                <button className="loginText" onClick={() => redirectToRegister()}>Register</button>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);