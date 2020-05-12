import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCardBody,
    MDBIcon,
    MDBCardHeader,
    MDBInput, MDBCard
} from "mdbreact";

const AccountAdd = (props) => {
    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newTerm = {
            "Name": e.target.name.value,
            "type": e.target.type.value,
            "currency": e.target.currency.value,
            "InitialBalance": e.target.initialBalance.value
        };
        props.onCreateAccount(newTerm);
        history.push("/accounts");
    };

    const handelCancelBtn = () => {
        history.push("/accounts");
    }



    return (
        <MDBContainer>
            <MDBRow className=" my-4">
                <MDBCol className="m-auto" >
                    <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                        <form onSubmit={onFormSubmit}>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                    <h3 className="my-3">
                                        <MDBIcon icon="file-invoice-dollar"/> ADD YOUR ACCOUNT CARD
                                    </h3>
                                </MDBCardHeader>
                                <MDBInput containerClass="text-left" icon="credit-card" label="Account name"
                                          name={"name"} type="text" validate error="wrong"
                                          success="right" required/>
                                <select style={{backgroundColor: 'rgba(244, 0, 0, 0.2)'}}
                                        className="browser-default custom-select" name={"type"} required aria-required="true">
                                    <option value="">--Select one type--</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Cash">Cash</option>
                                </select>
                                <MDBInput containerClass="text-left" icon="hand-holding-usd" label="Currency"
                                          name={"currency"} type="text" validate error="wrong"
                                          success="right" required/>

                                <MDBInput containerClass="text-left" icon="dollar-sign" label="InitialBalance"
                                          name={"initialBalance"} type="number" min="0" validate error="wrong"
                                          success="right" required/>

                                <button style={{backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000000'}}
                                        type="submit" className="btn ">Create Account
                                </button>
                                <button onClick={handelCancelBtn} type="submit"
                                        style={{backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000000'}}
                                        name={"cancelBtn"} className="btn ">Cancel
                                </button>
                            </MDBCardBody>
                        </form>

                    </MDBCard>


                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
};

export default AccountAdd;