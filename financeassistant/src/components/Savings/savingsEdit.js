import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import SavingsRepository from "../../repository/savingsRepository";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";

const SavingsEdit = (props) => {
    const [term, setTerm] = useState({});
    const {termId} = useParams();
    const history = useHistory();


    useEffect(() => {
        SavingsRepository.getSavings(termId).then((response) => {
            const term = response.data;
            const newTerm = {
                ...term,
                "date": formatDate(term.date)
            }
            setTerm(newTerm);
        })
    },[termId])

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            id: termId,
            saving: term.saving,
            date: e.target.date.value,
            previos_state: term.previos_state,
            hope_savings: e.target.hope_savings.value
        });
        history.push("/savings");
    }

    function formatDate(string){
        return new Date(string).toLocaleDateString("fr-CA");

    }

    const handelCancelBtn = () => {
        history.push("/savings");
    }

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        let obj = {...term};
        obj[paramName]=paramValue;
        setTerm(obj);
    }


    return (
        <MDBContainer>
            <MDBRow className=" my-4">
                <MDBCol className="m-auto" >
                    <form onSubmit={onFormSubmit}>
                        <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                    <h3 className="my-3">
                                        <MDBIcon icon="exchange-alt"/> You can change DATE and HOPE SAVINGS
                                    </h3>
                                </MDBCardHeader>
                                <MDBInput
                                    onChange={handleTermOnChange}
                                          type={"number"}
                                          name={"hope_savings"}
                                          containerClass="text-left" icon="dollar-sign" label={"Hope savigns: "} validate error="wrong"
                                          success="right"
                                          required
                                          value={term.hope_savings}
                                />
                                <MDBInput onChange={handleTermOnChange} containerClass="text-left" icon="calendar-alt" name={"date"}  data-date-format="yyyy-MM-dd"  validate error="wrong"
                                          success="right" required type="date" value={term.date}/>

                                <button style={{backgroundColor:'#ffffff', color:'#000000'}} type="submit" className="btn ">Submit</button>

                                <button onClick={handelCancelBtn} style={{backgroundColor:'#ffffff', color:'#000000'}} type="submit" className="btn ">Cancel</button>

                            </MDBCardBody>
                        </MDBCard>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

    )

}

export default SavingsEdit;