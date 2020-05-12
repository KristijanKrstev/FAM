import React from 'react'
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

function cardTransaction(props) {
    return(
                <Card className={"mx-auto card mb-3"} style={{ width: '18rem',margin:20,backgroundColor: 'rgba(244, 0, 0, 0.5)',color:'#000000'}}   >
                <Card.Body>
                    <Card.Title>Description: <Link to={`/transactions/edit/${props.item.id}`} style={{color:'#000000'}}> {props.item.description}</Link></Card.Title>
                    <hr/>
                    <Card.Text style={{color:'#000000'}}>
                        <b>Amount: {props.item.amount}</b>
                    </Card.Text>
                    <button onClick={()=>props.onDelete(props.item.id)} className="btn btn-danger" style={{backgroundColor:'#d00000'}}>Delete</button>
                </Card.Body>
                <div className="card-footer" style={{color:'#000000'}}>
                    <b>{props.item.tr_transaction}</b>
                </div>
            </Card>

    )
}

export default cardTransaction;