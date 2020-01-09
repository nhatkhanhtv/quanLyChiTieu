import React, { Fragment, useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
      />

      <DatePicker
        autoOk
        label="Clearable"
        clearable
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DatePicker
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        label="Date of birth"
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}

export default BasicDatePicker;