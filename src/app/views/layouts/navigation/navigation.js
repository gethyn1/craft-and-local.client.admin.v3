import React from 'react'
import { Menu } from 'antd'
import { Link } from '../../../components/link'

const handleLogout = (onLogout) => (event) => {
  event.preventDefault()
  onLogout()
}

const NavigationMenu = ({ onLogout }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    style={{ lineHeight: '64px' }}
  >
    <Menu.Item key="producers"><Link path="/producers">Producers</Link></Menu.Item>
    <Menu.Item key="categories"><Link path="/categories">Categories</Link></Menu.Item>
    <Menu.Item key="logout"><a href="/logout" onClick={handleLogout(onLogout)}>Logout</a></Menu.Item>
  </Menu>
)

const Navigation = ({ isAuthenticated, onLogout }) =>
  isAuthenticated ? <NavigationMenu onLogout={onLogout} /> : null

export {
  Navigation
}
