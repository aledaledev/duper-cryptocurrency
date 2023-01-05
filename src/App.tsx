import React, { useState } from 'react'
import { Route, Link } from 'react-router-dom'
import {Layout, Typography, Space} from 'antd'
import './app.css'

import {Navbar} from './components'

function App() {

  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar/>
      </div>
      <main className='main'>

      </main>
      <footer className='footer'>
        
      </footer>
    </div>
  )
}

export default App
