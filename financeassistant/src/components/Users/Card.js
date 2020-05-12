import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
function UserCard(props) {

    return(
            <Card className={"mx-auto card mb-3"} style={{ width: '18rem',margin:20,backgroundColor: 'rgba(244, 0, 0, 0.5)',color:'#000000'}}>
               <Card.Body>
                    <Card.Title>Name: <Link to={`/users/edit/${props.item.id}`} style={{color:'#000000'}}> {props.item.name}</Link></Card.Title>
                    <Card.Text style={{color:'#000000'}}>
                        <b>Email: {props.item.email}</b>
                    </Card.Text>
                    <Button onClick={()=>props.onDelete(props.item.id)} className="btn btn-danger" style={{backgroundColor:'#d00000'}}>Delete</Button>
                </Card.Body>
            </Card>
    )
}

export default UserCard;