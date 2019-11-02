import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Login.css'
import { Form, Icon, Input, Button, Layout } from 'antd'
import { registerUser } from '../../store/actions/authAction'
import { connect } from 'react-redux'
import Logo from './Logo'

const { Content } = Layout

const Register = props => {
	useEffect(() => {
		if (props.isAuthenticated) {
			props.history.push('/')
		}
	}, [props])

	const handleSubmit = e => {
		e.preventDefault()
		props.form.validateFields((err, newUser) => {
			if (!err) {
				props.registerUser(newUser, props.history)
			}
		})
	}
	const { getFieldDecorator } = props.form
	return (
		<Content>
			<div className="logo">
				<Logo />
			</div>
			<div className="login-layout">
				<Form onSubmit={handleSubmit} className="register-form">
					<Form.Item>
						{getFieldDecorator('name', {
							rules: [
								{
									required: true,
									message: 'Please input your Name!',
								},
							],
						})(
							<Input
								prefix={
									<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								placeholder="Name"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('email', {
							rules: [
								{
									required: true,
									message: 'Please input your email!',
								},
							],
						})(
							<Input
								prefix={
									<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								placeholder="Email"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: 'Please input your password!',
								},
							],
						})(
							<Input
								prefix={
									<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								type="password"
								placeholder="Password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password2', {
							rules: [
								{
									required: true,
									message: 'Please confirm your Password!',
								},
							],
						})(
							<Input
								prefix={
									<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								type="password"
								placeholder="Confirm Password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						<div>
							<Button
								type="primary"
								htmlType="submit"
								className="register-form-button"
							>
								Register
							</Button>
						</div>
						Already have an account?{' '}
						<Link className="nav-link" to="/login">
							Log In
						</Link>
					</Form.Item>
				</Form>
			</div>
		</Content>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (newUser, history) =>
			dispatch(registerUser(newUser, history)),
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Form.create()(Register))
)
