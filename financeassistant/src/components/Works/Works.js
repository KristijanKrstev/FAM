import React from 'react';
import Card from './WorkCard'
import {Link} from "react-router-dom";
class Works extends React.Component{

    render() {
        return (
            <div>
                <b style={{color: '#ff0325'}}>You can delete or edit just if you are admin on that work!!!</b>
                <br/>
                <Link to={"/works/add"} className="button button5">addWR</Link>
                {this.props.items.map((item, index) => (
                    <Card onDelete={this.props.onDelete} updateUser={this.props.updateWork} item={item} key={index}/>
                ))}
            </div>
        )
    }
}

export default Works;