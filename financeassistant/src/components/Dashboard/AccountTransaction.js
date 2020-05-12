import React, {Component} from "react";
import Table from "react-bootstrap/Table";

class AccountTransaction extends Component{

    render(){

        const acc = (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Date: </th>
                    <th>Amount:</th>
                    <th>Account:</th>
                </tr>
                </thead>
                <tbody>
                {this.props.accounts.map((item,index) => (
                    <tr key={index} style={item.tr_transaction==='Withdrawal' ? {backgroundColor:'#d00000'} : {backgroundColor:'green'}}>
                    <td>{index+1}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.tr_transaction}</td>
                    </tr>
                ))}

                </tbody>
            </Table>
        )

        return(
            <div>
                {acc}
            </div>
        )
    }


}

export default AccountTransaction;