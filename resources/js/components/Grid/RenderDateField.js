import 'date-fns';
import React from 'react';
import { TextField } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers';
  
export default function RenderDateField(props) {
    const {label, handleTextChange, name } = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    return (
        <TextField
        id="date"
        label="Birthday"
        type="date"
        format="dd/mm/yyyy"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
    )
}