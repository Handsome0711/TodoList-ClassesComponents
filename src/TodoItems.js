import React from 'react';
import axios from 'axios';

class TodoItems extends React.Component {
    constructor(props){
        super(props)
        this.state={
            message: this.props.message
        }
    }
    handleChange = (e) =>{
        this.setState({
            message: e.target.value
        })
    }
    render() {
        return <li>
            <button className="edit-button" onClick={()=>this.props.putTextInInput(this.props.message, this.props.id)}>edit</button>
            <label className={this.props.complete===false ? "notComplete" : "complete" } onClick={()=>{
                if(this.props.complete===true)
                    this.props.completeItem(this.props.id)
                else
                    this.props.uncompleteItem(this.props.id)
            }}>
                {this.props.message}
            </label>
            <button onClick={()=>this.props.deleteItem(this.props.id)} className="delete-button">X</button>
        </li>
    }
}
export default TodoItems;
