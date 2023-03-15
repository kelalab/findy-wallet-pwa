//import { Route, Routes, Navigate } from 'react-router-dom'
import { Route, Routes, Navigate } from '@solidjs/router'
//import { Box, Grommet } from 'grommet'
import Box from './components/Box'
import Navi from './components/Navi'
import Home from './components/Home'
import Connection from './components/Connection'
//import Credentials from './components/Credentials'
import Login from './components/Login'
//import URLConnect from './components/URLConnect'
import Me from './components/Me'
//import { findyTheme } from './theme'
import WebauthnLogin from './components/WebauthnLogin2'
function App() {
  return (
    <Box fill={true}>
      <Login>
        <Navi>
          <Routes>
            <Route path="/" element={<Navigate href="/connections" />} />
            <Route path="/connections" element={<Home />} />
            <Route path="/connections/:id" element={<Connection />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/connect/:invitation" element={<URLConnect />} />
            <Route path="/me" element={<Me />} />
          </Routes>
        </Navi>
      </Login>
    </Box>
  )
}

export default App
