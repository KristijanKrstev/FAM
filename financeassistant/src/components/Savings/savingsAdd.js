import React from 'react';
import {useHistory} from 'react-router-dom';
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";

const SavingsAdd = (props) => {
    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newTerm = {
            "date": e.target.date.value,
            "hope_savings": e.target.hope_savings.value,

        };
        props.onCreateSavings(newTerm);
        history.push("/savings");
    };


    const handelCancelBtn = () => {
        history.push("/savings");
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <MDBContainer>
                    <MDBRow className=" my-5">
                        <MDBCol className="m-auto">
                            <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="exchange-alt"/> ADD YOUR SAVINGS DATA
                                        </h3>
                                    </MDBCardHeader>
                                    <MDBInput containerClass="text-left" icon="calendar-alt" name={"date"} type="date"
                                              validate error="wrong"
                                              success="right" required/>
                                    <MDBInput containerClass="text-left" icon="sort-amount-up-alt" label="Hope savings"
                                              name={"hope_savings"} type="number" validate error="wrong"
                                              success="right" required/>


                                    <br/><br/>
                                    <button style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} type="submit" className="btn ">Add saving</button>

                                    <button style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} type="submit" className="btn " onClick={handelCancelBtn}>Cancel</button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>
        </div>
    )
};

export default SavingsAdd;