//import { useQuery, gql } from '@apollo/client'
import { createQuery, gql} from '@merged/solid-apollo'
//import { useNavigate } from 'react-router-dom'
import { useNavigate } from '@solidjs/router'
import Waiting from './Waiting'
import Box from './Box'
import Heading from './Heading'
import Text from './Text'
import Image from './Image'
//import styled from 'styled-components'

export const CONNECTIONS_QUERY = gql`
  query GetConnections {
    connections(last: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
`

const CartoonBox = (props:any) => {
  return <Box class="items-center align-center" {...props}>{props.children}</Box>
}

/*const CartoonBox = styled(Box)`
  justify-content: center;
  align-items: center;
`*/

function Home() {
  const navigate = useNavigate()
 /* const onCompleted = (data: any) => {
    if (data && data.connections.edges.length > 0) {
      const { id } = data.connections.edges[0].node
      navigate(`/connections/${id}`)
    }
  }*/

//  const { loading, error, data } = useQuery(CONNECTIONS_QUERY, {
  const data = createQuery(CONNECTIONS_QUERY, {

    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first', // Used for subsequent executions

    //onCompleted,
  })
  console.log('loading', data.loading, 'error', data.error, 'latest', data());
  const isLoading = (loadeddata) => loadeddata.loading || (!loadeddata.error && !loadeddata.latest)
  const showWaiting = (loadeddata) => isLoading(loadeddata) || loadeddata.error;
  const showIntroduction = (loadeddata) => 
    !isLoading(loadeddata) &&
    (loadeddata.error || !loadeddata.latest?.connections?.edges || loadeddata.latest?.connections?.edges.length === 0)
  return (
    <>
      {showWaiting(data) && (
        <Box>
          <Waiting loading={data.loading} error={data.error} />
        </Box>
      )}
      {showIntroduction(data) && (
        <div>
          <CartoonBox direction="row-responsive" align="start" gap="small">
            <Box align="start" width="medium" pad="small">
              <Heading level={2}>Make new connection</Heading>
              <Text size="medium">
                You can see your connections here, but haven't made any
                connections yet.
              </Text>
              <br />
              <Text size="medium">
                Use <b>add connection</b> for connecting existing invitation
                from services or persons.
              </Text>
              <br />
              <Text size="medium">
                Create <b>new invitation</b> for inviting service or person to
                connect to you.
              </Text>
            </Box>
            <Box height="medium" width="small">
              <Image src="/img/phone-f1.svg" fit="contain" />
            </Box>
          </CartoonBox>
        </div>
      )}
    </>
  )
}

export default Home
