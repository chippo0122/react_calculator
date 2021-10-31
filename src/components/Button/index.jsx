import React from 'react'
import './index.scss'

export default function index(props) {
    const {children, bg, func} = props;

    return (
        <button onClick={func} style={{backgroundColor: bg, color: bg === '#f5f6fa' ? '#222' : '#f5f6fa'}} className="button fs-2 d-block mx-auto my-auto">
            {children}
        </button>
    )
}
