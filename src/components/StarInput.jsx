import React, { useEffect, useState } from 'react'
import '../styles/star-input.css'

const StarInput = ({ 
    value = 0, 
    editable = true, 
    size = 16, 
    style = {}, 
    color = '#ffc107', 
    onChange = () => {}, 
    className 
}) => {

    const [rating, setRating] = useState(+value);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        onChange(rating);
    }, [rating]);

    const getClass = (value) => {
        if (value <= hover || value <= rating) {
            return 'fa-solid fa-star'
        }
        if (value === Math.ceil(hover) || value === Math.ceil(rating)) {
            return 'fa-regular fa-star-half-stroke';
        }
        return 'fa-regular fa-star';
    }

    const select = (index, cb) => {
        if (!editable) return;
        cb(index + 1);
        // let svgDom = document.getElementsByClassName('star')[index];
        // const isHalf = e.pageX - svgDom.getBoundingClientRect().left < (size / 2)
        // const half = isHalf ? 0.5 : 1;
    }

    return (
        <span className={`star-input ${className}`} style={style}>
            {[...Array(5)].map((_, i) => {
                const value = i + 1;
                return (
                    <i
                        key={value}
                        className={`star ${getClass(value)}`}
                        style={{
                            cursor: editable && 'pointer',
                            fontSize: size,
                            color
                        }}
                        onClick={() => select(i, setRating)}
                        onMouseLeave={() => setHover(null)}
                        onMouseMove={() => select(i, setHover)}
                    ></i>
                )
            })}
        </span>
    )
}

export default StarInput