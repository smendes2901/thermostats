import React from 'react'
import { Typography } from 'antd'
import logo from '../common/thermometer.jpg'


const Logo = () => {
    return (
        <div>
            <img src={logo} style={{ "width": "50px", "height": "50px" }} alt="logo" />
            <div><Typography.Title>THERMOSTAT</Typography.Title></div>
        </div>
    )
}

export default Logo
