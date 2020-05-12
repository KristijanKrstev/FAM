import React from 'react'
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
function cardAccounts(props) {
    return(
    <Card className={"mx-auto card mb-3"} style={{width: '18rem',margin:20,backgroundColor: 'rgba(244, 0, 0, 0.5)',color:'#000000'}}>
        <Card.Body>
            <Card.Header><b>Name: <Link to={`/accounts/edit/${props.item.id}`} style={{color:'#000000'}}> {props.item.name}</Link></b></Card.Header>
            <br/>
            <p>
                <b>InitialBalance: {props.item.initialBalance}</b>
            </p>
            <button onClick={()=>props.onDelete(props.item.id)} className="btn btn-danger" style={{backgroundColor:'#d00000'}}>Delete</button>
        </Card.Body>
        <div className="card-footer">
            <b>{props.item.type}</b>
        </div>
    </Card>


    )
}

export default cardAccounts;