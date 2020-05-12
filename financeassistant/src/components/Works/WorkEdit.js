import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import WorkService from "../../repository/workRepository"
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";

const WorkEdit = (props) => {
    const [term, setTerm] = useState({});
    const {termId} = useParams();
    const history = useHistory();


    useEffect(() => {
        WorkService.getWork(termId).then((response) => {
            const term = response.data;
            setTerm(term);
        })
    },[termId])

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            "workId": termId,
            "Name": e.target.name.value,
            "Address": e.target.address.value,
            "Number": e.target.number.value
        });
        history.push("/works");
    }

    const handelCancelBtn = () => {
        history.push("/works");
    }

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        let obj = {...term};
        obj[paramName]=paramValue;
        setTerm(obj);
    }

    return (
        <div>
            <MDBContainer>
                <MDBRow className=" my-5">
                    <MDBCol className="m-auto">
                        <form onSubmit={onFormSubmit}>
                            <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="place-of-worship"/> WORK!
                                        </h3>
                                    </MDBCardHeader>
                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left" icon="building"
                                              label={"Name of work"} name={"name"} type="text" validate error="wrong"
                                              value={term.name}
                                              success="right"
                                              required/>
                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left" icon="map-marked-alt"
                                              label={"Address"} name={"address"} type="text" validate error="wrong"
                                              value={term.address}
                                              success="right"
                                              required/>

                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left"
                                              icon="phone" label={"Number:"} value={term.number} name={"number"}
                                              validate error="wrong"
                                              success="right"
                                              required/>


                                    <button style={{backgroundColor: 'rgb(255, 255, 255)'}} type="submit"
                                            className="btn ">Submit
                                    </button>

                                    <button style={{backgroundColor: 'rgb(255, 255, 255)', color: '#000000'}}
                                            onClick={handelCancelBtn} type="submit" className="btn ">Cancel
                                    </button>
                                </MDBCardBody>
                            </MDBCard>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )

}

export default WorkEdit;