import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../images/logo.jpg"
import "./ButtonCss.css"
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode"
import setJWTToken from "../../securityUtils/setJWTToken";

let userName = "";

class Header extends Component {

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
    }

     render() {
        return (
            <Navbar style={{'backgroundColor': '#d00000'}} variant="dark">
                <Link to="/dashboard">
                    <img src={Logo}
                         width="70"
                         height="40"
                         className="d-inline-block align-top"
                         alt=" "/>
                </Link>
                <Nav className="mr-auto">
                    &nbsp;&nbsp;&nbsp;
                    <Link to="/users" style={{'color': '#FFFFFF'}}>View Profile</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/accounts" style={{'color': '#FFFFFF'}}>Accounts</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/transactions" style={{'color': '#FFFFFF'}}>Transactions</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/savings" style={{'color': '#FFFFFF'}}>Savings</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/works" style={{'color': '#FFFFFF'}}>Works</Link>
                </Nav>
                {this.findUserName() !== "" ?
                    <div style={{'color': '#FFFFFF'}}>
                        <b>Hello {userName} &nbsp;&nbsp;&nbsp;</b>
                        <a href={"/logout"} style={{'color': '#FFFFFF'}}>
                            Logout
                        </a>
                    </div>
                    :
                    <div>
                        <Link className="nav-link" to="/register" style={{display: "inline",'color': '#FFFFFF'}}>
                            Sign Up
                        </Link>
                        <Link className="nav-link" to="/login" style={{display: "inline",'color': '#FFFFFF'}}>
                            Login
                        </Link>
                    </div>
                }
            </Navbar>
        )
    }
}

export default Header;