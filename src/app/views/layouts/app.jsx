import React from 'react'
import { Layout, Typography } from 'antd'
import { ErrorBoundary } from './error-boundary'

import 'antd/dist/antd.css'
import { Navigation } from './navigation'

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
      <Navigation />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
    </Content>
  </Layout>
)

export {
  AppLayout
}
