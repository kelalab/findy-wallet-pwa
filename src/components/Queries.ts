import { gql } from '@apollo/client'

import { pageInfo, proof, message, job } from './Fragments'

export const PROOFS_QUERY = gql`
query GetConnectionProofs($id: ID!, $cursor: String) {
  connection(id: $id) {
    proofs(first: 3, after: $cursor) {
      edges {
        ...ProofEdgeFragment
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
}
${proof.edge}
${pageInfo}
`

export const MESSAGES_QUERY = gql`
  query GetMessages($id: ID!, $cursor: String) {
    connection(id: $id) {
      messages(first: 3, after: $cursor) {
        edges {
          ...MessageEdgeFragment
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
  ${message.edge}
  ${pageInfo}
`
export const JOBS_QUERY = gql`
  query GetJobs($cursor: String) {
    jobs(first: 2, after: $cursor) {
      edges {
        ...JobEdgeFragment
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  ${job.edge}
  ${pageInfo}
`

export const CONNECTION_JOBS_QUERY = gql`
  query GetConnectionJobs($id: ID!, $cursor: String) {
    connection(id: $id) {
      jobs(first: 3, after: $cursor) {
        edges {
          ...JobEdgeFragment
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
  ${job.edge}
  ${pageInfo}
`
