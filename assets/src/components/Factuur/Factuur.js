import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/apiConstants";
import axios from "axios";

function Factuur(props) {
    const [invoice, setInvoice] = useState([])
    const [betalingsstatus, setBetalingsstatus] = useState([])

    useEffect(() => {
        axios.get(API_BASE_URL + "/invoices/" + localStorage.getItem("factuurId"), { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN) } })
            .then(function (response) {
                setInvoice(response.data.data);

                if (response.data.data.Betalingsstatus === 1) {
                    setBetalingsstatus("Te betalen")
                } else {
                    setBetalingsstatus("Betaald")
                }

                if (response.status !== 200) {
                    redirectToLogin()
                }
            })
            .catch(function (error) {
                redirectToLogin()
            });
    }, [])

    function deleteInvoice() {
        axios.delete(API_BASE_URL + "/invoices/" + localStorage.getItem("factuurId"), { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN) } })
            .then(function (response) {
                if (response.status === 200) {
                    redirectToHome();
                    props.showError(null)
                } else {
                    props.showError("Error");
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

function redirectToLogin() {
    props.history.push('/login');
}

const redirectToHome = () => {
    props.history.push('/home');
}

return (
    <div className="mt-2">
        <h1>Factuur</h1>
        <ul>
            <li>Factuurnummer: {invoice.Factuurnummer}</li>
            <li>Factuurdatum: {invoice.Factuurdatum}</li>
            <li>Vervaldatum: {invoice.Vervaldatum}</li>
            <li>Naam onderneming: {invoice.OndernemingNaam}</li>
            <li>Adres onderneming: {invoice.OndernemingAdres}</li>
            <li>BTW nummer onderneming: {invoice.OndernemingBtwNummer}</li>
            <li>Bankrekeningnummer onderneming: {invoice.OndernemingBankrekeningNummer}</li>
            <li>Goederen: {invoice.Goederen}</li>
            <li>Subtotaal: {invoice.Subtotaal}</li>
            <li>BTW %: {invoice.BtwPercentage}</li>
            <li>BTW prijs: {invoice.BtwPrijs}</li>
            <li>Totaal: {invoice.Totaal}</li>
            <li>Betalingsstatus: {betalingsstatus}</li>
        </ul>

        <div classname="mt-2">
            <button className="deleteText" onClick={() => deleteInvoice()}>Delete</button>
        </div>

        <div classname="mt-2">
            <button className="homeText" onClick={() => redirectToHome()}>Home</button>
        </div>
    </div>
)
}

export default withRouter(Factuur)