import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'

import { IConnectionEdge } from './Types'
import Waiting from './Waiting'
import { pageInfo } from './Fragments'
import { pairwise as fragments } from './Fragments'
import { colors } from '../theme'
//import { ReactComponent as PersonIcon } from '../theme/person-icon.svg'
import { FaSolidPerson as PersonIcon } from 'solid-icons/fa';
import { createQuery } from '@merged/solid-apollo'
import Box from './Box'
import { createSignal, Suspense } from 'solid-js'
import { Link } from '@solidjs/router'
import P from './Paragraph'
import Button from './Button'
import Stack from './Stack'

export const CONNECTIONS_QUERY = gql`
  query GetConnections($cursor: String) {
    connections(last: 10, before: $cursor) {
      edges {
        ...PairwiseEdgeFragment
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  ${fragments.edge}
  ${pageInfo}
`

/*const Container = styled(Box)`
  .nav-item {
    text-decoration: none;
    border-left: 3px solid transparent;
    color: ${colors.inactive};
    svg {
      stroke: ${colors.inactive};
    }
  }
  .nav-item-active {
    border-left: 3px solid ${colors.selected};
    color: ${colors.active};
    svg {
      stroke: ${colors.selected};
      circle {
        ${() => `fill: ${colors.selected}`};
        ${() => `stroke: ${colors.selected}`};
      }
    }
  }
`*/

const Container = (props) => {
  return <Box>{props.children}</Box>
}

const Paragraph = (props) => {
  return <P {...props}/>
}

const Icon = styled(PersonIcon)`
  circle {
    ${() => `fill: ${colors.inactive}`};
    ${() => `stroke: ${colors.inactive}`};
  }
  padding-right: 12px;
  vertical-align: middle;
`

const RedDot = (props) => {
  return <Box class="rounded-xl bg-eventDot w-4 h-4" {...props}/>
}

export const [hideMenu, setHideMenu] = createSignal(false);

function Connections(props) {
  //const { loading, error, data, fetchMore } = createQuery(CONNECTIONS_QUERY)
  const data = createQuery(CONNECTIONS_QUERY);
  const {loading, error} = data;
  // Reverse order so that last connection is displayed first.
  // Add numbers to similar names. TODO: backend should do this.
  const names: { [key: string]: number } = {}
  const getItems = (data) => {
    console.log('getItems', data)
    const items = [...(data?.connections?.edges || [])].reverse().map((item) => {
      const name = item.node.theirLabel
      if (names[name]) {
        names[name] += 1
      } else {
        names[name] = 1
      }
      return {
        ...item,
        node: {
          ...item.node,
          theirLabel: `${name} ${names[name] > 1 ? `(${names[name]})` : ''}`,
        },
      }
    })
    return items;
  }
  

  return (
    <>
      <Suspense fallback={<Waiting loading={loading} error={error} />}>
        <Container margin="none">
          {getItems(data())?.map(({ node }: IConnectionEdge) => (
            <Link
              onClick={() => {
                setHideMenu(false)
              }}
              href={`/connections/${node.id}`}
              className={({ isActive }) =>
                isActive ? 'nav-item nav-item-active' : 'nav-item'
              }
            >
              <Box direction="row" align="center" pad="1rem">
                <Stack anchor="top-right">
                  <Icon width="30px" height="30px" />
                  {node.events?.nodes[0] && !node.events?.nodes[0].read && (
                    <RedDot />
                  )}
                </Stack>
                <Paragraph id={`conn-${node.id}`} margin="none">
                  {node.theirLabel}
                </Paragraph>
              </Box>
            </Link>
          ))}
          {data()?.connections.pageInfo.hasPreviousPage && (
            <Button
              label="Load more"
              onClick={() =>
                fetchMore({
                  variables: {
                    cursor: data().connections.pageInfo.startCursor,
                  },
                })
              }
            ></Button>
          )}
        </Container>
    </Suspense>
    </>
  )
}

export default Connections
