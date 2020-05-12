import React from 'react';
import Card from './cardTransaction'
import {Link} from "react-router-dom";
class Transactions extends React.Component{

    render() {
        return (
            <div style={{height:'100%'}}>
                <Link to={"/transactions/add"} className="button button5">addTR</Link>
                { this.props.items.map((item, index) => (
                <Card onDelete={this.props.onDelete} item={item} key={index}/>
            ))}
            </div>
        )
    }
}

export default Transactions;