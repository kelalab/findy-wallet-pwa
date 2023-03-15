import { createSignal, Show } from 'solid-js'
import Box from './Box'
import Button from './Button'
import Anchor from './Anchor'
import TextInput from './TextInput'
import Text from './Text'
import config from '../config'

/*const Btn = styled(Button)`
  padding: 15px;
  width: 60%;
  text-align: center;
  background: ${colors.selected};
  color: ${colors.darkBtnText};
  box-shadow: 0px 8px 15px rgba(0, 110, 230, 0.2);
`*/

interface ICredentialDescriptor {
  id: string
  type: string
}

interface ICredential extends ICredentialDescriptor {
  rawId: ArrayBuffer
  response: {
    attestationObject?: ArrayBuffer
    clientDataJSON?: ArrayBuffer
    authenticatorData?: ArrayBuffer
    signature?: ArrayBuffer
    userHandle?: ArrayBuffer
  }
}

const doFetch = async (
  url: string,
  body: object | undefined = undefined
): Promise<any> => {
  return fetch(url, {
    credentials: 'include',
    ...(body
      ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      : {}),
  })
}

const bufferDecode = (value: string) => {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0))
}

// ArrayBuffer to URLBase64
const bufferEncode = (value: ArrayBuffer) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(value) as any))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

const Btn = (props) => {
  return <Button {...props} disabled={props.disabled} class="p-4 bg-selected text-darkBtnText">{props.children}</Button>
}

/*const ModeAnchor = styled(Anchor)`
  color: ${colors.selected};
`*/

const ModeAnchor = (props) => {
  console.log('ModeAnchor', props)
  return <Anchor {...props} class="text-selected"  >{props.children}</Anchor>
}

const [register, setRegister] = createSignal(false)


const WebauthnLogin = (props) => {
  const [waiting, setWaiting] = createSignal(false)
  const [email, setEmail] = createSignal('')
  const [operationResult, setOperationResult] = createSignal('')
  const userVerificationDiscouraged = 'discouraged'


  const toggleRegister = (registerValue: boolean) => {
    console.log('toggleRegister', registerValue, 'register', register(), 'operationResult', operationResult())
    setRegister(registerValue)
    setOperationResult('')
  }

  const doLogin = async () => {
    setOperationResult('')
    const setError = () => {
      setWaiting(false)
      setOperationResult(`Unable to login with this device for email ${email()}`)
      setEmail('')
    }

    setWaiting(true)
    const response = await doFetch(`${config.authUrl}/login/begin/${email()}`)
    if (response.status !== 200) {
      setError()
      return
    }
    const { publicKey } = await response.json()
    const credential: ICredential = (await navigator.credentials.get({
      publicKey: {
        ...publicKey,
        challenge: bufferDecode(publicKey.challenge),
        userVerification:
          publicKey.userVerification || userVerificationDiscouraged,
        allowCredentials: publicKey.allowCredentials.map(
          (item: ICredentialDescriptor) => ({
            ...item,
            id: bufferDecode(item.id),
          })
        ),
      },
    })) as ICredential
    const {
      id,
      type,
      rawId,
      response: { authenticatorData, clientDataJSON, signature, userHandle },
    } = credential
    setWaiting(true)
    const result = await doFetch(`${config.authUrl}/login/finish/${email()}`, {
      id,
      rawId: bufferEncode(rawId),
      type,
      response: {
        authenticatorData: bufferEncode(authenticatorData!),
        clientDataJSON: bufferEncode(clientDataJSON!),
        signature: bufferEncode(signature!),
        userHandle: bufferEncode(userHandle!),
      },
    })
    if (result.status !== 200) {
      setError()
      return
    } else {
      setWaiting(false)
      const token = await result.json()
      localStorage.setItem('token', token.token)
      window.location.reload()
    }
  }

  const doRegister = async () => {
    setOperationResult('')
    const setError = () => {
      setWaiting(false)
      setOperationResult(`Unable to register this device for email ${email()}`)
      setEmail('')
    }

    setWaiting(true)
    const response = await doFetch(`${config.authUrl}/register/begin/${email()}`)
    if (response.status !== 200) {
      setError()
      return
    }
    const { publicKey } = await response.json()
    const authenticatorSelection = publicKey.authenticatorSelection || {}
    const credential: ICredential = (await navigator.credentials.create({
      publicKey: {
        ...publicKey,
        challenge: bufferDecode(publicKey.challenge),
        authenticatorSelection: {
          ...authenticatorSelection,
          userVerification:
            authenticatorSelection.userVerification ||
            userVerificationDiscouraged,
        },
        user: {
          ...publicKey.user,
          id: bufferDecode(publicKey.user.id),
        },
        ...(publicKey.excludeCredentials
          ? {
              excludeCredentials: publicKey.excludeCredentials.map(
                (item: ICredentialDescriptor) => ({
                  ...item,
                  id: bufferDecode(item.id),
                })
              ),
            }
          : {}),
      },
    })) as ICredential
    const {
      id,
      type,
      rawId,
      response: { attestationObject, clientDataJSON },
    } = credential
    setWaiting(true)
    const result = await doFetch(`${config.authUrl}/register/finish/${email()}`, {
      id,
      rawId: bufferEncode(rawId),
      type,
      response: {
        attestationObject: bufferEncode(attestationObject!),
        clientDataJSON: bufferEncode(clientDataJSON!),
      },
    })
    if (result.status !== 200) {
      setError()
      return
    } else {
      setWaiting(false)
      setOperationResult(`Registration succeeded. You can now login.`)
      setRegister(false)
    }
  }

  const tryDoLogin = async () => {
    console.log('tryDoLogin')
    try {
      await doLogin()
    } catch {
      // Sometimes iOS safari fails with
      // "Unhandled Promise Rejection: NotAllowedError: This request has been cancelled by the user."
      setOperationResult("Login failed for unknown reason. Please retry.")
      setWaiting(false)
    }
  }

  const tryDoRegister = async () => {
    try {
      await doRegister()
    } catch {
      // Sometimes iOS safari fails with
      // "Unhandled Promise Rejection: NotAllowedError: This request has been cancelled by the user."
      setOperationResult("Register failed for unknown reason. Please retry.")
      setWaiting(false)
    }
  }

  const handleEmailInput = (e) => {
    console.log('handleEmailInput', e);
    setEmail(e.target.value)
  }

  return (
    <Box class="m-4" direction="column">
      <TextInput
        autoComplete="on"
        name="email"
        placeholder="email"
        maxLength={256}
        value={email()}
        onChange={handleEmailInput}
      />
      <Text>{register().toString()+ '    email:' +  email()}</Text>
      <span>{'    email:' +  email()}</span>
      <Text>{'Waiting ' + waiting().toString()}</Text>
      <Box direction="column" margin="12px 0 0 0" align="center">
        <Show fallback={<>
            <Btn
              disabled={email().length === 0 || waiting()}
              label="Login"
              onClick={() => tryDoLogin()}
            ></Btn>
            <Text size="small" margin="12px 0 0 0">
              New user?{' '}
              <Anchor
                class="text-selected"
                disabled={waiting()}
                onClick={() => toggleRegister(true)}
              >
                Register
              </Anchor>
            </Text>
          </>} 
            when={register()}>
          <>
            <Btn
              disabled={email().length === 0 || waiting()}
              label="Register"
              onClick={() => tryDoRegister()}
            ></Btn>
            <Text size="small" margin="12px 0 0 0">
              Existing user?{' '}
              <Anchor
                class="text-selected"
                disabled={waiting()}
                onClick={() => toggleRegister(false)}
              >
                Login
              </Anchor>
            </Text>
          </>
          </Show>
      </Box>
    </Box>
  )
}

export default WebauthnLogin
