import React from 'react';
import Card from './cardAccounts'
import {Link} from "react-router-dom";
class Accounts extends React.Component{

    render() {
        return (
            <div>
                <Link to={"/accounts/add"} className="button button5">addAC</Link>
               { this.props.items.map((item, index) => (
                    <Card onDelete={this.props.onDelete} item={item} key={index}/>
                ))}
            </div>
        )
    }
}

export default Accounts;