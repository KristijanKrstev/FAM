import React, {useState} from "react";
import {login} from "../../actions/securityActions"
import {Link, Redirect} from "react-router-dom"
import setJWTToken from "../../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn
} from "mdbreact";


let userName = "";
export const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function findUserName() {
        const jwtToken = localStorage.jwtToken;
        if (jwtToken) {
            setJWTToken(jwtToken);
            const decoded_jwtToken = jwt_decode(jwtToken);
            userName = decoded_jwtToken.name;
        } else {
            userName = ""
        }
        return userName;
    }


    function onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
            email: email,
            password: password
        };

        login(LoginRequest).then((token) => {
            props.setNameOfUser(token.name);
            // setShouldRedirect(true)
        });


    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }


    return (

        <form onSubmit={onSubmit}>
            {findUserName() !== "" ? <Redirect to={"/users"}/> : <div/>}
            <MDBContainer>
                <MDBRow className="my-5">
                    <MDBCol className="m-auto" md="6">
                        <MDBCard style={{backgroundColor: 'rgba(244, 0, 0, 0.1)'}}>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                    <h3 className="my-3">
                                        <MDBIcon icon="lock"/> Login:
                                    </h3>
                                </MDBCardHeader>
                                <label
                                    htmlFor="defaultFormEmailEx"
                                    className="grey-text font-weight-light"
                                />
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    required
                                />

                                <label
                                    htmlFor="defaultFormPasswordEx"
                                    className="grey-text font-weight-light"
                                />
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    required
                                />

                                <div className="text-center mt-4">
                                    <MDBBtn color="red" className="mb-3" type="submit">
                                        Login
                                    </MDBBtn>
                                </div>

                                <MDBModalFooter>
                                        <Link className="btn btn-danger" to="/register">Not a member? Sign
                                          Up</Link>
                                </MDBModalFooter>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </form>

    );

}