import React, { useState, useEffect } from 'react'
import '../../../node_modules/react-vis/dist/style.css'
import {
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines,
	XYPlot,
	Highlight,
	MarkSeries,
	Hint,
} from 'react-vis'
import axios from 'axios'
import { Button, Spin } from 'antd'
import { connect } from 'react-redux'
import { setNotification } from '../../store/actions/notifAction'
import './LineChart_zoom.css'

const LineChart_zoom = props => {
	const [value, setValue] = useState(null)
	const [state, setState] = useState([])
	const { setNotification, fileName } = props
	useEffect(() => {
		axios
			.post('/api/readings', { name: fileName })
			.then(rec => {
				setState(rec.data)
			})
			.catch(err => {
				setNotification(err.response)
			})
	}, [fileName, setNotification])

	const _rememberValue = value => {
		setValue(value)
	}

	const _forgetValue = () => {
		setValue(null)
	}

	const uploadFile = fileName => {
		axios
			.post('/api/readings/upload', { name: fileName })
			.then(res => {
				setNotification(res)
			})
			.catch(err => {
				setNotification(err.response)
			})
	}
	const [lastDrawLocation, setLastDrawLocation] = useState(null)
	return (
		<div>
			{state.length > 1 ? (
				<div>
					<XYPlot
						style={{ overflow: 'hidden' }}
						animation
						xType="time"
						xDomain={
							lastDrawLocation && [
								lastDrawLocation.left,
								lastDrawLocation.right,
							]
						}
						yDomain={
							lastDrawLocation && [
								lastDrawLocation.bottom,
								lastDrawLocation.top,
							]
						}
						width={1200}
						height={300}
					>
						<HorizontalGridLines />
						<VerticalGridLines />
						<YAxis />
						<XAxis />
						<MarkSeries
							onValueMouseOver={e => _rememberValue(e)}
							onValueMouseOut={() => _forgetValue()}
							data={state}
						/>

						<Highlight
							onBrushEnd={area => setLastDrawLocation(area)}
							onDrag={area => {
								setLastDrawLocation({
									bottom: lastDrawLocation.bottom + (area.top - area.bottom),
									left: lastDrawLocation.left - (area.right - area.left),
									right: lastDrawLocation.right - (area.right - area.left),
									top: lastDrawLocation.top + (area.top - area.bottom),
								})
							}}
						/>
						{value ? <Hint value={value} /> : null}
					</XYPlot>
				</div>
			) : (
				<div className="spin-space">
					<Spin size="large" className="spin-position" />
				</div>
			)}
			<Button
				type="primary"
				style={{ float: 'left', margin: '10px' }}
				onClick={() => setLastDrawLocation(null)}
			>
				Reset Zoom
			</Button>
			<Button
				type="default"
				icon="cloud-upload"
				style={{ float: 'left', margin: '10px' }}
				onClick={() => uploadFile(props.fileName)}
			>
				Upload
			</Button>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		setNotification: payload => dispatch(setNotification(payload)),
	}
}

export default connect(
	null,
	mapDispatchToProps
)(LineChart_zoom)
