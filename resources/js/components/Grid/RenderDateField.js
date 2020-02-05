import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; //luu y dung phien ban 1.3.13 de tranh loi string n 
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function RenderDateField(props) {
    const {label, handleDateChange, name, 
      //selectedDate, 
      value } = props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        name={name}
        value= {value}
        onChange={handleDateChange}
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
        />
        
    </MuiPickersUtilsProvider>
    )
}