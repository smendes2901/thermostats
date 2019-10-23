import React, { useState, useEffect } from 'react'
import { List, Typography, Input } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Browser.css'

const Browser = () => {
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        axios.get('/api/readings')
            .then(res => {
                setItems(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    let filteredItems = items.filter(item => {
        return item.toLowerCase().indexOf(search) !== -1
    })
    return (

        <div>
            <div>
                <Input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value.toLowerCase())} />
            </div>
            <div className="file-list">
                <List
                    bordered
                    dataSource={filteredItems}
                    renderItem={item => (
                        <Link to={`details/${item}`}>
                            <List.Item>
                                <Typography.Text mark>{item.split('.')[1].toUpperCase()}</Typography.Text> {item}
                            </List.Item>
                        </Link>
                    )}
                />
            </div>
        </div>
    )
}

export default Browser
