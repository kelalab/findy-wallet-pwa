import Box from './Box';
import Text from './Text';
import Header from './Header';

interface IProps {
  error?: any
  loading: boolean
}

function Waiting(props: IProps) {
  console.log('Waiting', props);
  const {loading, error} = props;
  if (loading) {
    return <Text>Loading...</Text>
  }
  const text = loading ? '' : ''
  console.log('Errors: ' + error?.message)
  return (
    <>
      <Header pad="small" background="" justify="start"></Header>
      <Box direction="row" fill>
        <Box pad="medium">
          <Text>{text}</Text>
        </Box>
      </Box>
    </>
  )
}

export default Waiting
