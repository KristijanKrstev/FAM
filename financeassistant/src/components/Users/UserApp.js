import React, {Component} from 'react'
import UserService from "../../repository/userRepository";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Users from "./users";
import UserEdit from "./userEdit";

class UserApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: []
        }
    }


    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        UserService.getAllUsers().then((data) => {
            this.setState({
                terms: data.data
            })
        })
    }

    searchUsers = (searchTerm) => {
        UserService.searchUsers(searchTerm).then((response) => {
            this.setState({
                terms: response.data
            })
        })
    }

    createUser = (term) => {
        UserService.createNewUser(term).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
                const newTermsRef = [...prevState.terms, newTerm];
                return {
                    "terms": newTermsRef
                }
            });
        });
    }


    updateUser = ((editedTerm) => {
        UserService.updateUser(editedTerm).then((response) => {
            const newTerm = response.data;
            this.setState((prevState) => {
                const newTermsRef = prevState.terms.map((item) => {
                    if (item.id === newTerm.id) {
                        return newTerm;
                    }
                    return item;
                })
                return {
                    "terms": newTermsRef
                }
            });
        });
    });

    deleteUser = (userId) => {
        UserService.deleteUser(userId).then((response) => {
            this.setState((state) => {
                const terms = state.terms.filter((t) => {
                    return t.userId !== userId;
                });
                return {terms}
            })
        })
    }

    render() {
        return (
            <Router>
                <Route exact path={"/users"}
                       render={() => <Users onDelete={this.deleteUser} updateUser={this.updateUser}
                                            items={this.state.terms}/>}/>
                <Route exact path={"/users/edit/:termId"} render={() => <UserEdit onSubmit={this.updateUser}/>}/>
            </Router>
        );

    }
}

export default UserApp;