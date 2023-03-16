//import { useQuery, gql } from '@apollo/client'
import { createQuery, gql } from '@merged/solid-apollo'
import Waiting from './Waiting'
//import WebauthnLogin from './WebauthnLogin'
import WebauthnLogin from './WebauthnLogin2'

import styled from 'styled-components'
import { device } from '../theme'
import { createContext, createSignal, JSXElement, onMount } from 'solid-js'
import {createStore} from 'solid-js/store'
import Box from './Box'
import Heading from './Heading'
import Text from './Text'
import Image from './Image'

const USER_QUERY = gql`
  query GetUser {
    user {
      name
    }
  }
`

const CartoonBox = (props) => {
  return <Box {...props}>{props.children}</Box>
}

const ImageBox = (props) => {
  return <Box>{props.children}</Box>
}

interface IProps {
  children: JSXElement
}

export const UserContext = createContext([{ username: '' },{}])

const UserGate = (props) => {
  const data = createQuery(USER_QUERY);
  let loading = false;
  /*if(!user){
    loading = true;
  }*/
  return <>{props.children(data()?.user)}</>
}
export const [username, setUsername] = createSignal('username')

const unauthenticated = (data) => {
  console.log('unauthenticated', data)
  return data === undefined;
  return data?.error?.graphQLErrors.find(
  (item) => item.extensions && item.extensions.code === 'UNAUTHENTICATED'
)}


function Login(props: IProps) {
  /*const { error, loading } = createQuery(USER_QUERY, {
    errorPolicy: 'all',
    onCompleted: (data) => setUsername(data.user.name),
  })*/

  const [username, setUsername] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(null);
  const [authenticated, setAuthenticated] = createSignal(false);
  let data = createQuery(USER_QUERY);
  /**
   * 
   * 
   * */ 
  /*onMount(() => {
    
    const user = data()?.user;
    console.log('user query res', user);
    if(!user){
      setLoading(true);
    }
    setAuthenticated(!unauthenticated(user));
  })*/
  

  //const {error, loading, state, latest} = data;
  
  return (
    <>
       {unauthenticated(data()?.user) ? (
        <div class="w-1/2">
          <Box direction="row-responsive" align="start" gap="small">
            <Box align="start" class="p-2 w-2/3" >
              <Heading level={2}>Welcome to Findy Web Wallet</Heading>
              <Text size="medium">
                You can use your wallet to make connections with services and
                persons to receive and share verifiable data.
              </Text>
              <br />
              <Text size="medium">
                Start your journey by registering your device with email
                address. You don't need passwords - you can use your fingerprint
                or hardware key.
              </Text>
            </Box>
            <ImageBox height="medium" width="small">
              <Image src="/img/computer-m1.svg" fit="contain" />
            </ImageBox>
          </Box>

          <Box class="w-4/5 drop-shadow-md bg-white p-4">
            <Image
              alt="Findy logo"
              class="w-1/3 my-5 mx-auto"
              src="/img/logo.svg"
            />
            {window.PublicKeyCredential ? (
              <WebauthnLogin />
            ) : (
              <div>
                <Box
                  direction="row-responsive"
                  align="start"
                  gap="small"
                >
                  <Box align="start" width="medium" class="p-2">
                    <Heading level={2}>Welcome to Findy Web Wallet</Heading>
                    <Text size="medium">
                      Web wallet login not supported in this browser!
                    </Text>
                  </Box>
                  <ImageBox height="medium" width="small">
                    <Image src="/img/sad-computer-m2.svg" fit="contain" />
                  </ImageBox>
                </Box>
              </div>
            )}
          </Box>
        </div>
      ) : (
          <>
                
            {() => {
              const [state, setState] = createStore({ username: '' });
              const usernamestore = [
                state,
                {
                  setUserName(name:string) {
                    setState("username", name);
                  },
                },
              ];

              console.log('user', data()?.user?.name)
              let _username = data()?.user?.name;
              if(_username && username!==_username){
                setUsername(_username);
                setState("username", _username);  
              }
              if(loading() || error() ){
                console.log('rendering waiting', loading(), error())
                return <>
                  <Waiting loading={loading()} error={error()} />
                </>
              }
              return (
                <UserContext.Provider value={usernamestore}>
                  {props.children}
                </UserContext.Provider>
              )
            }}
          </>
      )}
    </>
  )
}

export default Login
