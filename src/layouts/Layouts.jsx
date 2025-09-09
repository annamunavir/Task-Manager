import React from 'react'
import Header from '../components/navbar/Header'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
   <>
   <Header/>
   <main>
     <Outlet/>
   </main>
   </>
  )
}

export default Layouts