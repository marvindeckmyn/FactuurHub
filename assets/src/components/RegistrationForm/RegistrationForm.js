import React, {useState} from "react";
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
function RegistrationForm(props) {

    const [state, setState] = useState ({
        username : "",
        password : "",
        confirmPassword: "",
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
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError("Wachtwoorden komen niet overeen");
        }
    }

    const sendDetailsToServer = () => {
        if(state.username.length && state.password.length) {
            props.showError(null);
            const payload={
                "username":state.username,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'/signup', payload)
                .then(function (response) {
                    if(response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registratie succesvol. Je wordt gestuurd naar de startpagina...'
                        }))
                        localStorage.setItem(ACCESS_TOKEN, `Bearer ${response.data.jwt}`);
                        redirectToHome();
                        props.showError(null)
                    } else {
                        props.showError("Error");
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        } else {
            props.showError('Vul een geldige username en wachtwoord in')
        }
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }

    const redirectToLogin = () => {
        props.history.push('/login');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h1>Registratie</h1>
            <form>
                <div className="form-group text-left">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Vul je username in" value={state.username} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="password">Wachtwoord</label>
                    <input type="password" className="form-control" id="password" placeholder="Vul je wachtwoord in" value={state.password} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="password">Bevestig wachtwoord</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Bevestig je wachtwoord" value={state.confirmPassword} onChange={handleChange} required/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Registreer</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>

            <div classname="mt-2">
                <span>Heb je al een account?</span>
                <button className="loginText" onClick={() => redirectToLogin()}>Login</button>
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);