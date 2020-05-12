import React from 'react';
import {useHistory} from 'react-router-dom';
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";

const WorkAdd = (props) => {
    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newTerm = {
            "Name": e.target.name.value,
            "Address": e.target.address.value,
            "Number": e.target.number.value,

        };
        props.onCreateWork(newTerm);
        history.push("/works");
    }

    const handelCancelBtn = () => {
        history.push("/works");
    }

    return (
        <form onSubmit={onFormSubmit}>
            <MDBContainer>
                <MDBRow className=" my-5">
                    <MDBCol className="m-auto">
                        <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                    <h3 className="my-3">
                                        <MDBIcon icon="place-of-worship"/> ADD YOUR WORK
                                    </h3>
                                </MDBCardHeader>
                                <MDBInput containerClass="text-left" icon="building" label="Name of work"
                                          name={"name"} type="text" validate error="wrong"
                                          success="right" required/>
                                <MDBInput containerClass="text-left" icon="map-marked-alt" label="Address of work"
                                          name={"address"} type="text" validate error="wrong"
                                          success="right" required/>
                                <MDBInput containerClass="text-left" icon="phone" label="Number of work"
                                          name={"number"} type="number" validate error="wrong"
                                          success="right" required/>

                                <br/><br/>
                                <button style={{backgroundColor:'rgb(255, 255, 255)', color:'#000000'}} type="submit" className="btn ">Submit</button>

                                <button style={{backgroundColor:'rgb(255, 255, 255)', color:'#000000'}} type="submit" className="btn " onClick={handelCancelBtn}>Cancel</button>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </form>
    )
}

export default WorkAdd;