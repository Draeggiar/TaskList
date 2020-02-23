import * as React from 'react'
import { Route } from 'react-router'
import Home from './components/Home/HomeContainer'
import TaskGroupEdit from './components/TaskGroup/TaskGroupEditContainer'

import './App.scss'

export default () => (
  <>
    <Route exact path="/" component={Home} />
    <Route path="/taskGroup/:groupId?" component={TaskGroupEdit} />
  </>
)
