import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import App from './App'
//import { ApolloProvider } from '@apollo/client'
import './index.css'
import { ApolloProvider, ApolloClient } from '@merged/solid-apollo';
import {cache} from './apollo'
import config from './config'
import client from './apollo'


/*const client = new ApolloClient({
  uri: `${config.gqlUrl}/query`,
  cache
})*/

const container = document.getElementById('root')
render(() => 
    <>
      <Router>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    </>
    , container
)

