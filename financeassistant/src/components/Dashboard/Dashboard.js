import React, {Component} from 'react';
import '../../App.css'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import AccountTransaction from './AccountTransaction'
import TransactionService from "../../repository/transactionRepository";
import Table from "react-bootstrap/Table";
import img from "../../images/logo1.jpg"

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            terms: []
        }

    }

    componentDidMount() {
        this.loadAccounts()
    }

    loadAccounts = () => {
        TransactionService.getAllTransactions().then((data) => {
            this.setState({
                terms:data.data
            })
        })
    };

    render() {
        const routing = (
            <Table>
                <thead>
                <tr>
                    <th></th>
                    <th>Last transactions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><Calendar/></td>
                    <td><AccountTransaction accounts={this.state.terms}/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><img src={img} style={{height:'250px'}} alt={"SaveMoney"}/></td>
                </tr>
                </tbody>
            </Table>

        )
        return(
            <div style={{height:'100%'}}>
                {routing}
            </div>
        );
    }


}
export default Dashboard;