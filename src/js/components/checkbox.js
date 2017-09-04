import React from 'react';
import '../../styles/parts.css';

const Checkbox = (props) => {
    return (
        <div>
            <label className="control control-checkbox "  
                onClick={props.onChange}
                checked={props.isChecked}
                
            >
                
                <input type="checkbox" />
                <span
                    className={"label-text " + (props.isChecked ? 'checked-text' : '')}    
                >{props.label}</span>    
                <div className={"control_indicator " + (props.isChecked ? 'checked-control-indicator' : '')}>
                    {props.isChecked ? <div className="fake-checked"></div> : null}
                </div>
        </label>
        </div>    
    )
}

export default Checkbox;