import React from 'react';
import '../../styles/parts.css';

const Checkbox = (props) => {
    return (
        <div>
            <label className="control control-checkbox"
                onClick={props.onChange}
                checked={props.checked}
                
            >
                
                <input type="checkbox" />
                <span
                    className="label-text"    
                >{props.label}</span>    
            <div className="control_indicator"></div>
        </label>
        </div>    
    )
}

export default Checkbox;