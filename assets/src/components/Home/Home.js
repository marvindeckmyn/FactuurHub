import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/apiConstants";
import axios from 'axios'
function Home(props) {

    useEffect(() => {
        axios.get(API_BASE_URL+"/invoices", { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN) }})
        .then(function (response) {
            if(response.status !== 200) {
                redirectToLogin()
            }
        })
        .catch(function (error) {
            redirectToLogin()
        });
    })

    function redirectToLogin() {
        props.history.push('/login');
    }

    return (
        <div className="mt-2">
            <h1>Factuurhub</h1>
        </div>
    )
}

export default withRouter(Home);