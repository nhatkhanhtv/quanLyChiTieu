import React from 'react';
import { TextField } from '@material-ui/core';


export default function RenderTextField(props) {
    const {label, handleTextChange } = props;

    return (
        <TextField 
            name ={name}
            label = {label}
            onChange = {handleTextChange}
            />
    )
}