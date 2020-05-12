import React from 'react';
import {useHistory} from 'react-router-dom';

const UserAdd = (props) => {
    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newTerm = {
            "Name" : e.target.username.value,
            "dateOfBirth" : e.target.dateOfBirth.value,
            "Email" : e.target.email.value,

        };
        props.onCreateUser(newTerm);
        history.push("/users");
    }

    return (
        <div>
          <form onSubmit={onFormSubmit}>
            <p>Name: </p>
              <input name={"username"} type="text"/>
              <p>Email: </p>
              <input name={"email"} type="text" />
              <p>Choise your date of brth:</p>
              <input name={"dateOfBirth"} type="date"/>
              <br/><br/>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
}

export default UserAdd;