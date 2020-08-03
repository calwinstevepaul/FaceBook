import React from 'react'

function SignupInputBox({name,type,value,placeholder,onChange}) {
    return (
        <div className="signup-input">
            <input  name={name} type={type} value={value} placeholder={placeholder} onChange={(e)=>onChange(e)} maxLength="40" minLength="3"/>
        </div>
    )
}

export default SignupInputBox
