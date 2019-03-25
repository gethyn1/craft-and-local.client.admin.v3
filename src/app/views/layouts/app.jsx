import React from 'react'
import { Layout, Typography, Menu } from 'antd'
import { Link } from '../../components/link'

import 'antd/dist/antd.css'

const { Header, Content } = Layout
const { Title } = Typography

const AppLayout = ({ children }) => (
  <Layout>
    <Header>
      <Title style={{
        color: '#fff',
        float: 'left',
        margin: '0 64px 0 0'
      }}>Craft &amp; Local</Title>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="producers"><Link path="/producers">Producers</Link></Menu.Item>
        <Menu.Item key="categories"><Link path="/categories">Categories</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {children}
      </div>
    </Content>
  </Layout>
)

export {
  AppLayout
}
