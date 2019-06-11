import React from 'react'
import { Link } from '../../../components/link'
import { AppLayout } from '../../layouts'

const Dashboard = () => {
  return (
    <AppLayout>
      <p>This is the dashboard <Link path="/">Go to homepage</Link></p>
    </AppLayout>
  )
}

export {
  Dashboard
}
