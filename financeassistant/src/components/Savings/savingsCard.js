import React from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom"


function CardSavings(props) {


    return (
        <div>
            <b style={{color: '#ff0325'}}>You can only have one saving at a time!!!</b>
            <br/>
            <Link to={"/savings/add"} className="button button5">addSV</Link>
            {props.items.map((item, index) => (
                <Card key={item} className={"mx-auto card mb-3"}
                      style={{width: '18rem', margin: 20, backgroundColor: 'rgba(244, 0, 0, 0.5)', color: '#000000'}}>
                    <Card.Body onClick={props.CheckInitialBalance(item.id)}>
                        <Card.Title><Link to={`/savings/edit/${item.id}`} style={{color: '#000000'}}><b>Information
                            abount savings card</b></Link></Card.Title>
                        <hr/>
                        <Card.Text style={{color: '#000000'}}>
                            <b>InitialBalance: {item.saving}</b>
                        </Card.Text>
                        <Button onClick={() => props.onDelete(item.id)} className="btn btn-danger"
                                style={{backgroundColor: '#d00000'}}>Delete</Button>
                    </Card.Body>
                    <div className="card-footer" style={{color: '#ffffff'}}>
                        {item.hope_savings}
                    </div>

                </Card>
            ))}
        </div>

    )
}

export default CardSavings;