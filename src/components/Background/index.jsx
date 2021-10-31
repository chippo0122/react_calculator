import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

const buildBoxList = (total, width, height) => {
    const bg = ['#c23616', '#f5f6fa', '#718093'];
    let list = [];
    for(let i = 0; i < total; i ++) {
        const data = {
            color: bg[Math.floor(Math.random() * 3)],
            scale: Math.floor(Math.random() * 3),
            posX: Math.floor(Math.random() * width),
            posY: Math.floor(Math.random() * height)
        }
        list.push(data);
    }

    return list;
}

export default function Background() {

    const wraper = useRef();
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        //initialize boxes
        const { clientHeight, clientWidth } = wraper.current;
        const total = clientWidth < 768 ? (clientWidth < 450 ? 10 : 20) : 30;
        const boxList = buildBoxList(total, clientWidth, clientHeight);
        setBoxes(boxList);
    }, [])


    return (
        <div ref={wraper} className="background">
            {
                boxes.map(el => {
                    return (
                        <div style={{backgroundColor: el.color, transform: `scale(${el.scale})`, left: el.posX, top: el.posY}} className="box"></div>
                    )
                })
            }
        </div>
    )
}
