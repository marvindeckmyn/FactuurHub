import React, {useState} from "react";
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function FactuurForm(props) {
    const [state, setState] = useState({
        factuurnummer : "",
        factuurdatum : "",
        ondernemingNaam: "",
        ondernemingAdres: "",
        ondernemingBtwNummer: "",
        ondernemingBankrekeningNummer: "",
        vervaldatum: "",
        goederen: "",
        subtotaal: "",
        btwPercentage: "",
        btwPrijs: "",
        totaal: "",
        betalingsstatus: "",
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
            "factuurnummer":state.factuurnummer,
            "factuurdatum":state.factuurdatum,
            "ondernemingNaam":state.ondernemingNaam,
            "ondernemingAdres":state.ondernemingAdres,
            "ondernemingBtwNummer":state.ondernemingBtwNummer,
            "ondernemingBankrekeningNummer":state.ondernemingBankrekeningNummer,
            "vervaldatum":state.vervaldatum,
            "goederen":state.goederen,
            "subtotaal": parseFloat(state.subtotaal),
            "btwPercentage": parseInt(state.btwPercentage),
            "btwPrijs": parseFloat(state.btwPrijs),
            "totaal": parseFloat(state.totaal),
            "betalingsstatus": parseInt(state.betalingsstatus),
        }

        axios.post(API_BASE_URL+'/invoices', payload, { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN) }})
            .then(function(response) {
                if(response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Factuur succesvol toegevoegd. Je wordt naar de factuurhub gestuurd...'
                    }))
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
                console.log(error.response);
            });
    }

        const redirectToHome = () => {
            props.history.push('/home');
        }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h1>Factuur toevoegen</h1>
            <form>
                <div className="form-group text-left">
                    <label htmlFor="factuurnummer">Factuurnummer</label>
                    <input type="text" className="form-control" id="factuurnummer" value={state.factuurnummer} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="factuurdatum">Factuurdatum</label>
                    <input type="date" className="form-control" id="factuurdatum" value={state.factuurdatum} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="ondernemingNaam">Naam onderneming</label>
                    <input type="text" className="form-control" id="ondernemingNaam" value={state.ondernemingNaam} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="ondernemingAdres">Adres onderneming</label>
                    <input type="text" className="form-control" id="ondernemingAdres" value={state.ondernemingAdres} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="ondernemingBtwNummer">BTW nummer onderneming</label>
                    <input type="text" className="form-control" id="ondernemingBtwNummer" value={state.ondernemingBtwNummer} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="ondernemingBankrekeningNummer">Bankrekeningnummer onderneming</label>
                    <input type="text" className="form-control" id="ondernemingBankrekeningNummer" value={state.ondernemingBankrekeningNummer} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="vervaldatum">Vervaldatum</label>
                    <input type="date" className="form-control" id="vervaldatum" value={state.vervaldatum} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="goederen">Goederen</label>
                    <input type="text" className="form-control" id="goederen" value={state.goederen} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="subtotaal">Subtotaal (euro)</label>
                    <input type="number" className="form-control" id="subtotaal" value={state.subtotaal} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="btwPercentage">BTW %</label>
                    <input type="number" className="form-control" id="btwPercentage" value={state.btwPercentage} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="btwPrijs">BTW prijs (euro)</label>
                    <input type="number" className="form-control" id="btwPrijs" value={state.btwPrijs} onChange={handleChange} required/>
                </div>
                
                <div className="form-group text-left">
                    <label htmlFor="totaal">Totaal (euro)</label>
                    <input type="number" className="form-control" id="totaal" value={state.totaal} onChange={handleChange} required/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="betalingsstatus">Betalingsstatus</label>
                    <select className="form-control" id="betalingsstatus" name="betalingsstatus" value={state.betalingsstatus} onChange={handleChange} required>
                        <option value=""> </option>
                        <option value="1">Te betalen</option>
                        <option value="2">Betaald</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Voeg factuur toe</button>
            </form>
        </div>
    )

}

export default withRouter(FactuurForm);