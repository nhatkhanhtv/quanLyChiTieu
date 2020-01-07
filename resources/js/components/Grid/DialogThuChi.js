import React, { useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));




export default function DialogThuChi(props) {
    const { getApi } = props;
    const [data,setData] = useState(null);
    const classes = useStyles();
    const handleTextChange = key => event => {
        setData({ ...data, [key]: event.target.value })
    }

    const handleSubmit = event => {

        console.log(data);
        event.preventDefault();
    }

    return (
        <Paper>
            <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField id="noi_dung" label="Nội dung" onChange={handleTextChange} />
                <TextField id="so_tien" label="Số tiền" onChange={handleTextChange} />
                <TextField id="ngay_thang_nam" label="Ngày" onChange={handleTextChange} />
                <TextField id="loai" label="Loại" onChange={handleTextChange} />
                <Button type="submit">submit</Button>
            </form>
        </Paper>
    )
}