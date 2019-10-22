import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon, Typography } from 'antd'
import Notification from './Notification'
import { logOutUser } from '../../store/actions/authAction'
import logo from './thermometer.jpg'
import './Navbar.css'

const { Text } = Typography
const Navbar = props => {

    const onLogOut = () => {
        props.logOutUser()
        props.history.push('/login')
    }
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="title">
                    <Link to='/'>
                        <img src={logo} style={{ "width": "35px", "height": "30px" }} alt="logo" />
                        <Text strong>
                            THERMOSTATS
                        </Text>
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout" style={{ float: 'right' }} onClick={onLogOut}>
                    <Icon type="logout" />
                    Logout
                    </Menu.Item>
            </Menu>
            <Notification />

        </div >
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOutUser: () => dispatch(logOutUser())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
