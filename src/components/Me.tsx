import { createSignal, onMount } from 'solid-js'
import Box from './Box';
import Button from './Button';
import TextArea from './TextArea';
import { RotateRight } from 'grommet-icons'
import { createMutation, gql } from '@merged/solid-apollo';
import { FaSolidArrowRotateRight } from 'solid-icons/fa';
const invitationFragment = gql`
  fragment InvitationFragment on InvitationResponse {
    id
    endpoint
    label
    raw
    imageB64
  }
`

const INVITATION_MUTATION = gql`
  mutation Invitation {
    invite {
      ...InvitationFragment
    }
  }
  ${invitationFragment}
`

/*const RawInvitation = styled(TextArea)`
  font-weight: 400;
  min-height: 256px;
`*/

const RawInvitation = (props) => {
  return <TextArea {...props} />
}

/*const Invitation = styled(Box)`
  margin: 0 auto;
  flex-direction: column;
  max-width: 256px;
  justify-content: center;
  @media ${device.tablet} {
    flex-direction: row;
    max-width: none;
    margin: 0;
  }
`*/

const Invitation = (props) => {
  return <Box {...props} />
}



/*const CenterContainer = styled.div`
  display: flex;
  justify-items: center;
  flex-direction: column;
`*/

const CenterContainer = (props) => {
  return <div class="flex items-center flex-col" {...props}/>
}


function Me() {
  const initialCopy = 'Copy to clipboard'
  const [copyBtn, setCopyBtn] = createSignal(initialCopy)
  const [copyUrlBtn, setCopyUrlBtn] = createSignal(initialCopy)
  const [mutate, data] = createMutation(INVITATION_MUTATION)
  /*const [doInvite, { data }] = useMutation(INVITATION_MUTATION, {
    onCompleted: () => {
      setCopyBtn(initialCopy)
      setCopyUrlBtn(initialCopy)
    },
  })
  if (data == null) {
    doInvite()
  }*/

  onMount(() => {
    mutate()
  })

  const copyToClipBoard = async (copiedText: string) => {
    try {
      await navigator.clipboard.writeText(copiedText)
      setCopyBtn('Copied')
    } catch (err) {
      console.log(err)
    }
  }

  const copyUrlToClipBoard = async (copiedText: string) => {
    try {
      await navigator.clipboard.writeText(copiedText)
      setCopyUrlBtn('Copied')
    } catch (err) {
      console.log(err)
    }
  }

  const webWalletURL = (data) => data && data.invite ? `${window.location.origin}/connect/${btoa(data.invite.raw)}` : ""

  return (
    <div class="flex flex-col items-center">
      <Button
        class="mt-8 mb-1 border-2 p-4"
        icon={<FaSolidArrowRotateRight />}
        label="Regenerate"
        alignSelf="center"
        onClick={() => mutate()}
      ></Button>
      {data && (
        <CenterContainer>
          <hr class="mx-3"/>
          <Invitation
            margin="large"
            animation={{
              type: 'fadeIn',
              delay: 0,
              duration: 2000,
              size: 'large',
            }}
          >
            {data()?.invite?.imageB64 &&
            <img
              alt="invitation QR code"
              src={`data:image/png;base64,${data()?.invite?.imageB64}`}
            />}
            <RawInvitation
              readOnly
              resize={false}
              fill
              value={data().invite.raw}
            />
          </Invitation>
          <Button
            label={copyBtn()}
            onClick={() => copyToClipBoard(data().invite.raw)}
          ></Button>
          <hr />
          <Box>
            <a href={webWalletURL}>Web Wallet URL</a>
          </Box>
          <Button
              label={copyUrlBtn()}
              onClick={() => copyUrlToClipBoard(webWalletURL(data()))}
            ></Button>
        </CenterContainer>
      )}
    </div>
  )
}

Me.fragment = invitationFragment

export default Me
