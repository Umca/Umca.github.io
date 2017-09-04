import React from 'react';
import '../../styles/parts.css';

const RadioButton = (props) => {
    return (
        <div className={props.op}>
            <input type='radio'
                id={`${props.val}-option`}
                value={props.val}
                name={props.name}
                checked={props.isChecked}
                onChange={props.handleChange}

            />
            <label
                className={(props.feature ? 'filter-radios' : "")}    
                htmlFor={`${props.val}-option`}
            > {props.label} </label> 
            <div className={"check " + (props.feature ? 'filter-radios' : "")}></div>
        </div>
    )
}

export default RadioButton