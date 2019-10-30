import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lists from './Lists';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import TodoList from "./TodoList";

ReactDOM.render((
        <TodoList />
), document.getElementById('root'));


serviceWorker.unregister();
