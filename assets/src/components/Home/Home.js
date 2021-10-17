import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/apiConstants";
import axios from 'axios'
function Home(props) {
    const [paidInvoices, setPaidInvoices] = useState([])
    const [unpaidInvoices, setUnpaidInvoices] = useState([])

    useEffect(() => {
        axios.get(API_BASE_URL+"/invoices", { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN) }})
        .then(function (response) {
            const invoices = response.data.data
            var paid = []
            var unpaid = []

            getUnpaidInvoices(invoices, unpaid);
            getPaidInvoices(invoices, paid);

            if(response.status !== 200) {
                redirectToLogin()
            }
        })
        .catch(function (error) {
            redirectToLogin()
        });

    }, [])

    function getPaidInvoices(invoices, paid) {
        for (var j = 0; j < invoices.length; j++) {
            if (invoices[j].Betalingsstatus === 2) {
                paid.push(invoices[j]);
            }
        }

        setPaidInvoices(paid);
    }

    function getUnpaidInvoices(invoices, unpaid) {
        for (var i = 0; i < invoices.length; i++) {
            if (invoices[i].Betalingsstatus === 1) {
                unpaid.push(invoices[i]);
            }
        }

        setUnpaidInvoices(unpaid);
        return i;
    }

    function redirectToLogin() {
        props.history.push('/login');
    }

    return (
        <div className="mt-2">
            <h1>Facturen</h1>
            <h2>Te betalen</h2>
            <ul>
                {
                    unpaidInvoices.map(unpaidInvoice => <li key={unpaidInvoice.ID}>{unpaidInvoice.OndernemingNaam} ({unpaidInvoice.Factuurnummer})</li>)
                }
            </ul>
            <h2>Betaald</h2>
            <ul>
                {
                    paidInvoices.map(paidInvoice => <li key={paidInvoice.ID}>{paidInvoice.OndernemingNaam} ({paidInvoice.Factuurnummer})</li>)
                }
            </ul>
        </div>
    )
}

export default withRouter(Home);