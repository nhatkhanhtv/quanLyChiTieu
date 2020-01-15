import React from 'react';
import { TextField } from '@material-ui/core';


export default function RenderTextField(props) {
    const {label, handleTextChange, value } = props;

    return (
        <TextField 
            name ={name}
            label = {label}
            onChange = {handleTextChange}
            value = {value}
            />
    )
}