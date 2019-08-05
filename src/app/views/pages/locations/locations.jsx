import React from 'react'
import { AppLayout } from '../../layouts'
import { EntityList } from '../../../components/entity-list'

const getLocationDescription = location => location.address

const Locations = ({ locations, deleteLocation }) => {
  return (
    <AppLayout>
      <div id="locations">
        <EntityList
          entities={locations}
          onDeleteEntity={deleteLocation}
          entityType="location"
          path="locations"
          getDescription={getLocationDescription}
        />
      </div>
    </AppLayout>
  )
}

export {
  Locations
}
