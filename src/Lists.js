import React from 'react';
import './App.css';
import {Link, NavLink, Route, Switch} from 'react-router-dom';
import TodoItems from "./TodoItems";
import axios from 'axios';
import TodoList from "./TodoList";

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            lists:[],
            inputText: "",
            currentId: 0
        };
        this.getData();
    }
    getData(){
        axios.get('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists')
            .then(res=>{
                this.setState({
                    lists:res.data
                })
            })
    }
    handleChange = (e) => {
        this.setState({
            inputText: e.target.value
        })
    }
    addNewProject=()=>{
        this.getData();
        console.log(this.state)
        this.setState({
            currentId: this.state.lists.length
        });
        console.log(this.state);

        const newProject = {
            id: this.state.lists.length+1,
            to: '/'+ this.state.currentId,
            label: this.state.inputText
        };
        axios.post('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists',
            {
                label: newProject.label,
                to: newProject.to,
                currentId: newProject.id
            })
            .then(res=>{
                console.log("+");
                this.getData();
            })
    }
    renderProjects(){
        return this.state.lists.map(project => {
            return(
                <li>
                    <NavLink to={project.to}>
                        {project.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
       // let todoElements = this.state.lists.map( t =>  );

        return <div>
            <div>
                <input value={this.state.inputText} onChange={this.handleChange}/>
                <button onClick={this.addNewProject}>Add project</button>
                <nav>
                    <ul className="projects">
                        {/*{this.renderProgects()}*/}
                        {/*<li><NavLink to="/">Home</NavLink></li>*/}
                        {/*<li><NavLink to='/1'>first project</NavLink></li>*/}
                        {this.renderProjects()}
                    </ul>
                </nav>
                <TodoList id={this.state.currentId}/>
            </div>
        </div>
    }
}
export default Lists;
