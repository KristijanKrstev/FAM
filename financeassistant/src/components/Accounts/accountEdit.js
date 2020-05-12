import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import AccountService from '../../repository/accountRepository'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardHeader,
    MDBInput
} from "mdbreact";

const AccountEdit = (props) => {
    const [term, setTerm] = useState({});
    const {termId} = useParams();
    const history = useHistory();


    useEffect(() => {
        AccountService.getAccount(termId).then((response) => {
            const term = response.data;
            const newTerm = {
                ...term,
                "Name": term.name
            }
            setTerm(newTerm);
        })
    },[termId])

    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            ...term,
            "accountId": termId,
            "Name": e.target.name.value,
            "type": e.target.type.value,
            "currency": e.target.currency.value,
            "initialBalance": e.target.initialBalance.value
        });
        history.push("/accounts");
    }

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        let obj = {...term}
        obj[paramName]=paramValue
        setTerm(obj);
    }

    const handleOnCancel= () => {
        history.push("/accounts");
    }



    return (
        <div>
            <MDBContainer>
                <MDBRow className=" my-4">
                    <MDBCol className="m-auto" >
                        <form onSubmit={onFormSubmit}>
                            <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="file-invoice-dollar"/> EDIT YOUR ACCOUNT CARD
                                        </h3>
                                    </MDBCardHeader>
                                    <MDBInput onChange={handleTermOnChange}
                                              type={"text"}
                                              name={"name"}
                                              value={term.name}
                                              containerClass="text-left" icon="credit-card" label={"Account name: "} validate error="wrong"
                                              success="right"
                                              required
                                    />

                                    <select style={{backgroundColor: 'rgba(244, 0, 0, 0.2)'}}
                                            required
                                            onChange={handleTermOnChange}
                                            value={term.type}
                                            className="browser-default custom-select" name={"type"}>
                                        <option value="">--Select one type--</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Cash">Cash</option>
                                    </select>

                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left" icon="hand-holding-usd"  name={"currency"} type="text" validate error="wrong"
                                              success="right" value={term.currency} required />

                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left" icon="dollar-sign"   name={"initialBalance"} type="number" min="0" validate error="wrong"
                                              success="right" value={term.initialBalance} required />


                                    <button style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} type="submit" className="btn ">Submit</button>

                                    <button onClick={handleOnCancel} style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} type="submit" className="btn ">Cancel</button>
                                </MDBCardBody>
                            </MDBCard>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )

}

export default AccountEdit;