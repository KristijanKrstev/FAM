import React, {Component} from "react";
import TransactionService from "../../repository/transactionRepository"
import {BrowserRouter as Router, Route} from "react-router-dom";
import Transactions from "./transactions"
import TransactionEdit from "./transactionEdit"
import TransactionAdd from "./transactionAdd"
class TransactionApp extends Component {

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

    searchAccount = (term) => {
        TransactionService.searchTransactions(term).then((response) => {
            this.setState({
                terms: response.data
            })
        })
    };

    createAccount = (term) => {
        TransactionService.createTransactions(term).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
                const newTermRef = [...prevState.terms,newTerm];
                return{
                    "terms": newTermRef
                }
            })
        })
    }

    updateTransaction = ((term) => {
        TransactionService.updateUser(term).then((response) => {
            const newTerm = response.data;
            this.setState((prevState)=>{
                const newTermRef = prevState.terms.map((item) => {
                    if (item.id === newTerm.id) {
                        return newTerm
                    }
                    return item
                })
                return {
                    "terms": newTermRef
                }
            });
        });
    });

    deleteAccount = (transactionId) => {
        TransactionService.deleteTransaction(transactionId).then((response)=>{
            this.setState((prevState) => {
                const terms = prevState.terms.filter((item) => {
                    return item.id!==transactionId
                });
                return {terms}
            })
        })
    }

    render() {
        const routing = (
            <Router>
                <main>
                    <div>
                        <Route exact path={"/transactions"} render={()=> <Transactions onDelete={this.deleteAccount} items={this.state.terms}/>}>
                        </Route>
                        <Route exact path={"/transactions/add"} render={()=> <TransactionAdd onCreateTransaction={this.createAccount}/>}>
                        </Route>
                        <Route exact path={"/transactions/edit/:termId"} render={() => <TransactionEdit onSubmit={this.updateTransaction}/>}>
                        </Route>
                    </div>
                </main>
            </Router>
        )
        return (
            <div>
                {routing}
            </div>
        )
    }


}

export default TransactionApp;