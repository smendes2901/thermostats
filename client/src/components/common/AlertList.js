import React, { useState, useEffect } from 'react'
import { Button, Icon, Badge, Popover, Alert } from 'antd'
import './AlertButton.css'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client'
import { ENDPOINT } from '../../config'
import axios from 'axios'
import * as _ from 'underscore'

const AlertList = (props) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (props.isAuthenticated) {
            axios.get("/api/alerts").then(messages => {
                setMessages(messages.data.reverse())
            }).catch(err => {
                console.log(err.response)
            })
            const socket = socketIOClient(ENDPOINT)
            socket.on("test", data => {
                setMessages(messages => [data.msg, ...messages])
            })
        }
    }, [props])

    const handleVisibleChange = visible => {
        if (messages.length === 0) return null
        if (visible === false) {
            const idArray = []
            messages.forEach(message => {
                idArray.push(message._id)
            })
            axios.post("/api/alerts/update",
                {
                    replace: { read: true },
                    idArray: idArray
                }).then(() => {
                    setMessages([])
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }

    return (props.isAuthenticated ? (
        <Popover
            className="popover"
            content={
                messages.map(c => {
                    return (<Alert key={c._id} message={c.message} type={c.status} banner showIcon />)
                })
            }
            onVisibleChange={_.debounce(handleVisibleChange, 500)}
            title={<span>Messages</span>}
        >
            <Badge count={messages.length} className="alert-badge">
                <Button className="alert-button" type="primary" shape="circle" size="large" >
                    <Icon className="alert-icon" type="bell" />
                </Button>
            </Badge>
        </Popover>

    ) : (null)

    )
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(AlertList)
