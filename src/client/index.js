import { history } from '../app/history'
import { renderRoute } from './client'

const renderAppByRoute = renderRoute()

renderAppByRoute(location)
history.listen(renderAppByRoute)
