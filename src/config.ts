const gqlHost = process.env.REACT_APP_GQL_HOST || 'localhost:8085'
//const gqlHost = 'http://localhost:3000/gql'
const authHost = process.env.REACT_APP_AUTH_HOST || 'localhost:8088'
//const wsScheme = process.env.REACT_APP_WS_SCHEME || 'ws'

const wsHost = (gqlHost.indexOf(':') === -1)? window.location.host+gqlHost : gqlHost.replace(/http(s)?:\/\//, '');
const wsScheme = window.location.href.indexOf('https') === -1? 'ws' : 'wss';

const config = {
  wsUrl: `${wsScheme}://${wsHost}`,
  gqlUrl: `${gqlHost}`,
  authUrl: `${authHost}`,
}

console.log('config', config, process.env);

export default config
