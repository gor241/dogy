import React from "react";
import s from './Popup.module.css'

const Modal = ({active,setActive,children}) => {
    return (
        <div className={active?s.modal_active:s.modal} onClick={()=>setActive(false)}>
            <div className={active?s.modal__content_active:s.modal__content} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal