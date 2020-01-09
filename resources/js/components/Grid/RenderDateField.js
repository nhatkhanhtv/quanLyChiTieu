import 'date-fns';
import React from 'react';
import MaskedInput from 'react-maskedinput';
// import { FormControl, InputLabel } from '@material-ui/core';
//import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';

export default function RenderDateField(props) {
    const {label, handleTextChange, name, value } = props;
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleDateChange = date => {
    //     setSelectedDate(date);
    // };
    return (
      // <FormControl>
      //   <InputLabel htmlFor="my-input">{label}</InputLabel>
      //   <MaskedInput mask="11/11/1111" className = "MuiInput" name={name} placeholder="dd/mm/yyyy" onChange={handleTextChange}/>
      //   {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
      // </FormControl>
          <TextField
            label = {label}
              // ref="phone"
              name={name}
              type="text"
              value={value}
              onChange={handleTextChange}
            >
              <MaskedInput mask="11/11/1111" className = "MuiInput" name={name} placeholder="dd/mm/yyyy" onChange={handleTextChange}/>
            </TextField>  
      //   <TextField
      //   id="date"
      //   label="Birthday"
      //   type="date"
      //   format="dd/mm/yyyy"
      //   defaultValue="2017-05-24"
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
      // />
    )
}