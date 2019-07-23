import React from 'react'
import { Typography } from 'antd'
import { AppLayout } from '../../layouts'
import { WrappedLocationForm as LocationForm } from './location-form'

const { Title } = Typography

const Location = (props) => (
  <AppLayout>
    <Title>{props.title}</Title>
    <LocationForm
      location={props.location}
      updatedFields={props.pendingEntityUpdates}
      onFieldUpdate={props.onFieldUpdate}
      onSubmit={props.onSubmit}
      isUpdating={props.meta.update.isLoading}
      categories={props.categories}
    />
  </AppLayout>
)

export {
  Location
}
