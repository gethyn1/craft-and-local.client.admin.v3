// TODO test get cookie
const getCookie = (cookieString, name) => {
  const value = cookieString.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return value ? value[2] : null
}

export {
  getCookie
}
