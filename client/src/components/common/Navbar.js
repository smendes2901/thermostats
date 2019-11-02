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
			{props.isAuthenticated ? (
				<Menu mode="horizontal">
					<Menu.Item key="title">
						<Link to="/">
							<img
								src={logo}
								style={{ width: '35px', height: '30px' }}
								alt="logo"
							/>
							<Text strong>THERMOSTAT</Text>
						</Link>
					</Menu.Item>
					<Text>Welcome, {props.user.name}</Text>
					<Menu.Item key="logout" style={{ float: 'right' }} onClick={onLogOut}>
						<Icon type="logout" />
						Logout
					</Menu.Item>
				</Menu>
			) : null}

			<Notification />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logOutUser: () => dispatch(logOutUser()),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Navbar)
)
