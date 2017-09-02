import React from 'react';
import '../../styles/parts.css'

const  Button  = ({...props}) =>{
        return(
            <button 
                type="submit"
                className="submit-button"
            >
                {props.text}
            </button>
        )
}

export default Button;