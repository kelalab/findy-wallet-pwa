import { JSXElement, onMount } from 'solid-js'

/*const Layer = styled(Lay)`
  background: ${colors.background};
  padding: 9px;
  z-index: 1020;
  width: 90%;
  @media ${device.tablet} {
    width: 30%;
  }
`*/

const Layer = (props) => {
  return <div {...props} />
}

interface IProps {
  children: JSXElement
  modal?: boolean
  position: any
  duration: number
  plain: boolean
  onClose: () => void
  onEsc: () => void
}

function Dialog({
  children,
  duration,
  modal,
  position,
  onClose,
  ...rest
}: IProps) {
  onMount(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose()
      }, duration * 1000)
      return () => clearTimeout(timer)
    }
  })
  return (
      <Layer
        position={position || 'top'}
        modal={modal}
        margin="none"
        responsive={false}
        onClickOutside={onClose}
        {...rest}
      >
        {children}
      </Layer>
  )
}

export default Dialog
