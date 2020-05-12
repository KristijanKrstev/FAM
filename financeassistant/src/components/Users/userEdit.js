import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import UserService from "../../repository/userRepository";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";

const UserEdit = (props) => {
    const [term, setTerm] = useState({});
    const {termId} = useParams();
    const history = useHistory();


    useEffect(() => {
        UserService.getUser(termId).then((response) => {
            const term = response.data;
            const newTerm = {
                ...term,
                "dateOfBirth": formatDate(term.dateOfBirth)
            }
            setTerm(newTerm);
        })
    },[termId])

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            "userId": termId,
            "Name": e.target.username.value,
            "dateOfBirth": e.target.dateOfBirth.value,
            "Email": e.target.email.value
        });
        history.push("/users");
    }

    function formatDate(string){
        return new Date(string).toLocaleDateString("fr-CA");

    }
    const handelCancelBtn = () => {
        history.push("/users");
    }

    const handleTermOnChange = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        let obj = {...term};
        obj[paramName]=paramValue;
        setTerm(obj);
    }

    return (
        <div>
            <MDBContainer>
                <MDBRow className=" my-5">
                    <MDBCol className="m-auto">
                        <form onSubmit={onFormSubmit}>
                            <MDBCard style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="user-cog"/> Your account
                                        </h3>
                                    </MDBCardHeader>
                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left" icon="user"
                                              label={"Username"} name={"username"} type="text" validate error="wrong"
                                              value={term.username}
                                              success="right"
                                              required/>
                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left" icon="at"
                                              label={"Email"} name={"email"} type="text" validate error="wrong"
                                              value={term.email}
                                              success="right"
                                              required/>

                                    <MDBInput onChange={handleTermOnChange} containerClass="text-left"
                                              icon="calendar-alt" value={term.dateOfBirth} name={"dateOfBirth"}
                                              type="date" validate error="wrong"
                                              success="right"
                                              required/>


                                    <button style={{backgroundColor: 'rgba(255, 255, 255,1)'}} type="submit"
                                            className="btn ">Submit
                                    </button>

                                    <button style={{backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000000'}}
                                            onClick={handelCancelBtn} type="submit" className="btn ">Cancel
                                    </button>
                                </MDBCardBody>
                            </MDBCard>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )

}

export default UserEdit;