import React from 'react'

function LoginInputBox({label,resetPassword,name,type,value,placeholder,onChange}) {
    return (
        <div className="login-input">
            <label>{label}</label>
            <input  name={name} type={type} value={value} placeholder={placeholder} onChange={(e)=>onChange(e)} maxLength="40" minLength="3" />
            <p>{resetPassword}</p>
        </div>
    )
}

export default LoginInputBox
