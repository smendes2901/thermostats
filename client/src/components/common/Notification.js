import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { notification } from 'antd';
import { clearNotification } from '../../store/actions/notifAction';

const Notification = props => {

    const [alert, setAlert] = useState({
        message: null,
        status: null
    })

    const clear = () => {
        setAlert({
            message: null,
            status: null
        })
        props.clearNotification()
    }

    const openNotificationWithIcon = type => {
        notification[type]({
            message: type.toUpperCase(),
            description: alert.message,
            onClose: clear,
            duration: 2
        });
    };

    //Update alert
    useEffect(() => {
        setAlert({
            message: props.message,
            status: props.status
        })
    }, [props])

    //Display notification once alert is updated
    useEffect(() => {
        if (alert.message) {
            if (alert.status === 200) {
                openNotificationWithIcon('success')
            } else {
                openNotificationWithIcon('error')
            }
        }
        // eslint-disable-next-line
    }, [alert])

    return (
        <div></div>
    )
}

const mapStateToProps = state => {
    return {
        message: state.notification.message,
        status: state.notification.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearNotification: () => dispatch(clearNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
