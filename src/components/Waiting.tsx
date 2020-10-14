import React from 'react'
import { ApolloError } from '@apollo/client'
import { Box, Header, Text } from 'grommet'

interface IProps {
  error?: ApolloError
  loading: boolean
}

function Waiting({ loading, error }: IProps) {
  if (loading) {
    return <Text></Text>
  }
  const text = loading ? '' : 'API Error'
  return (
    <>
      <Header pad="small" background="brand" justify="start"></Header>
      <Box direction="row" fill>
        <Box pad="medium">
          <Text>{text}</Text>
        </Box>
      </Box>
    </>
  )
}

export default Waiting
