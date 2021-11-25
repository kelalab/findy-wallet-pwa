let gqlHost;
let authHost;
let httpScheme = 'http';
let wsScheme = 'ws';
if(process.env.NODE_ENV === "development"){
  gqlHost = process.env.REACT_APP_GQL_HOST || 'localhost:8085'
  authHost = process.env.REACT_APP_AUTH_HOST || 'localhost:8088'
  httpScheme = process.env.REACT_APP_HTTP_SCHEME || 'http'
  wsScheme = process.env.REACT_APP_WS_SCHEME || 'ws'
} else {
  if(process.env.REACT_APP_GQL_HOST){
    gqlHost = process.env.REACT_APP_GQL_HOST;
  }
  if(process.env.REACT_APP_AUTH_HOST){
    authHost = process.env.REACT_APP_AUTH_HOST;
  }
  if(process.env.REACT_APP_HTTP_SCHEME){
    httpScheme = process.env.REACT_APP_HTTP_SCHEME;
  }
  if(process.env.REACT_APP_WS_SCHEME){
    wsScheme = process.env.REACT_APP_WS_SCHEME;
  }
}

const config = {
  wsUrl: `${wsScheme}://${gqlHost}`,
  gqlUrl: `${httpScheme}://${gqlHost}`,
  authUrl: `${httpScheme}://${authHost}`,
}

console.log('config', config, process.env);

export default config
