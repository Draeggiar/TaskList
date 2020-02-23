import * as React from 'react';
import { Route } from 'react-router';
import Home from './components/Home/Home';
import TaskGroupEdit from './components/TaskGroup/TaskGroupEdit';

import './custom.scss'

export default () => (
    <>
        <Route exact path='/' component={Home} />
        <Route path='/taskGroup' component={TaskGroupEdit} />
    </>
);
