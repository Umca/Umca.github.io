import React from 'react';

const RadioButton = (props) => {
    return ( 
        <label>
            <input type = 'radio'
            value = {props.val}
            name = 'type'
            checked = {props.isChecked}
            onChange = {props.handleChange}/>
            <p > {props.val} </p> 
        </label>
    )
}

export default RadioButton