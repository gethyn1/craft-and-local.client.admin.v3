const { JSDOM } = require('jsdom')
const Adapter = require('enzyme-adapter-react-16')
const { configure } = require('enzyme')

/**
 * Setup enzyme
 */
configure({ adapter: new Adapter() })

/**
 * Setup JSDOM
 */
const jsdom = new JSDOM(
  '<!doctype html><html><body><div id="root"></div></body></html>',
  {
    url: 'http://localhost/'
  }
)
const { window } = jsdom

function copyProps (src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  })
}

global.window = window
global.window.date = Date
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function (id) {
  clearTimeout(id)
}
copyProps(window, global)

/**
 * Mock date for react etsting library
 * https://github.com/kentcdodds/react-testing-library/issues/300
 */
window.Date = Date
window.fetch = () => {}

/**
 * Ignore css / sass imports
 * https://stackoverflow.com/questions/33324435/how-to-ignore-non-js-files-with-babel-register
 */
// eslint-disable-next-line node/no-deprecated-api
require.extensions['.scss'] = () => {}
// eslint-disable-next-line node/no-deprecated-api
require.extensions['.less'] = () => {}
// eslint-disable-next-line node/no-deprecated-api
require.extensions['.css'] = (file) => {}
