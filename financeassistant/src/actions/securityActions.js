import React from "react";
import { Redirect} from "react-router-dom"
import axios from '../custom-axios/axios'
import setJWTToken from "../securityUtils/setJWTToken"
import jwt_decode from "jwt-decode"

export const login = LoginRequest => {
    return axios.post("/users/login",LoginRequest).then((resp) => {
        const {token} = resp.data;
        localStorage.setItem("jwtToken",token);
        setJWTToken(token);
        const decodedToken = jwt_decode(token);
        return decodedToken;
    })

};

export const Logout = () => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    return <Redirect to={"/login"}/>
};