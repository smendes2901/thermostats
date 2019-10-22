import React, { useEffect } from 'react'
import { Form, Icon, Input, Button, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import "./Login.css"
import { loginUser } from '../../store/actions/authAction'


const { Content } = Layout
const Login = props => {
    useEffect(() => {
        if (props.isAuthenticated) {
            props.history.push('/')
        }
    }, [props])
    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields((err, loginDetails) => {
            if (!err) {
                props.loginUser(loginDetails)
            }
        })
    }
    const { getFieldDecorator } = props.form
    return (
        <Content>
            <div className="login-layout">
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email" />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </div>
                        Or <Link className="nav-link" to="/register">
                            Register now
                            </Link>
                    </Form.Item>
                </Form>

            </div>
        </Content>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (loginDetails) => dispatch(loginUser(loginDetails))
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))