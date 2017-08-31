
import React from 'react';
import '../../styles/modal.css'

const Modal = (props) => {
        return (
            <div>
                <div className="modal Dialog" id="modal">
                    <button
                        className="close-button"
                        id="close-button"
                        onClick={props.closeModal}>X
                    </button>
                    <div className="modal-guts">
                        <h1>Modal Example</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>
                    </div>
                </div>
            </div>    
        )
}

export default Modal;

