import React from 'react';
import './App.css';
import TodoItems from "./TodoItems";
import axios from 'axios';

class TodoList extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      tasks:[

      ],
      inputText: "",
      currentElementId: 1,
      editItem: false,
        listId: 1
    };
  }
    componentWillReceiveProps(nextProps) {
      let url = window.location.href;
      let id = url.substring(url.lastIndexOf('/') + 1);
      axios.get('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+id+'/tasks')
          .then(res=>{
              this.setState({
                  tasks:res.data,
                  listId:id
              })
          });
  }

    getData()
   {
      axios.get('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+this.state.listId+'/tasks')
          .then(res=>{
              this.setState({
                  tasks:res.data,
              })
          });
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value
    })
  };
  handleSubmit = e =>{
    e.preventDefault();
    const newTask = {
      id: this.state.tasks.length+1,
      message: this.state.inputText,
      complete: false
    };
    this.setState({
      inputText: "",
      currentElementId: this.state.currentElementId +1
    });
    let updatedTasks = [...this.state.tasks, newTask];
      let url = window.location.href;
      let id = url.substring(url.lastIndexOf('/') + 1);
    axios.post('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+this.state.listId+'/tasks',
        {
            message: newTask.message,
            complete:newTask.complete,
        })
        .then(res=>{
          console.log("+");
          this.getData();
        })
  }
  deleteItem = (id) => {
    axios.delete('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+this.state.listId+'/tasks/' + id)
        .then(res=>{
          console.log("+");
          this.getData();
        })

  }
  completeItem = (id) => {
     axios.put('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+this.state.listId+'/tasks/'+id, {
       complete: false
     })
         .then(res => {
           this.getData();
         })
   }
   uncompleteItem = (id) => {
     axios.put('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+this.state.listId+'/tasks/'+id, {
       complete: true
     })
         .then(res => {
           this.getData();
         })
   }
   toggleEditMode=()=>{
    if (this.state.editItem ===false){
      this.setState({
        editItem: true,
      })
    }
    else
      this.setState({
        editItem: false
      })
   }
   putTextInInput=(taskText,id)=>{
    this.setState({
      inputText: taskText,
      editItem: true,
      currentElementId:id
    })
   }
   editItem = (e) =>{
     e.preventDefault();
     debugger
    axios.put('http://5da3023676c28f0014bbe66c.mockapi.io/todo/lists/'+ this.state.listId +'/tasks/' + this.state.currentElementId,{
      message: this.state.inputText
    })
        .then(res=>{
          this.getData();
        })
     this.setState({
       editItem: false,
       inputText: ""
     })
   }
  render() {
    let acceptButton = () =>{
      if(this.state.editItem===false){
        return  <button className="add-button" onClick={this.handleSubmit} type="submit">Add Task</button>
      }
      else return <button className="add-button" onClick={this.editItem} type="submit">Accept</button>
    }
    let todoElements = this.state.tasks.map( t => <TodoItems message={t.message}
                                                             id={t.id}
                                                             complete={t.complete}
                                                             deleteItem={this.deleteItem}
                                                             completeItem={this.completeItem}
                                                             uncompleteItem={this.uncompleteItem}
                                                             editItem={this.state.editItem}
                                                             toggleEditMode={this.toggleEditMode}
                                                             putTextInInput={this.putTextInInput}

    />);

    return <div>
      <h1>To-Do List</h1>
      <form onSubmit={this.state.editItem===false ? this.handleSubmit : this.editItem}>
        <input className="new-task" type="text" value={this.state.inputText} onChange={this.handleChange}/>
        {acceptButton()}
      </form>
      <ul className="tasks">
      {todoElements}
      </ul>
    </div>
  }
}

export default TodoList;
