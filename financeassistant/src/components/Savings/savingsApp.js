import React, {Component} from "react";
import SavingsRepository from "../../repository/savingsRepository";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Savings from "./savingsCard"
import SavingsAdd from "./savingsAdd"
import SavingsEdit from "./savingsEdit"

class SavingsApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            terms: []
        }
    }

    componentDidMount() {
        this.loadSavings()
    }

    loadSavings = () => {
        SavingsRepository.getAllSavings().then((data) => {
            this.setState({
                terms: data.data
            })
        })
    };


    createSavings = (term) => {
        SavingsRepository.createSavings(term).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
                const newTermRef = [...prevState.terms, newTerm];
                return {
                    "terms": newTermRef
                }
            })
        })
    };

    updateSavings = ((term) => {
        SavingsRepository.updateSavings(term).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
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

    deleteSavings = (sId) => {
        SavingsRepository.deleteSavings(sId).then((response) => {
            this.setState((prevState) => {
                const terms = prevState.terms.filter((item) => {
                    return item.id !== sId;
                });
                return {terms}
            })
        })
    };

    CheckInitialBalance = (Id) => {
        SavingsRepository.getInitialBalance(Id).then(() => {
            this.loadSavings();
        });
    }

    render() {
        const routing = (
            <Router>
                <main>
                    <div>
                        <Route exact path={"/savings"}
                               render={() => <Savings CheckInitialBalance={this.CheckInitialBalance}
                                                      onDelete={this.deleteSavings} items={this.state.terms}/>}>
                        </Route>
                        <Route exact path={"/savings/add"}
                               render={() => <SavingsAdd onCreateSavings={this.createSavings}/>}>
                        </Route>
                        <Route exact path={"/savings/edit/:termId"}
                               render={() => <SavingsEdit onSubmit={this.updateSavings}/>}>
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

export default SavingsApp;