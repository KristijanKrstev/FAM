import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import TransactionService from '../../repository/transactionRepository'
import {Form, FormGroup} from "react-bootstrap";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";

const TransactionEdit = (props) => {
    const [term, setTerm] = useState({});
    const {termId} = useParams();
    const history = useHistory();


    useEffect(() => {
        TransactionService.getTransaction(termId).then((response) => {
            const term = response.data;
            const newTerm = {
                ...term,
                "date": formatDate(term.date)
            };
            setTerm(newTerm);
        })
    },[termId]);

    function formatDate(string){
        return new Date(string).toLocaleDateString("fr-CA");

    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            transactionId: termId,
            Date: e.target.date.value,
            Amount: term.amount,
            Description: e.target.description.value,
            Tr_transaction: term.tr_transaction
        });
        history.push("/transactions");
    }

    const handelCancelBtn = () => {
        history.push("/transactions");
    }

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        let obj = {...term}
        obj[paramName] = paramValue;
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
                                        <MDBIcon icon="exchange-alt"/> You can change DATE and DESCRIPTION
                                    </h3>
                                </MDBCardHeader>
                                <br/>
                                <FormGroup>
                                   <Form.Control onChange={handleTermOnChange} size="lg" type="date" name={"date"} defaultValue={term.date} />
                                    <Form.Text className="text-muted">
                                        Change date for transaction
                                    </Form.Text>
                                </FormGroup>
                                <FormGroup>
                                    <Form.Control  onChange={handleTermOnChange} size="lg" readOnly defaultValue={term.amount} name={"amount"} />
                                    <Form.Text className="text-muted">
                                        This is amount from transaction
                                    </Form.Text>
                                </FormGroup>

                                <FormGroup>
                                    <Form.Control  onChange={handleTermOnChange} size="lg" type="text" name={"description"}
                                                  defaultValue={term.description} />
                                    <Form.Text className="text-muted">
                                        The description will remind you of the transaction
                                    </Form.Text>
                                </FormGroup>

                                <FormGroup>
                                    <Form.Control  onChange={handleTermOnChange} size="lg" name={"tr_transaction"} readOnly defaultValue={term.tr_transaction}/>
                                </FormGroup>


                                <button style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} type="submit" className="btn ">Submit</button>

                                <button style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} onClick={handelCancelBtn} type="submit" className="btn ">Cancel</button>
                            </MDBCardBody>
                        </MDBCard>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )

}

export default TransactionEdit;