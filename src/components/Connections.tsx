import React, { Dispatch, SetStateAction } from 'react'
import { Box, Button, Stack, Paragraph as P } from 'grommet'
import styled from 'styled-components'

import { useQuery, gql } from '@apollo/client'

import { IConnectionEdge } from './Types'
import { NavLink } from 'react-router-dom'
import Waiting from './Waiting'
import { pageInfo } from './Fragments'
import { pairwise as fragments } from './Fragments'
import { colors } from '../theme'
import { ReactComponent as PersonIcon } from '../theme/person-icon.svg'

export const CONNECTIONS_QUERY = gql`
  query GetConnections($cursor: String) {
    connections(last: 100, after: $cursor) {
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

const activeClassName = 'nav-item-active'

const Row = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;
  border-left: 3px solid transparent;
  color: ${colors.inactive};
  svg {
    stroke: ${colors.inactive};
  }

  &.${activeClassName} {
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
`

const Paragraph = styled(P)`
  font-size: 0.95rem;
  font-weight: 500;
`

const Icon = styled(PersonIcon)`
  circle {
    ${() => `fill: ${colors.inactive}`};
    ${() => `stroke: ${colors.inactive}`};
  }
  padding-right: 12px;
  vertical-align: middle;
`

const RedDot = styled(Box)`
  background: ${colors.eventDot};
  border-radius: 50%;
  width: 10px;
  height: 10px;
`

function Connections({
  hideMenu,
  conOpen,
}: {
  hideMenu?: Dispatch<SetStateAction<boolean>>
  conOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const { loading, error, data, fetchMore } = useQuery(CONNECTIONS_QUERY)

  // Add numbers to similar names. Revers order so that last connection is displayed first.
  const items = [...(data?.connections?.edges || [])]
    .reduce(
      (result, item) => {
        const foundName = result.names.find(
          (nameItem: { name: string; index: number }) =>
            nameItem.name === item.node.theirLabel
        )

        if (foundName) {
          return {
            names: result.names.map(
              (nameItem: { name: string; index: number }) =>
                nameItem.name === item.node.theirLabel
                  ? { name: nameItem.name, index: nameItem.index + 1 }
                  : nameItem
            ),
            items: [
              ...result.items,
              {
                ...item,
                node: {
                  ...item.node,
                  theirLabel:
                    item.node.theirLabel + ' (' + foundName.index + ')',
                },
              },
            ],
          }
        }
        return {
          names: [...result.names, { name: item.node.theirLabel, index: 1 }],
          items: [...result.items, item],
        }
      },
      { items: [], names: [] }
    )
    .items.reverse()
  return (
    <>
      {loading || error ? (
        <Waiting loading={loading} error={error} />
      ) : (
        <Box margin="none">
          {items.map(({ node }: IConnectionEdge) => (
            <Row
              onClick={() => {
                hideMenu!(false)
                conOpen!(true)
              }}
              key={node.id}
              to={`/connections/${node.id}`}
            >
              <Box direction="row" align="center" pad="1rem">
                <Stack anchor="top-right">
                  <Icon width="30px" height="30px" />
                  {node.events?.nodes[0] && !node.events?.nodes[0].read && (
                    <RedDot />
                  )}
                </Stack>
                <Paragraph margin="none">{node.theirLabel}</Paragraph>
              </Box>
            </Row>
          ))}
          {data.connections.pageInfo.hasNextPage && (
            <Button
              label="Load more"
              onClick={() =>
                fetchMore({
                  variables: {
                    cursor: data.connections.pageInfo.endCursor,
                  },
                })
              }
            ></Button>
          )}
        </Box>
      )}
    </>
  )
}

export default Connections
