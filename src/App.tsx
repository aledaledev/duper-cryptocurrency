import React, { useState } from 'react'
//routes por switch
import {Routes, Route, Link } from 'react-router-dom'
import {Layout, Typography, Space} from 'antd'
import './app.css'

import {Navbar,Homepage,Exchanges,Cryptocurrencies,CryptoDetails,News} from './components'

function App() {

  //index = path='/'
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar/>
      </div>

      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route index element={<Homepage/>} />
              <Route path='/exchanges' element={<Exchanges/>} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies simplified={false}/>}>
                <Route path='crypto/:coinId' element={<CryptoDetails/>} />
              </Route>
              <Route path='/crypto/:coinId' element={<CryptoDetails/>} />
              <Route path='/news' element={<News simplified={false}/>} />
            </Routes>
          </div>
        </Layout>

      <div className='footer'>
        <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
          CryptoLocura <br/>
          All rights reserverd
        </Typography.Title>
        <Space>
          <Link to='/'>Home</Link>
          <Link to='/exchanges'>Exchanges</Link>
          <Link to='/news'>News</Link>
        </Space>

      </div>
      </div>
    </div>
  )
}

export default App
