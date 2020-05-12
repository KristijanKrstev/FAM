import React, {Component} from 'react'
import WorkRepository from "../../repository/workRepository";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Works from "./Works";
import WorkEdit from "./WorkEdit";
import WorkAdd from "./WorkAdd";
class WorkApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: []
        }
    }


    componentDidMount() {
       this.loadWorks();
    }

    loadWorks = () => {
        WorkRepository.getAllWorks().then((data) => {
            this.setState({
                terms: data.data
            })
        })
    };

    createWork = (term) => {
        WorkRepository.createNewWork(term).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
                const newTermsRef = [...prevState.terms, newTerm];
                return {
                    "terms": newTermsRef
                }
            });
        });
    };

    updateWork = ((editedTerm) => {
        WorkRepository.updateWork(editedTerm).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
                const newTermsRef = prevState.terms.map((item) => {
                    if (item.id === newTerm.id) {
                        return newTerm;
                    }
                    return item;
                });
                return {
                    "terms": newTermsRef
                }
            });
        });
    });

    deleteWork = (workId) => {
        WorkRepository.deleteWork(workId).then((response) => {
            this.setState((state) => {
                const terms = state.terms.filter((t) => {
                    return t.id !== workId;
                });
                return {terms}
            })
        })
    }

    render() {
        return (
            <Router>
                <Route exact path={"/works"}
                       render={() => <Works onDelete={this.deleteWork} updateWork={this.updateWork}
                                            items={this.state.terms}/>}/>
                <Route exact path={"/works/add"} render={()=> <WorkAdd onCreateWork={this.createWork}/>}>
                </Route>
                <Route exact path={"/works/edit/:termId"} render={() => <WorkEdit onSubmit={this.updateWork}/>}/>
            </Router>
        );

    }
}

export default WorkApp;