import React from 'react';
import Card from './Card'
class Users extends React.Component{

    render() {
        return (
            <div>
                {this.props.items.map((item, index) => (
                    <Card onDelete={this.props.onDelete} updateUser={this.props.updateUser} item={item} key={index}/>
                ))}
            </div>
        )
    }
}

export default Users;