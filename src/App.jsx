import React from 'react'
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
      {/* Layout route with Navbar */}
      <Route path='/' element={<Layouts />}>
        <Route index element={<Home />} />

        {/* Auth */}
        <Route path='authentication' element={<LoginSignUp/>} />

        {/* Tasks */}
        <Route path='addTask' element={<AddTask />} />
        <Route path='tasks' element={<ViewTask />} />

        {/* Task details with nested edit */}
        <Route path='task/:id' element={<TaskDetail />}>
          <Route path='edit' element={<EditTask />} /> 
        </Route>
      </Route>
    </Routes>
  )
}

export default App
