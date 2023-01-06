import React, { useEffect, useState } from 'react'
import {Button, Menu, Typography, Avatar} from 'antd'
import {Link} from 'react-router-dom'
import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import icon from '../assets/images/cryptocurrency.png'

const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize',handleResize)
    handleResize()

    return () => window.removeEventListener('resize',handleResize)
  },[])

  useEffect(() => {
    if(screenSize < 768) { 
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  },[screenSize])

  const menuItems = [
    {
      key:'home',
      icon:<HomeOutlined/>,
      label:<Link to='/'>Home</Link>
    },
    {
      key:'cryptocurrencies',
      icon: <FundOutlined/>,
      label:<Link to='/cryptocurrencies'>Cryptocurrencies</Link>
    },
    {
      key:'exchanges',
      icon:<MoneyCollectOutlined/>,
      label:<Link to='/exchanges'>Exchanges</Link>
    },
    {
      key:'news',
      icon: <BulbOutlined/>,
      label:<Link to='/news'>News</Link>
    }
  ]

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size='large'/>
            <Typography.Title level={2} className="logo">
                <Link to='/'>CryptoLocura</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={()=> setActiveMenu(!activeMenu)}>
              <MenuOutlined/>
            </Button>
        </div>
        {activeMenu?<Menu theme='dark' items={menuItems} />:null}
    </div>
  )
}

export default Navbar