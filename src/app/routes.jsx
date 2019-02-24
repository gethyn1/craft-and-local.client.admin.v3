import React from 'react'
import { Dashboard } from './views/pages/dashboard'

const Homepage = () => <p>Homepage</p>

const NotFound = () => <p>404</p>

const routes = [
  {
    path: '/',
    action: () => {
      console.log('Homepage route action')
    },
    component: Homepage
  },
  {
    path: '/dashboard',
    action: () => {
      console.log('Dashboard route action')
    },
    component: Dashboard
  },
  {
    path: '/error',
    action: () => {
      console.log('Error route action')
    },
    component: NotFound
  }
]

export {
  routes
}
