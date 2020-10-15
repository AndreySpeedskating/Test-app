import React from "react";

export const INPUT = (item) => item.map((i) => {
    return (
        <div key={i.placeholder+'s'} id={'InputContainer'}>
        <label key={i.placeholder} htmlFor={i.id} style={{color: `${i.color}`}}>{i.errorMessage}</label>
        <input
        type = {i.type}
        id = {i.id}
        key={i.id+i.type}
        placeholder = {i.placeholder}
        className = {i.className}
        autoComplete={'off'}
        onChange={i.onChange}
        /></div>
    )
})
