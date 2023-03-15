import AddDialog from './AddDialog'
//import styled from 'styled-components'
import { createSignal } from 'solid-js'
import Button, {GreyButton} from './Button'

/*const AddButton = styled(GreyButton)`
  margin-top: 1rem;
`*/

interface AddProps {
  onClick: () => void
  onClose: () => void
}

const AddButton = (props) => {
  return <GreyButton {...props}/>
}

function Add({ onClick, onClose }: AddProps) {
  const [dialogOpen, setOpen] = createSignal(false)
  const close = () => {
    setOpen(false)
    onClose()
  }
  return (
    <>
      <AddButton
        label="Add connection"
        plain
        alignSelf="center"
        onClick={() => {
          onClick()
          setOpen(true)
        }}
      />
      {dialogOpen() && <AddDialog onClose={close} initialCode="" />}
    </>
  )
}

export default Add
