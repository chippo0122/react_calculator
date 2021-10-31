import React, {useState, useEffect} from 'react'
import Output from '../Output'
import Button from '../Button'
import LongButton from '../LongButton'
import './index.scss'

export default function Panel() {
    const [bg, setBg] = useState({
        red: '#c23616',
        white: '#f5f6fa',
        gray: '#718093'
    });

    //view
    const [isUpdate, setIsUpdate] = useState(false);
    //control store
    const [point, setPoint] = useState('none');
    const [store, setStore] = useState('0');
    //control calculate
    const [queue, setQueue] = useState([]);

    //effects
    useEffect(()=>{
        const leng = queue.length;

        if(leng === 2 && queue[leng - 1] === '=') {
            setIsUpdate(true);
        }

        if(leng > 3) {
            const num1 = queue[0],
                  num2 = queue[2],
                  sign = queue[1];
            const sum = cal(num1, num2, sign);
            setQueue([...[sum], queue[3]]);
            setIsUpdate(false);
        }

        // console.log(queue);

    }, [queue]);

    const cal = (num1, num2, sign) => {
        switch(sign) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return num1;
        }
    }

    const psuhQueue = (sign) => {
        return () => {
            setQueue([...queue, Number(store), sign]);
            setPoint('none');
            setStore('0');
        }
    }
    
    const updateStore = (num) => {
        return () => {
            if(queue[1] === '=' && num !== 'AC') return;

            setIsUpdate(false);
            switch(num) {
                case 'AC':
                    setStore('0');
                    setQueue([]);
                    setPoint('none');
                    return;
                case '%':
                    const newItem = Number(store)/100;
                    setStore(newItem.toString());
                    return;
                case '+/-':
                    const positive = Number(store) > 0;
                    const zero = Number(store) === 0;

                    if(zero) return;

                    if(positive) {
                        const newItem = 0 - Number(store)
                        setStore(newItem.toString());
                    } else {
                        const newItem = Math.abs(Number(store));
                        setStore(newItem.toString());
                    };
                    return;
                case '.':
                    if(point === 'none') {
                        setPoint('have');
                    }
                    return;
                default:     
                    if(store === '0') {
                        if(point === 'have') {
                            setStore(`0.${num}`);
                            setPoint('finish');
                        } else {
                            setStore(num);
                        }
                    } else {
                        if(point === 'have') {
                            setStore(`${store}.${num}`);
                            setPoint('finish');
                        } else {
                            setStore(`${store}${num}`);
                        }
                    }
            }
        }
    }

    return (
        <div className="panel mx-auto p-3">
            <Output isUpdate={isUpdate} currentSum={queue[0]} store={store} />
            <div className="buttons-area pt-3">
                <div className="row g-0">
                    {/* Numbers & Others */}
                    <div className="col-9">
                        {/* AC , positive/negative, percent */}
                        <div className="row g-0 pt-3">
                            <div className="col"><Button func={updateStore('AC')} bg={bg.gray}>AC</Button></div>
                            <div className="col"><Button func={updateStore('+/-')} bg={bg.gray}>+/-</Button></div>
                            <div className="col"><Button func={updateStore('%')} bg={bg.gray}>%</Button></div>
                        </div>
                        {/* Numbers */}
                        <div className="row g-0 pt-3">
                            <div className="col"><Button func={updateStore('7')}  bg={bg.white}>7</Button></div>
                            <div className="col"><Button func={updateStore('8')}  bg={bg.white}>8</Button></div>
                            <div className="col"><Button func={updateStore('9')}  bg={bg.white}>9</Button></div>
                        </div>
                        <div className="row g-0 pt-3">
                            <div className="col"><Button func={updateStore('4')} bg={bg.white}>4</Button></div>
                            <div className="col"><Button func={updateStore('5')} bg={bg.white}>5</Button></div>
                            <div className="col"><Button func={updateStore('6')} bg={bg.white}>6</Button></div>
                        </div>
                        <div className="row g-0 pt-3">
                            <div className="col"><Button func={updateStore('1')} bg={bg.white}>1</Button></div>
                            <div className="col"><Button func={updateStore('2')} bg={bg.white}>2</Button></div>
                            <div className="col"><Button func={updateStore('3')} bg={bg.white}>3</Button></div>
                        </div>
                        <div className="row g-0 pt-3">
                            <div className="col-8"><LongButton func={updateStore('0')} bg={bg.white}>0</LongButton></div>
                            <div className="col-4"><Button func={updateStore('.')} bg={bg.white}>.</Button></div>
                        </div>
                    </div>
                    {/* Control section */}
                    <div className="col-3">
                        <div className="row flex-column">
                            <div className="col pt-3"><Button func={psuhQueue('/')} bg={bg.red}>÷</Button></div>
                            <div className="col pt-3"><Button func={psuhQueue('*')} bg={bg.red}>×</Button></div>
                            <div className="col pt-3"><Button func={psuhQueue('-')} bg={bg.red}>-</Button></div>
                            <div className="col pt-3"><Button func={psuhQueue('+')} bg={bg.red}>+</Button></div>
                            <div className="col pt-3"><Button func={psuhQueue('=')} bg={bg.red}>=</Button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
