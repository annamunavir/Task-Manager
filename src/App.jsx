import React from 'react'
import './app.scss'
import { Route, Routes } from 'react-router-dom'
import AddTask from './pages/task/AddTask'
import EditTask from './pages/task/EditTask'
import ViewTask from './pages/task/ViewTask'
import Layouts from './layouts/Layouts'
import Home from './pages/home/Home'
import LoginSignUp from './pages/loginSignup/LoginSignUp'
import TaskDetail from './pages/task/TaskDetail'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layouts />}>
        <Route index element={<Home />} /><Route path='authentication' element={<LoginSignUp/>} />
        <Route path='addTask' element={<AddTask />} />
        <Route path='tasks' element={<ViewTask />} />
        <Route path='task/:id' element={<TaskDetail />}>
        <Route path='edit' element={<EditTask />} /> 
        </Route>
      </Route>
    </Routes>
  )
}

export default App
