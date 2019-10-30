import React from 'react';
import './App.css';
import {NavLink} from 'react-router-dom';
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
        this.getListsData();
    }

    getListsData(){
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
    };
    addNewProject=()=>{
        const newProject = {
            id: this.state.lists.length+1,
            to: '/'+ this.id,
            label: this.state.inputText
        };
        axios.post('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists',
            {
                label: newProject.label,
                to: '/'+newProject.id,
                currentId: newProject.id
            })
            .then(res=>{
                this.getListsData();
            })
    };
    setCurrentId(){
        debugger
       let url = window.location.href;
       console.log(url);
        console.log();
        return(<TodoList id={url.substring(url.lastIndexOf('/') + 1)}/>)
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
        return <div>
            <div>
                <input value={this.state.inputText} onChange={this.handleChange}/>
                <button onClick={this.addNewProject}>Add project</button>
                <nav>
                    <ul className="projects">
                        {this.renderProjects()}
                    </ul>
                </nav>
                {this.setCurrentId()}
            </div>
        </div>
    }
}
export default Lists;
