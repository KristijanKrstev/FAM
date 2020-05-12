import React, {Component} from "react";
import AccountService from "../../repository/accountRepository"
import {BrowserRouter as Router, Route} from "react-router-dom";
import Accounts from "./accounts"
import AccountEdit from "./accountEdit"
import AccountAdd from "./accountAdd"
class AccountApp extends Component {
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
        AccountService.getAllAccounts().then((data) => {
            this.setState({
                terms:data.data
            })
        })
    };

    searchAccount = (term) => {
        AccountService.searchAccounts(term).then((response) => {
            this.setState({
                terms: response.data
            })
        })
    };

    createAccount = (term) => {
        AccountService.createAccount(term).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
                const newTermRef = [...prevState.terms,newTerm];
                return{
                    "terms": newTermRef
                }
            })
        })
    }

    updateAccount = ((term) => {
        AccountService.updateUser(term).then((response) => {
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

    deleteAccount = (accountId) => {
        AccountService.deleteAccount(accountId).then((response)=>{
            this.setState((prevState) => {
                const terms = prevState.terms.filter((item) => {
                    return item.id!==accountId;
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
                        <Route exact path={"/accounts"} render={()=> <Accounts onDelete={this.deleteAccount} items={this.state.terms}/>}>
                        </Route>
                        <Route exact path={"/accounts/add"} render={()=> <AccountAdd onCreateAccount={this.createAccount}/>}>
                        </Route>
                        <Route exact path={"/accounts/edit/:termId"} render={() => <AccountEdit onSubmit={this.updateAccount}/>}>
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

export default AccountApp;