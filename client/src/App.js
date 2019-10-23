import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import jwt_decoded from 'jwt-decode'
import setAuthToken from '../src/utils/setAuthToken'
import { connect } from 'react-redux'
import { setCurrentUser, logOutUser } from './store/actions/authAction'

import Navbar from './components/common/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Browser from './components/files/Browser'
import PrivateRoute from './components/validators/PrivateRoute'
import Details from './components/files/Details'
import AlertList from './components/common/AlertList'

const initialVerfication = (props) => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decoded(localStorage.jwtToken)
    props.setCurrentUser(decoded)
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      props.logOutUser()
      window.location.href = '/login'
    }
  }
}


function App(props) {

  useEffect(() => {
    initialVerfication(props)
  }, [props])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Switch>
          <PrivateRoute exact path="/" component={Browser} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/details/:id" component={Details} />
        </Switch>
        <AlertList />
      </div>
    </BrowserRouter >
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (jwtToken) => dispatch(setCurrentUser(jwtToken)),
    logOutUser: () => dispatch(logOutUser())
  }
}


export default connect(null, mapDispatchToProps)(App)