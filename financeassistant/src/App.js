import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Users from './components/Users/UserApp'
import Accounts from './components/Accounts/AccountApp'
import Transactions from './components/Transactions/transactionApp'
import Header from './components/Header/header'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SavingsApp from "./components/Savings/savingsApp";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import img from "../src/images/logo6.png"
import {Login} from "./components/UserManagement/Login";
import {Logout} from "./actions/securityActions"
import WorkApp from "./components/Works/WorkApp";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: [],
            nameOfUser: ""
        }
    }

    setNameOfUser = (nameOfUser) => {
        this.setState({nameOfUser: nameOfUser})
    }

    componentDidMount() {
        document.title = 'FAM';
        document.body.style.background = `url(${img}) no-repeat`;
        document.body.style.background = 'height: 100%';
        document.body.style.backgroundSize = "100%"
    }


    render() {
        const routing = (
            <Router>
                <Route exact path="/logout" render={() => <Logout setNameOfUser={""}/>}/>
                <Header nameOfUser={this.state.nameOfUser}/>
                {
                    //Public Routes
                }
                <Switch>
                    <Route exact path="/" render={() => <Landing/>}/>
                    <Route exact path="/register" render={() => <Register/>}/>
                    <Route exact path="/login" render={() => <Login setNameOfUser={this.setNameOfUser}/>}/>
                    {
                        //Private Routes
                    }
                    <Route path="/users" render={() => <Users/>}/>
                    <Route path="/accounts" render={() => <Accounts/>}/>
                    <Route path="/transactions" render={() => <Transactions/>}/>
                    <Route path="/works" render={() => <WorkApp/>}/>
                    <Route path="/savings" render={() => <SavingsApp/>}/>
                    <Route path="/dashboard" render={() => <Dashboard/>}/>
                </Switch>
            </Router>
        );
        return (
            <div className="App" style={{height: '100%'}}>
                {routing}
            </div>
        );
    }

}

export default App;
