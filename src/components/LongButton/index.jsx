import React from 'react'
import './index.scss'

export default function index(props) {
    const {bg, children, func} = props;
    return (
        <button onClick={func} style={{backgroundColor: bg, color: '#222'}} className="long-button fs-2 d-block mx-auto my-auto">
            {children}
        </button>
    )
}