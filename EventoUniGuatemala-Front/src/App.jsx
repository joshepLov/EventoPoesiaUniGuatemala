import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'



import './index.css'

export const App = ()=> {


  return (
    <>
      <Outlet />
    </>
  )
}

export default App
