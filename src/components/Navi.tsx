import styled from 'styled-components'
import { Menu as MenuIco } from 'grommet-icons'
//mport { Link, NavLink } from 'react-router-dom'
import { Link, NavLink } from '@solidjs/router'
//import { useQuery, gql } from '@apollo/client'
import { createQuery, gql } from '@merged/solid-apollo'
import { createSignal, JSXElement, useContext } from 'solid-js'
import { useLocation } from '@solidjs/router'

import EventNotifications from './EventNotifications'

//import {
//  Box,
//  Header as Head,
//  Image,
//bar as GrommetSidebar,
//  Nav,
 // BoxProps,
//  Collapsible,
//} from 'grommet'

import Anchor from './Anchor';
import Box from './Box';
import Button, { GreyButton } from './Button';
import Head from './Header';
import Image from './Image';
import Nav from './Nav';
import Collapsible from './Collapsible';
import GrommetSidebar from './Sidebar'

import Add from './Add'
import Connections from './Connections'
import Smoke from './Smoke'
import { colors, device } from '../theme'
import { UserContext, username } from './Login'

/*const MenuIcon = styled(MenuIco)`
  vertical-align: middle;
  font-size: 24px;
  color: ${colors.icon};
`*/

const MenuIcon = (props) => {
  return <div>Menuicon</div>
}

/*const BrandBox = styled(Box)`
  width: 154px;
  height: 57.31px;
  padding: 1rem 2rem;
`*/

const BrandBox = (props) => {
  return <Box {...props} class={props.class + ` h-14 w-36 py-4 px-8`} />
}

/*const MenuBox = styled(Box)`
  margin-left: auto;
`*/

const MenuBox = (props) => {
  return <Box class="ml-auto" {...props} >{props.children}</Box>
}

/*const MenuButton = styled(Button)`
  display: inline-block;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  margin-left: auto;
  padding: 0.25rem 0.75rem;
  line-height: 1;
  border-radius: 0.2rem;
  box-shadow: ${colors.shadow};
  @media ${device.tablet} {
    display: none;
  }
`*/

const MenuButton = (props) => {
  return <Button {...props}/>
}

/*const Sidebar = styled(GrommetSidebar)`
  padding: 0px;
  display: none;
  @media ${device.tablet} {
    overflow: scroll;
    display: block;
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
`*/

const Sidebar = (props) => {
  return <GrommetSidebar {...props}/>
}
/* const GreyButton = styled(Button)`
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 40px;
  color: ${colors.darkBtnText};
  background-color: ${colors.darkBtnBackground};
  padding: 0.5rem 3rem 0.5rem 3rem;
  text-align: center;
  min-width: 205px;
`*/

interface DropBoxProps {
  showDialog: boolean
}

/*const DropBox = styled(Box)<DropBoxProps>`
  position: absolute;
  z-index: ${(props) => (props.showDialog ? 0 : 100)};
  display: inline-block;
  width: 100%;
  min-height: 100%;
  background: ${colors.brand};
  @media ${device.tablet} {
    position: fixed;
    display: none;
    height: 100%;
  }
`*/
const DropBox = (props:DropBoxProps) => {
  return <Box {...props}/>
}

/*const ConnectionBox = styled(Box)`
  margin: 0.5rem 0rem 0.5rem;
`*/

const ConnectionBox = (props) => {
  return <Box {...props} />
}

/*const OptionsBox = styled(Box)`
  margin-left: auto;

  .menu-item {
    text-decoration: none;
    display: inline-block;
    padding: 1rem;
    margin-right: 1rem;
    span {
      color: ${colors.background};
      &:hover {
        text-decoration: none;
      }
    }
  }
  @media ${device.tablet} {
    .menu-item {
      padding: 0.2rem 1.2rem;
      margin: 0rem 0.4rem;
      span {
        color: ${colors.brand};
        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .active {
    span {
      color: ${colors.active};
    }
  }
  @media ${device.tablet} {
    .active {
      span {
        color: ${colors.selected};
      }
    }
  }
`*/

const OptionsBox = (props) => {
  return <Box gap="large" {...props}/>
}

/*const WideOption = styled(Box)`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`*/

const WideOption = (props) => {
  return <Box class="md:block">{props.children}</Box>
}

/*const Content = styled(Box)`
  position: flex;
  width: 100%;
  height: 100%;
  padding: 0 0.8rem;
`*/

const Content = (props) => {
  return <Box {...props}/>
}

/*const Header = styled(Head)`
  box-shadow: 0 0.125rem 0.25rem ${colors.shadow};
  text-decoration: none;
  position: sticky;
  top: 0;
  background: ${colors.background};
  padding: 0.5rem 0rem;
`*/

const Header = (props) => {
  return <Head class="sticky top-0 shadow" {...props}/>
}

/*const Invite = styled(Link)`
  align-self: center;
  min-width: 205px;
`*/

const Invite = (props) => {
  return <NavLink {...props}/>
}

/*const Username = styled(Box)`
  display: inline-block;
  color: ${colors.selected};
  padding: 1rem;
  margin-right: 1rem;
  @media ${device.tablet} {
    color: ${colors.darkBtnText};
    padding: 0.2rem 1.2rem;
    margin: 0rem 0.4rem;
  }
`*/
const Username = (props) => {
  const {round} = props;
  let rnd;
  switch(round){
    case 'large':
      rnd = 'xl';
  }
  return <Box {...props} class={`mr-4 md:my-0 md:mx-1 p-2 md:py-1 ${rnd? 'rounded-'+rnd : ''}${props.class}`} >{props.children}</Box>
}
/*const ConnectionName = styled(Box)`
  font-size: 14px;
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`*/
const ConnectionName = (props) => {
  return <Box class="connectionname" {...props}>{props.children}</Box>
}

interface IProps {
  children: JSXElement
}

export const GET_ACTIVE_CONNECTION = gql`
  query getActiveConnection {
    activeConnectionName @client
  }
`

function Navi(props: IProps) {
  const [state, {setUserName}]  = useContext(UserContext)
  console.log('Navi username', state.username);
  const [menuOpen, setMenuOpen] = createSignal(false)
  const [showDialog, setShowDialog] = createSignal(false)
  let location = useLocation()
  const connectionNav = (direction = 'row') => (
    <Nav animation="fadeIn" gap="small" align="start" direction={direction}>
      <Add
        onClick={() => setShowDialog(true)}
        onClose={() => setShowDialog(false)}
      ></Add>
      <Invite href="/me">
        <GreyButton
          label="New invitation"
          plain
          onClick={() => setMenuOpen(false)}
        />
      </Invite>
      <ConnectionBox>
        <Connections hideMenu={setMenuOpen}></Connections>
      </ConnectionBox>
    </Nav>
  )

  const Options = (props:any) => {
    const direction = props.direction || 'row'
    return (<OptionsBox direction={direction}>
      <NavLink
        href="/credentials"
        onClick={() => {
          setMenuOpen(false)
        }}
        className={({ isActive }) =>
          isActive ? 'menu-item active' : 'menu-item'
        }
      >
        <Anchor as="span" id="wallet-link">
          Wallet
        </Anchor>
      </NavLink>
      <NavLink
        href="/logout"
        className={({ isActive }) =>
          isActive ? 'menu-item active' : 'menu-item'
        }
        onClick={() => {
          localStorage.clear()
          window.location.reload()
        }}
      >
        <Anchor as="span">Logout</Anchor>
      </NavLink>
      <Username class="bg-brand rounded-xl text-white">
        {username()}
      </Username>
    </OptionsBox>)
  }

  //const { data: activeConnection } = useQuery(GET_ACTIVE_CONNECTION)
  const activeConnection = createQuery(GET_ACTIVE_CONNECTION);
  return (
    <>
      <Header justify="start">
        <Link href="/connections">
          <BrandBox
            onClick={() => {
              setMenuOpen(false)
            }}
          >
            <Image fit="contain" src="/img/logo.svg" />
          </BrandBox>
        </Link>
        {location.pathname.startsWith('/connections') && 
          <ConnectionName>
            {activeConnection()?.activeConnectionName}
          </ConnectionName>
        }
        <MenuBox>
          <MenuButton
            icon={<MenuIcon />}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </MenuBox>
        <WideOption><Options/></WideOption>
      </Header>
      {showDialog() && <Smoke />}
      {/*<Collapsible open={menuOpen()}>
        <DropBox
          showDialog={showDialog()}
          animation={{ type: 'slideDown', duration: 800, size: 'xlarge' }}
        >
          {options('column')}
          {connectionNav('column')}
        </DropBox>
      </Collapsible>*/}
      <Box direction="row" fill overflow="hidden">
        {/*<EventNotifications closeMenu={() => setMenuOpen(false)} />*/}
        <Sidebar background="brand">{connectionNav('column')}</Sidebar>
        <Content pad="medium">{props.children}</Content>
      </Box>
    </>
  )
}

export default Navi
