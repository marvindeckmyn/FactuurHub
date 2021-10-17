import React, {useState, useEffect} from "react";
function Alert(props) {

    const [modelDisplay, toggleDisplay] = useState('none');

    const openModal = () => {
        toggleDisplay('block');
    }

    const closeModal = () => {
        toggleDisplay('none');
        props.hideError(null);
    }

    useEffect(() => {
        if(props.errorMessage !== null) {
            openModal()
        } else {
            closeModal()
        }
    });

    return(
        <div className={"alert alert-danger alert-dismissable mt-4"} role="alert" id="alertPopUp" style={{ display: modelDisplay }}>
            <div className="d-flex alertMessage">
                <span>{props.errorMessage}</span>
                <button type="button" className="close" onClick={() => closeModal()}>
                    <span>&times;</span>
                </button>
            </div>
        </div>
    )
}

export default Alert