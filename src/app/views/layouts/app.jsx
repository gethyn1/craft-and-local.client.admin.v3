import React from 'react'
import { Layout, Typography } from 'antd'

import 'antd/dist/antd.css'

const { Header, Content } = Layout
const { Title } = Typography

const AppLayout = ({ children }) => (
  <Layout>
    <Header>
      <Title style={{ color: '#fff' }}>Craft &amp; Local</Title>
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
