import React, {Component} from "react";
import UserService from "../../repository/userRepository";
import {Link, Redirect} from "react-router-dom"
import setJWTToken from "../../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import {

    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBModalFooter,
    MDBRow
} from "mdbreact";

let userName = "";

class Register extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            dateOfBirth: "",
            email: "",
            password: "",
            confirmPassword: "",
            isRegg: false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    findUserName = () => {
        const jwtToken = localStorage.jwtToken;
        if (jwtToken) {
            setJWTToken(jwtToken);
            const decoded_jwtToken = jwt_decode(jwtToken);
            userName = decoded_jwtToken.name;
        } else {
            userName = ""
        }
        return userName;
    };


    // //promeneno e treba da napravam novo !!!
    //     // componentWillReceiveProps(nextProps) {
    //     //    if (nextProps.errors) {
    //     //         this.setState({ errors: nextProps.errors });
    //     //     }
    //     // }

    handleSetState = () => {
        this.setState({
            isRegg: true
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        UserService.createNewUser(newUser).then(() => {
            this.handleSetState();
        });
    };


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors} = this.state;
        let classNames = require('classnames');
        return (
            <MDBContainer>
                <MDBRow className=" my-3">
                    <MDBCol className="m-auto" md="6">
                        <form onSubmit={this.onSubmit}>
                            {this.findUserName() !== "" ? <Redirect to={"/users"}/> : <div/>}
                            {this.state.isRegg ? <Redirect to={{pathname: '/login'}}/> : <div/>}
                            <MDBCard style={{backgroundColor: 'rgba(9, 127, 254, 0.1)'}}>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header morpheus-den-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="lock"/> Sign Up
                                        </h3>
                                    </MDBCardHeader>
                                    <p></p>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classNames("form-control form-control-lg", {
                                                "is-invalid": errors.name
                                            })}
                                            placeholder="Name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChange}
                                            required
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <div>Choise your date of brth:</div>
                                        <input
                                            type="date"
                                            className="form-control form-control-lg"
                                            name={"dateOfBirth"}
                                            value={this.state.dateOfBirth}
                                            onChange={this.onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className={classNames("form-control form-control-lg", {
                                                "is-invalid": errors.email
                                            })}
                                            placeholder="Email Address"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            required
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.onChange}
                                            required
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-info btn-block mt-4"/>

                                    <MDBModalFooter>
                                        <Link className="btn btn-primary" to="/login">You are a member? Login</Link>
                                    </MDBModalFooter>
                                </MDBCardBody>
                            </MDBCard>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    }
}

export default Register;