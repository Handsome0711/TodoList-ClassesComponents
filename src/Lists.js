import React from 'react';
import './App.css';
import {NavLink, Route, Switch} from 'react-router-dom';
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


    renderProjects(){
        return this.state.lists.map(project => {
            return(
                <li>
                    <NavLink to={project.to}  className="links" activeClassName="active">
                        {project.label}
                    </NavLink>
                    <button className="delete-button" onClick={()=>{
                        this.deleteList(project.id)
                    }}>X</button>
                </li>
            )
        })
    }
    deleteList(id){
        axios.delete('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+id)
            .then(res=>{
                this.getListsData();
            })
    }
    render() {
        return <div>
            <div className="projects">
                <input className="new-project" value={this.state.inputText} onChange={this.handleChange}/>
                <button className="add-project-button" onClick={this.addNewProject}>Add project</button>
                <nav>
                    <ul className="projects">
                        {this.renderProjects()}
                    </ul>
                </nav>
            </div>
            <div className="main">
                <Switch>
                    <Route path={'/:id'} component={TodoList}/>
                </Switch>
            </div>
        </div>

    }
}
export default Lists;
