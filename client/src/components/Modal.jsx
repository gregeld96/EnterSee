import React, {useState, useEffect} from 'react'

function ModalPopUp ({message, removeMessage}) {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="pop">
                <div className="pop-content">
                    <span className="close" onClick={() => removeMessage()}>&times;</span>
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}

export default ModalPopUp