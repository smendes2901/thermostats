import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import LineChart from '../graph/LineChart_zoom'
import './Details.css'

const { Content } = Layout

const Details = props => {
    return (
        <div>
            <Content>
                <div className="chart-boundaries">
                    <LineChart fileName={props.match.params.id} />
                </div>
            </Content>
        </div>
    )
}

export default withRouter(Details)
