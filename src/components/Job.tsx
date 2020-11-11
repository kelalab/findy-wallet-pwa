import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Box, Heading } from 'grommet'

import { useQuery, gql } from '@apollo/client'
import Waiting from './Waiting'

Job.fragments = {
  data: gql`
    fragment JobNodeFragment on JobEdge {
      node {
        id
        protocol
        protocolId
        initiatedByUs
        connection {
          id
        }
        status
        result
        createdMs
        updatedMs
      }
      cursor
    }
  `,
}

export const JOB_QUERY = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      ...JobNodeFragment
    }
  }
  ${Job.fragments.data}
`

type TParams = { id: string }

function Job({ match }: RouteComponentProps<TParams>) {
  const { loading, error, data } = useQuery(JOB_QUERY, {
    variables: {
      id: match.params.id,
    },
  })
  const node = data?.job.node
  return (
    <>
      {loading || error ? (
        <Waiting loading={loading} error={error} />
      ) : (
        <>
          <Heading level={2}>Job {node.id}</Heading>
          <Box></Box>
        </>
      )}
    </>
  )
}

export default Job
