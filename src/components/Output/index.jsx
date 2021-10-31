import React, {useEffect, useRef} from 'react'
import './index.scss'

export default function Output(props) {
    const output = useRef();
    const {currentSum, store, isUpdate} = props;

    useEffect(() => {
        output.current.classList.add('move');
        setTimeout(() => {
            output.current.classList.remove('move');
        }, 100);
        console.log('call');
    }, [currentSum, store])

    return (
        <div ref={output} style={{wordWrap:'break-word'}} className="output px-2 display-1 text-end text-light">
            {
                isUpdate ? 
                currentSum :
                store
            }
        </div>
    )
}
