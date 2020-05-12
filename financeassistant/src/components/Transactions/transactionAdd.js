import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AccountRepository from "../../repository/accountRepository";
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

const TransactionAdd = (props) => {
    const history = useHistory();
    const [allAccounts, setAllAccounts] = useState([]);

    useEffect(() => {
        AccountRepository.getAllAccounts().then((response) => {
            setAllAccounts(response.data)
        });
    },[]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newTerm = {
            Date: e.target.date.value,
            Amount: e.target.amount.value,
            Description: e.target.description.value,
            Tr_transaction: e.target.Tr_transaction.value,
            Account: e.target.account.value
        };
        props.onCreateTransaction(newTerm);
        history.push("/transactions");
    };



    const handelCancelBtn = () => {
        history.push("/transactions");
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <MDBContainer>
                    <MDBRow className=" my-4">
                        <MDBCol className="m-auto" >
                            <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="exchange-alt"/> ADD YOUR TRANSACTION
                                        </h3>
                                    </MDBCardHeader>

                                    <MDBInput containerClass="text-left" icon="calendar-alt" name={"date"} type="date" validate error="wrong"
                                              success="right" required/>

                                    <MDBInput containerClass="text-left" icon="sort-amount-up-alt" label="Amount" name={"amount"} type="amount" validate error="wrong"
                                              success="right" required/>


                                    <MDBInput containerClass="text-left" icon="file-alt" label="Description" name={"description"} type="text" validate error="wrong"
                                              success="right" required/>

                                    <select className="browser-default custom-select" name={"Tr_transaction"} style={{backgroundColor: 'rgba(244, 0, 0, 0.2)'}} required>
                                        <option value="">--Select one--</option>
                                        <option value="Withdrawal">Withdrawal</option>
                                        <option value="Deposit">Deposit</option>
                                    </select>
                                    <br/><br/>
                                    <select className="browser-default custom-select" name={"account"} style={{backgroundColor: 'rgba(244, 0, 0, 0.2)'}} required>
                                        <option value="">Choose from which account</option>
                                        {
                                            allAccounts.map((e, key) => {
                                                return <option key={key} value={e.value}>{e.name}</option>
                                            })
                                        }
                                    </select>
                                    <br/><br/>
                                    <button style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} type="submit" className="btn ">Create Transaction</button>

                                    <button style={{backgroundColor:'rgba(255, 255, 255, 1)', color:'#000000'}} onClick={handelCancelBtn} type="submit" className="btn ">Cancel</button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>
        </div>
    )
};

export default TransactionAdd;